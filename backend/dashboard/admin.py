from django.contrib import admin
from .models import (
     GooglePlaceRating, GoogleReview  # Add Google models
)

# Register your models here.
@admin.register(GooglePlaceRating)
class GooglePlaceRatingAdmin(admin.ModelAdmin):
    list_display = ('place_id', 'rating_value', 'review_count', 'last_updated')
    readonly_fields = ('last_updated',)
    list_editable = ('rating_value', 'review_count')

@admin.register(GoogleReview)
class GoogleReviewAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'rating', 'time', 'created_at')
    list_filter = ('rating', 'language')
    search_fields = ('author_name', 'text')
    readonly_fields = ('created_at',)