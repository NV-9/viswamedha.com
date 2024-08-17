from django.test import TestCase

from apps.blog.models import Post, Tag


class PostTestCase(TestCase):
    
    def setUp(self) -> None:
        Post.objects.create(title = 'Test Post', heading = 'Test Post', content = 'This is a test post')
    
    def test_post_exists(self):
        post = Post.objects.get(title = 'Test Post')
        self.assertEqual(post.content, 'This is a test post')
    
    def test_post_slug(self):
        post = Post.objects.get(title = 'Test Post')
        self.assertEqual(post.slug, 'test-post')


class TagTestCase(TestCase):
    
    def setUp(self) -> None:
        Tag.objects.create(name = 'Test Tag')
    
    def test_tag_exists(self):
        tag = Tag.objects.get(name = 'Test Tag')
        self.assertEqual(tag.name, 'Test Tag')