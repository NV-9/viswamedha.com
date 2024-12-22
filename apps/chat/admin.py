from django.contrib import admin

from apps.chat.models import DirectChat, GroupChat, Room, Message

admin.site.register(DirectChat)
admin.site.register(GroupChat)
admin.site.register(Room)
admin.site.register(Message)
