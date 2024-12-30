from rest_framework.viewsets import ModelViewSet

from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'tag_uuid'