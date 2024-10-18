from rest_framework.viewsets import ModelViewSet

from apps.main.models import Photo, Reference
from apps.main.serializers import PhotoSerializer, ReferenceSerializer

class PhotoViewSet(ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

class ReferenceViewSet(ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer