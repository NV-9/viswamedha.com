from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path(r'jet/', include('jet.urls', 'jet')),
    path(r'jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('admin/', admin.site.urls),
    path('api/', include('config.urls.api')),
    path('', include('apps.main.urls')),
]
