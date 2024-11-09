from rest_framework import serializers

from apps.blog.models import Post, Tag


class PostSerializer(serializers.ModelSerializer):
    """
    Post serializer for viswamedha.com
    """
    class Meta:
        model = Post
        fields = ['id', 'post_uuid', 'title', 'heading', 'subheading', 'content', 'image', 'slug', 'meta_description', 'published', 'publish_date', 'tags']
        read_only_fields = ['id', 'post_uuid', 'slug']
        depth = 2


class TagSerializer(serializers.ModelSerializer):
    """
    Tag serializer for viswamedha.com
    """
    class Meta:
        model = Tag
        fields = ['id', 'name']
        read_only_fields = ['id']