from django.contrib import admin
from django.utils.html import format_html
from .models import Program


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = (
        'order', 'title', 'duration', 'format',
        'has_internship', 'has_certificate', 'is_active', 'updated_at',
    )
    list_display_links = ('title',)
    list_editable = ('order', 'is_active')
    list_filter = ('has_internship', 'has_certificate', 'is_active')
    search_fields = ('title', 'slug', 'tagline', 'overview')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('Identity', {
            'fields': ('slug', 'order', 'icon_name', 'is_active'),
        }),
        ('Content', {
            'fields': ('title', 'tagline', 'overview'),
        }),
        ('Metadata', {
            'fields': ('duration', 'format', 'has_internship', 'has_certificate'),
        }),
        ('Curriculum', {
            'fields': ('modules',),
            'description': (
                'JSON array of module objects. Each module: '
                '{"title": "...", "topics": ["...", "..."]}'
            ),
        }),
        ('Tools & Stack', {
            'fields': ('tools',),
            'description': 'JSON array of tool name strings, e.g. ["Python", "FastAPI"]',
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
