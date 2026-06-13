from rest_framework import serializers
from .models import Recordcand, Contact, HiringApplication, QuoteRequest, BlogPost, BlogComment


class RecordcandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recordcand
        fields = '__all__'
        read_only_fields = ['cert_number', 'created_at']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'
        read_only_fields = ['created_at', 'is_read']


class HiringApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HiringApplication
        fields = '__all__'
        read_only_fields = ['created_at', 'is_read']


class QuoteRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteRequest
        fields = '__all__'
        read_only_fields = ['created_at', 'is_read']


class BlogPostSerializer(serializers.ModelSerializer):
    # Expose computed image URL (prefer uploaded file over URL string)
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = '__all__'

    def get_image_src(self, obj):
        request = self.context.get('request')
        if obj.image:
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return obj.image_url or ''


class BlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogComment
        fields = '__all__'
        read_only_fields = ['created_at', 'post']
