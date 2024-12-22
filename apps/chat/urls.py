from django.urls import path

from apps.chat.views import create_direct_chat, join_group_chat

urlpatterns = [
    path('create-direct-chat/', create_direct_chat, name = 'api-create-direct-chat'),
    path('join-group-chat/', join_group_chat, name = 'api-join-group-chat'),
]