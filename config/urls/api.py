from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.tutor.viewsets import CourseViewSet, EventViewSet, LessonPlanViewSet, LessonViewSet, ReviewViewSet, StudentViewSet
from apps.users.viewsets import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("user", UserViewSet)
router.register("post", PostViewSet)
router.register("tag", TagViewSet)
router.register("student", StudentViewSet)
router.register("course", CourseViewSet)
router.register("lessonplan", LessonPlanViewSet)
router.register("review", ReviewViewSet)
router.register("event", EventViewSet)
router.register("lesson", LessonViewSet)

app_name = "api"
urlpatterns = router.urls
