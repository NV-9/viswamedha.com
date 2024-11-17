from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import path, include

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.main.viewsets import ContactMessageViewSet, PhotoViewSet, ReferenceViewSet
from apps.tutor.viewsets import ReviewViewSet, SubjectViewSet, LevelViewSet, StudentViewSet, CourseViewSet, LessonViewSet, LessonPlanViewSet, EventViewSet
from apps.users.viewsets import UserViewSet
from apps.users.urls import urlpatterns as user_api_urlpatterns

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("user", UserViewSet)
router.register("contact-message", ContactMessageViewSet)
router.register("post", PostViewSet)
router.register("tag", TagViewSet)
router.register("photo", PhotoViewSet)
router.register("reference", ReferenceViewSet)
router.register("review", ReviewViewSet)
router.register("subject", SubjectViewSet)
router.register("level", LevelViewSet)
router.register("student", StudentViewSet)
router.register("course", CourseViewSet)
router.register("lesson", LessonViewSet)
router.register("lesson-plan", LessonPlanViewSet)
router.register("event", EventViewSet)


app_name = "api"
urlpatterns = user_api_urlpatterns + router.urls
