from rest_framework.serializers import ModelSerializer, SerializerMethodField
from apps.main.models import ContactMessage, Photo, Reference

class ContactMessageSerializer(ModelSerializer):
    """
    ContactMessage serializer for viswamedha.com
    """

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message']

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
        fields = ['id', 'name', 'value', 'url']