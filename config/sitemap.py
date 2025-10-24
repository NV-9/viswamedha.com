from django.contrib.sitemaps import Sitemap
from apps.blog.models import Post

class StaticSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.7

    def items(self):
        return ['', 'about', 'blog', 'photos', 'contact', 'tutor', 'courses']  

    def location(self, item):
        return f'/{item}' if item else '/'

class PostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.6

    def items(self):
        return Post.objects.filter(published = True)

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, item):
        return f'/post/{item.slug}'


sitemaps = {
    'posts': PostSitemap,
    'static': StaticSitemap
}