from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.parsers import FormParser, MultiPartParser
from django_filters import DateTimeFilter, FilterSet

from apps.tutor.models import Review, Subject, Level, Student, Course, Lesson, LessonPlan, Event, LessonFile
from apps.tutor.serializers import ReviewSerializer, SubjectSerializer, LevelSerializer, StudentSerializer, CourseSerializer, LessonSerializer, LessonPlanSerializer, EventSerializer, LessonFileSerializer
from apps.tutor.permissions import IsInLessonPlanOrIsAdmin
from apps.main.permissions import IsAdminForObjectOrReadOnlyPermission

class ReviewViewSet(viewsets.ModelViewSet):
    """
    Review viewset for viswamedha.com
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]

class SubjectViewSet(viewsets.ModelViewSet):
    """
    Subject viewset for viswamedha.com
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]

class LevelViewSet(viewsets.ModelViewSet):
    """
    Level viewset for viswamedha.com
    """
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]

class StudentViewSet(viewsets.ModelViewSet):
    """
    Student viewset for viswamedha.com
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'student_uuid'
    filterset_fields = ['student_uuid', 'user__user_uuid']

    def get_queryset(self):
        if self.request.user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(user__id = self.request.user.id)

class CourseViewSet(viewsets.ModelViewSet):
    """
    Course viewset for viswamedha.com
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]

class LessonFilter(FilterSet):
    start_range = DateTimeFilter(field_name='start', lookup_expr='gte')
    end_range = DateTimeFilter(field_name='end', lookup_expr='lte')

    class Meta:
        model = Lesson
        fields = ['lesson_plan', 'lesson_plan__student__student_uuid', 'start_range', 'end_range']


class LessonViewSet(viewsets.ModelViewSet):
    """
    Lesson viewset for viswamedha.com
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsInLessonPlanOrIsAdmin]
    lookup_field = 'lesson_uuid'
    filterset_class = LessonFilter

    def get_queryset(self):
        if self.request.user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(lesson_plan__student = self.request.user.student)

class LessonFileViewSet(viewsets.ModelViewSet):
    """
    Lesson File viewset for viswamedha.com
    """
    queryset = LessonFile.objects.all()
    serializer_class = LessonFileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]
    lookup_field = 'file_uuid'
    filterset_fields = ['lesson', 'lesson__lesson_uuid']
    parser_classes = [MultiPartParser, FormParser]

class LessonPlanViewSet(viewsets.ModelViewSet):
    """
    Lesson Plan viewset for viswamedha.com
    """
    queryset = LessonPlan.objects.all()
    serializer_class = LessonPlanSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]
    lookup_field = 'lesson_plan_uuid'

class EventViewSet(viewsets.ModelViewSet):
    """
    Event viewset for viswamedha.com
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAdminForObjectOrReadOnlyPermission]
    lookup_field = 'event_uuid'

