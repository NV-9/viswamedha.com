from rest_framework.serializers import ModelSerializer, SerializerMethodField, ValidationError
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
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None

    def validate_image(self, value):
        max_size = 5 * 1024 * 1024 
        if value and value.size > max_size:
            raise ValidationError("Image file too large ( > 5MB ).")
        return value

class ReferenceSerializer(ModelSerializer):
    """
    Reference serializer for viswamedha.com
    """

    class Meta:
        model = Reference
        fields = ['id', 'name', 'value', 'url']