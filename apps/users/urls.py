from django.urls import path 

from apps.users.views import login_view, logout_view, me_view, signup_view, session_view, socials_view, change_password_view

urlpatterns = [
    path('login/', login_view, name='api-login'),
    path('logout/', logout_view, name='api-logout'),
    path('me/', me_view, name='api-me'),
    path('signup/', signup_view, name='api-signup'),
    path('session/', session_view, name='api-session'),
    path('socials/', socials_view, name='api-socials'),
    path('change-password/', change_password_view, name='api-socials'),
]
