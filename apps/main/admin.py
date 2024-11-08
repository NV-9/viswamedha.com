from django.contrib import admin
from django.contrib.auth.models import Group

from apps.main.models import ContactMessage, Photo, Reference

admin.site.unregister(Group)

admin.site.register(ContactMessage)
admin.site.register(Photo)
admin.site.register(Reference)
