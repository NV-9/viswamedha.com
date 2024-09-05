from rest_framework import serializers

from .models import Course, Event, Lesson, LessonPlan, Review, Student


class StudentSerializer(serializers.ModelSerializer):
    """
    Student serializer for viswamedha.com
    """
    class Meta:
        model = Student
        fields = ['id', 'user']
        read_only_fields = ['id', 'user']
        depth = 2


class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializer for viswamedha.com
    """
    class Meta:
        model = Review
        fields = ['id', 'initials', 'review']
        read_only_fields = ['id']


class CourseSerializer(serializers.ModelSerializer):
    """
    Course serializer for viswamedha.com
    """
    class Meta:
        model = Course
        fields = ['id', 'name', 'desc', 'cost']
        read_only_fields = ['id']


class LessonPlanSerializer(serializers.ModelSerializer):
    """
    Lesson Plan serializer for viswamedha.com
    """
    class Meta:
        model = LessonPlan
        fields = ['id', 'course', 'student', 'cost']
        read_only_fields = ['id']
        depth = 2


class EventSerializer(serializers.ModelSerializer):
    """
    Event serializer for viswamedha.com
    """
    class Meta:
        model = Event
        fields = ['id', 'title', 'start', 'end', 'course', 'lesson_plan']
        read_only_fields = ['id']


class LessonSerializer(serializers.ModelSerializer):
    """
    Lesson serializer for viswamedha.com
    """
    class Meta:
        model = Lesson
        fields = '__all__'
        read_only_fields = ['id']
        depth = 2

