from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import path, include

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.main.viewsets import ContactMessageViewSet, PhotoViewSet, ReferenceViewSet
from apps.tutor.viewsets import ReviewViewSet
from apps.users.viewsets import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("user", UserViewSet)
router.register("contact-message", ContactMessageViewSet)
router.register("post", PostViewSet)
router.register("tag", TagViewSet)
router.register("photo", PhotoViewSet)
router.register("reference", ReferenceViewSet)
router.register("review", ReviewViewSet)

app_name = "api"
urlpatterns = router.urls + [path('', include('apps.users.urls'))]
