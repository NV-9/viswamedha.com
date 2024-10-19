from django.urls import path 

from apps.users.views import login_view, logout_view

urlpatterns = [
    path('api/login/', login_view, name='api-login'),
    path('api/logout/', logout_view, name='api-logout'),
]
