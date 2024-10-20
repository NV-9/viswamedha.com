from django.urls import path 

from apps.users.views import login_view, logout_view, signup_view, session_view

urlpatterns = [
    path('api/login/', login_view, name='api-login'),
    path('api/logout/', logout_view, name='api-logout'),
    path('api/signup/', signup_view, name='api-signup'),
    path('api/session/', session_view, name='api-session'),
]
