from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.main.viewsets import PhotoViewSet, ReferenceViewSet
from apps.users.viewsets import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("user", UserViewSet)
router.register("post", PostViewSet)
router.register("tag", TagViewSet)
router.register("photo", PhotoViewSet)
router.register("reference", ReferenceViewSet)

app_name = "api"
urlpatterns = router.urls 
