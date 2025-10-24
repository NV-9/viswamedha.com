from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from config.sitemap import sitemaps

urlpatterns = [ 
    # Admin
    path('jet/', include('jet.urls', 'jet')), 
    path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('admin/', admin.site.urls, name = 'admin'),
    # Api
    path('api/', include('config.api')),
    # Sitemap
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}),
    # Site Urls
    path('', include('apps.main.urls')),
    # Static Urls
    *static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
    # Media Urls
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
