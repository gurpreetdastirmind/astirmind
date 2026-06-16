from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.conf import settings
import secrets
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Recordcand, Contact, HiringApplication, QuoteRequest, BlogPost, BlogComment
from .serializers import (
    RecordcandSerializer, ContactSerializer,
    HiringApplicationSerializer, QuoteRequestSerializer,
    BlogPostSerializer, BlogCommentSerializer,
)

# ── REMOVED: CAPTCHA_CHARS, build_captcha_svg, issue_captcha, 
# ── REMOVED: captcha_challenge, captcha_verify


def notify_admin(subject, message):
    """Send email notification to admin. Fails silently so form submissions still succeed."""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass


# ── Auth ─────────────────────────────────────────────────────────────────────

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user and user.is_staff:
        login(request, user)
        return Response({'ok': True, 'username': user.username})
    return Response({'error': 'Invalid credentials or not staff.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([AllowAny])
def admin_logout(request):
    logout(request)
    return Response({'ok': True})


@api_view(['GET'])
@permission_classes([AllowAny])
def admin_status(request):
    if request.user.is_authenticated and request.user.is_staff:
        return Response({'authenticated': True, 'username': request.user.username})
    return Response({'authenticated': False})


# ── Records ───────────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def records_list(request):
    if request.method == 'GET':
        q = request.query_params.get('q', '')
        qs = Recordcand.objects.all()
        if q:
            qs = qs.filter(cert_number__icontains=q) | qs.filter(candidate_name__icontains=q) | qs.filter(training_name__icontains=q) | qs.filter(program__icontains=q)
        return Response(RecordcandSerializer(qs, many=True).data)
    s = RecordcandSerializer(data=request.data)
    if s.is_valid():
        s.save()
        return Response(s.data, status=status.HTTP_201_CREATED)
    return Response(s.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def record_detail(request, pk):
    try:
        obj = Recordcand.objects.get(pk=pk)
    except Recordcand.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    if request.method == 'GET':
        return Response(RecordcandSerializer(obj).data)
    if request.method == 'PUT':
        s = RecordcandSerializer(obj, data=request.data, partial=True)
        if s.is_valid():
            s.save()
            if 'projects' not in request.data:
                obj.refresh_from_db()
                obj.projects = None
                obj.save(update_fields=['projects'])
                return Response(RecordcandSerializer(obj).data)
            return Response(s.data)
        return Response(s.errors, status=400)
    obj.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# Public verify endpoint
@api_view(['GET'])
@permission_classes([AllowAny])
def verify_certificate(request):
    cert_number = request.query_params.get('cert', '').strip().upper()
    if not cert_number:
        return Response({'error': 'cert parameter required'}, status=400)
    try:
        obj = Recordcand.objects.get(cert_number__iexact=cert_number)
        return Response(RecordcandSerializer(obj).data)
    except Recordcand.DoesNotExist:
        return Response({'found': False}, status=404)


# ── Messages ──────────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def messages_list(request):
    if request.method == 'POST':
        s = ContactSerializer(data=request.data)
        if s.is_valid():
            obj = s.save()
            notify_admin(
                subject=f'[AstirMind] New Contact Message from {obj.name}',
                message=(
                    f'Name: {obj.name}\n'
                    f'Email: {obj.email}\n'
                    f'Phone: {obj.phone or "—"}\n\n'
                    f'Message:\n{obj.message}'
                ),
            )
            return Response({'ok': True}, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=400)
    # GET — admin only
    if not (request.user.is_authenticated and request.user.is_staff):
        return Response({'error': 'Forbidden'}, status=403)
    q = request.query_params.get('q', '')
    qs = Contact.objects.all()
    if q:
        qs = qs.filter(name__icontains=q) | qs.filter(email__icontains=q)
    return Response(ContactSerializer(qs, many=True).data)


@api_view(['DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def message_detail(request, pk):
    try:
        obj = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    if request.method == 'DELETE':
        obj.delete()
        return Response(status=204)
    obj.is_read = True
    obj.save()
    return Response(ContactSerializer(obj).data)


# ── Hiring Applications ────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def hiring_list(request):
    if request.method == 'POST':
        s = HiringApplicationSerializer(data=request.data)
        if s.is_valid():
            obj = s.save()
            notify_admin(
                subject=f'[AstirMind] New Job Application from {obj.name}',
                message=(
                    f'Name: {obj.name}\n'
                    f'Email: {obj.email}\n'
                    f'Phone: {obj.phone or "—"}\n\n'
                    f'Message:\n{obj.message or "—"}\n\n'
                    f'Resume: {request.build_absolute_uri(obj.resume.url) if obj.resume else "—"}'
                ),
            )
            return Response({'ok': True}, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=400)
    # GET — admin only
    if not (request.user.is_authenticated and request.user.is_staff):
        return Response({'error': 'Forbidden'}, status=403)
    qs = HiringApplication.objects.all()
    return Response(HiringApplicationSerializer(qs, many=True).data)


@api_view(['DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def hiring_detail(request, pk):
    try:
        obj = HiringApplication.objects.get(pk=pk)
    except HiringApplication.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    if request.method == 'DELETE':
        obj.delete()
        return Response(status=204)
    obj.is_read = True
    obj.save()
    return Response(HiringApplicationSerializer(obj).data)


# ── Quote Requests ─────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def quotes_list(request):
    if request.method == 'POST':
        s = QuoteRequestSerializer(data=request.data)
        if s.is_valid():
            obj = s.save()
            notify_admin(
                subject=f'[AstirMind] New Quote Request from {obj.name}',
                message=(
                    f'Name: {obj.name}\n'
                    f'Email: {obj.email}\n'
                    f'Phone: {obj.phone or "—"}\n'
                    f'Budget: {obj.budget or "—"}\n\n'
                    f'Message:\n{obj.message}'
                ),
            )
            return Response({'ok': True}, status=status.HTTP_201_CREATED)
        return Response(s.errors, status=400)
    # GET — admin only
    if not (request.user.is_authenticated and request.user.is_staff):
        return Response({'error': 'Forbidden'}, status=403)
    qs = QuoteRequest.objects.all()
    return Response(QuoteRequestSerializer(qs, many=True).data)


@api_view(['DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def quote_detail(request, pk):
    try:
        obj = QuoteRequest.objects.get(pk=pk)
    except QuoteRequest.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)
    if request.method == 'DELETE':
        obj.delete()
        return Response(status=204)
    obj.is_read = True
    obj.save()
    return Response(QuoteRequestSerializer(obj).data)


# ── Blog Posts ────────────────────────────────────────────────────────────────

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def blog_posts_list(request):
    if request.method == 'GET':
        qs = BlogPost.objects.all()
        return Response(BlogPostSerializer(qs, many=True, context={'request': request}).data)
    if not (request.user.is_authenticated and request.user.is_staff):
        return Response({'error': 'Forbidden'}, status=403)
    s = BlogPostSerializer(data=request.data, context={'request': request})
    if s.is_valid():
        s.save()
        return Response(s.data, status=201)
    return Response(s.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def blog_post_detail(request, pk):
    try:
        obj = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if request.method == 'GET':
        return Response(BlogPostSerializer(obj, context={'request': request}).data)

    if not (request.user.is_authenticated and request.user.is_staff):
        return Response({'error': 'Forbidden'}, status=403)

    if request.method == 'PUT':
        s = BlogPostSerializer(obj, data=request.data, partial=True, context={'request': request})
        if s.is_valid():
            s.save()
            return Response(s.data)
        return Response(s.errors, status=400)

    obj.delete()
    return Response(status=204)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def blog_comments_list(request, pk):
    try:
        post = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response({'error': 'Post not found'}, status=404)

    if request.method == 'GET':
        qs = post.comments.filter(is_approved=True)
        return Response(BlogCommentSerializer(qs, many=True).data)

    s = BlogCommentSerializer(data=request.data)
    if s.is_valid():
        s.save(post=post)
        return Response(s.data, status=201)
    return Response(s.errors, status=400)