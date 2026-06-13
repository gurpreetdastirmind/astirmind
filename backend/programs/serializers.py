from rest_framework import serializers
from .models import Program


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = [
            'id',
            'slug',
            'order',
            'icon_name',
            'title',
            'duration',
            'format',
            'has_internship',
            'has_certificate',
            'tagline',
            'overview',
            'modules',
            'tools',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
