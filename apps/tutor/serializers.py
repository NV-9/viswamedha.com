from rest_framework import serializers

from apps.tutor.models import Review

class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializer for viswamedha.com
    """
    class Meta:
        model = Review
        fields = ['id', 'initials', 'review']
        read_only_fields = ['id']
