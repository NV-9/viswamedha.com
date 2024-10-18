from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.main.models import Photo, Reference

class PhotoSerializer(ModelSerializer):
    """
    Photo serializer for viswamedha.com
    """
    image = SerializerMethodField(source = 'image')

    class Meta:
        model = Photo
        fields = ['id', 'image', 'alt']

    def get_image(self, obj):
        return obj.image.url

class ReferenceSerializer(ModelSerializer):
    """
    Reference serializer for viswamedha.com
    """

    class Meta:
        model = Reference
        fields = ['id', 'path', 'name', 'value']