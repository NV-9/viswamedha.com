from rest_framework.viewsets import ModelViewSet

from apps.main.models import ContactMessage, Photo, Reference
from apps.main.serializers import ContactMessageSerializer, PhotoSerializer, ReferenceSerializer
from apps.main.permissions import ContactMessagePermission

class ContactMessageViewSet(ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [ContactMessagePermission]

class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class ReferenceViewSet(ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer