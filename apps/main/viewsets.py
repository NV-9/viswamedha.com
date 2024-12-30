from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from apps.main.models import ContactMessage, Photo, Reference
from apps.main.serializers import ContactMessageSerializer, PhotoSerializer, ReferenceSerializer
from apps.main.permissions import ContactMessagePermission, IsAdminForObjectOrReadOnlyPermission

class ContactMessageViewSet(ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [ContactMessagePermission]

class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAdminForObjectOrReadOnlyPermission]

class ReferenceViewSet(ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer
    lookup_field = 'name'
    permission_classes = [IsAdminForObjectOrReadOnlyPermission]

    def list(self, request, *args, **kwargs):
        if (not request.user.is_staff):
            return Response(status = status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)
            