from django.urls import path, include
from config.urls.static import urlpatterns as static_urlpatterns

urlpatterns = [  
    path('', include('apps.main.urls')),
] + static_urlpatterns
