from django.db import models
from django.utils import timezone
from django.core.validators import FileExtensionValidator


class Recordcand(models.Model):
    """Certificate verification record."""
    cert_number = models.CharField(max_length=40, unique=True, blank=True, help_text="Auto-generated verification ID")
    candidate_name = models.CharField(max_length=120)
    training_name = models.CharField(max_length=120, default='')
    program = models.CharField(max_length=120)
    grade = models.CharField(max_length=40, help_text="e.g. Distinction, Merit, Pass")
    duration = models.CharField(max_length=80, blank=True, default='', help_text="e.g. 3 months, 12 weeks")
    issue_date = models.DateField()
    certificate_file = models.FileField(
        upload_to='certificates/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'jpg', 'jpeg', 'png'])],
    )
    projects = models.JSONField(
        blank=True,
        null=True,
        help_text="Optional list of project objects, e.g. [{\"title\": \"...\", \"description\": \"...\"}]"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.cert_number} – {self.candidate_name}"

    def save(self, *args, **kwargs):
        if not self.cert_number:
            year = timezone.now().year
            prefix = f"AM-{year}-"
            latest = Recordcand.objects.filter(cert_number__startswith=prefix).order_by('-id').first()
            next_num = 1
            if latest and latest.cert_number:
                try:
                    next_num = int(latest.cert_number.split('-')[-1]) + 1
                except Exception:
                    next_num = Recordcand.objects.count() + 1
            self.cert_number = f"{prefix}{next_num:04d}"
        super().save(*args, **kwargs)


class Contact(models.Model):
    """Contact form submission."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} <{self.email}>"


class HiringApplication(models.Model):
    """Job application form submission."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    resume = models.FileField(
        upload_to='resumes/',
        validators=[FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])],
    )
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} <{self.email}>"


class QuoteRequest(models.Model):
    """Quote request form submission."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    budget = models.CharField(max_length=60, blank=True)
    message = models.TextField()
    attachment = models.FileField(
        upload_to='quote_attachments/',
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} <{self.email}>"


class BlogPost(models.Model):
    """Blog post managed via admin dashboard."""
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300)
    category = models.CharField(
        max_length=40,
        choices=[('Engineering', 'Engineering'), ('Training', 'Training'), ('Internship', 'Internship')],
        default='Engineering',
    )
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    body = models.TextField()
    read_time = models.CharField(max_length=20, default='5 min')
    is_featured = models.BooleanField(default=False)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class BlogComment(models.Model):
    """Public comments on blog posts."""
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=120)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.author_name} on {self.post_id}"


class GooglePlaceRating(models.Model):
    """Stores the overall rating and review count"""
    place_id = models.CharField(max_length=100, unique=True)
    rating_value = models.FloatField(default=5.0)
    review_count = models.IntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Google Place Rating"
        verbose_name_plural = "Google Place Ratings"
    
    def __str__(self):
        return f"{self.place_id} - {self.rating_value} ({self.review_count} reviews)"


class GoogleReview(models.Model):
    """Stores individual reviews"""
    place_rating = models.ForeignKey(GooglePlaceRating, on_delete=models.CASCADE, related_name='reviews')
    author_name = models.CharField(max_length=200)
    rating = models.FloatField(default=5.0)
    text = models.TextField(blank=True)
    time = models.CharField(max_length=100, blank=True)
    profile_photo_url = models.URLField(blank=True, null=True)
    language = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Google Review"
        verbose_name_plural = "Google Reviews"
    
    def __str__(self):
        return f"{self.author_name} - {self.rating}★"

