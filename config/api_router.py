from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.users.viewsets import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("posts", PostViewSet)
router.register("tags", TagViewSet)

app_name = "api"
urlpatterns = router.urls
