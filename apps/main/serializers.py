from rest_framework import serializers
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):
    """
    Photo serializer for viswamedha.com
    """
    class Meta:
        model = Photo
        fields = ['id', 'image', 'alt']
