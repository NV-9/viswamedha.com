from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.blog.viewsets import PostViewSet, TagViewSet
from apps.chat.viewsets import DirectChatViewSet, GroupChatViewSet, MessageViewSet, RoomViewSet
from apps.main.viewsets import ContactMessageViewSet, PhotoViewSet, ReferenceViewSet
from apps.tutor.viewsets import ReviewViewSet, SubjectViewSet, LevelViewSet, StudentViewSet, CourseViewSet, LessonViewSet, LessonPlanViewSet, EventViewSet, LessonFileViewSet
from apps.users.viewsets import UserViewSet
from apps.users.urls import urlpatterns as user_api_urlpatterns
from apps.chat.urls import urlpatterns as chat_api_urlpatterns
from apps.tutor.urls import urlpatterns as tutor_api_urlpatterns

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
router.register("lesson-file", LessonFileViewSet)
router.register("lesson-plan", LessonPlanViewSet)
router.register("event", EventViewSet)
router.register("direct-chat", DirectChatViewSet)
router.register("group-chat", GroupChatViewSet)
router.register("message", MessageViewSet)
router.register("room", RoomViewSet)

app_name = "api"
urlpatterns = user_api_urlpatterns + chat_api_urlpatterns + tutor_api_urlpatterns + router.urls
