from django.db import models


class Program(models.Model):
    """
    A training program offered by AstirMind Institute.

    `modules` and `tools` are stored as JSON so the admin can edit them
    without a separate child table — keeps the API response self-contained.

    modules schema:
        [ { "title": str, "topics": [str, ...] }, ... ]

    tools schema:
        [ str, ... ]
    """

    slug = models.SlugField(unique=True, max_length=60, help_text="URL-safe identifier, e.g. 'genai'")
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order in sidebar (low = first)")
    icon_name = models.CharField(
        max_length=60,
        help_text="Lucide icon name used by the frontend, e.g. 'Brain', 'Globe', 'Database'",
    )
    title = models.CharField(max_length=120)
    duration = models.CharField(max_length=60, help_text="e.g. '12 Weeks'")
    format = models.CharField(max_length=80, help_text="e.g. 'Live + Project'")
    has_internship = models.BooleanField(default=False)
    has_certificate = models.BooleanField(default=True)
    tagline = models.CharField(max_length=220)
    overview = models.TextField()
    modules = models.JSONField(
        default=list,
        help_text='Array of {title, topics[]} objects',
    )
    tools = models.JSONField(
        default=list,
        help_text='Array of tool/stack name strings',
    )
    is_active = models.BooleanField(default=True, help_text="Hidden programs won't appear in the API")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.order:02d}. {self.title}"
