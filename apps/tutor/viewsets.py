from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.tutor.models import Review, Subject, Level, Student, Course, Lesson, LessonPlan, Event
from apps.tutor.serializers import ReviewSerializer, SubjectSerializer, LevelSerializer, StudentSerializer, CourseSerializer, LessonSerializer, LessonPlanSerializer, EventSerializer
from apps.tutor.permissions import IsInLessonPlanOrIsAdmin

class ReviewViewSet(viewsets.ModelViewSet):
    """
    Review viewset for viswamedha.com
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class SubjectViewSet(viewsets.ModelViewSet):
    """
    Subject viewset for viswamedha.com
    """
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LevelViewSet(viewsets.ModelViewSet):
    """
    Level viewset for viswamedha.com
    """
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class StudentViewSet(viewsets.ModelViewSet):
    """
    Student viewset for viswamedha.com
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'student_uuid'

class CourseViewSet(viewsets.ModelViewSet):
    """
    Course viewset for viswamedha.com
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LessonViewSet(viewsets.ModelViewSet):
    """
    Lesson viewset for viswamedha.com
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsInLessonPlanOrIsAdmin]
    lookup_field = 'lesson_uuid'
    filterset_fields = ['lesson_plan', 'lesson_plan__student__student_uuid']

    def get_queryset(self):
        if self.request.user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(lesson_plan__student = self.request.user.student)

class LessonPlanViewSet(viewsets.ModelViewSet):
    """
    Lesson Plan viewset for viswamedha.com
    """
    queryset = LessonPlan.objects.all()
    serializer_class = LessonPlanSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'lesson_plan_uuid'

class EventViewSet(viewsets.ModelViewSet):
    """
    Event viewset for viswamedha.com
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

