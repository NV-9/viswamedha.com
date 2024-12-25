from django.urls import re_path
from django.conf import settings

from apps.main.views import serve_react

urlpatterns = [
    re_path(r"^(?!static/|media/)(?P<path>.*)$", serve_react, {"document_root": settings.BUILD_DIR}),
]