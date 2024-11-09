from django.contrib import admin
from django.urls import path, include
from config.urls.static import urlpatterns as static_urlpatterns

urlpatterns = static_urlpatterns + [
    path('dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('', admin.site.urls, name = 'admin'),
    path('', include('jet.urls', 'jet')), 
] 