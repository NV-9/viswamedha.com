from django.urls import re_path

from .views import index


urlpatterns = [
    re_path(r"^(?P<path>.*)$", index, {"document_root": "dist"}),
]