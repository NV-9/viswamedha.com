from rest_framework import serializers

from .models import Course, Event, Lesson, LessonPlan, Review, Student, Subject, Level

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
    subject = serializers.CharField(source='subject.name')
    level   = serializers.CharField(source='level.name')

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'subject', 'level', 'cost']
        read_only_fields = ['id']
     

class LessonSerializer(serializers.ModelSerializer):
    """
    Lesson serializer for viswamedha.com
    """
    class Meta:
        model = Lesson
        fields = ['id', 'name', 'description', 'course', 'lesson_plan']
        read_only_fields = ['id']

class LessonPlanSerializer(serializers.ModelSerializer):
    """
    Lesson Plan serializer for viswamedha.com
    """
    class Meta:
        model = LessonPlan
        fields = ['id', 'course', 'student']
        read_only_fields = ['id']

class EventSerializer(serializers.ModelSerializer):
    """
    Event serializer for viswamedha.com
    """
    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'date', 'lesson_plan']
        read_only_fields = ['id']

class StudentSerializer(serializers.ModelSerializer):
    """
    Student serializer for viswamedha.com
    """
    class Meta:
        model = Student
        fields = ['id', 'user']
        read_only_fields = ['id']
        depth = 2

class SubjectSerializer(serializers.ModelSerializer):
    """
    Subject serializer for viswamedha.com
    """
    class Meta:
        model = Subject
        fields = ['id', 'name']
        read_only_fields = ['id']

class LevelSerializer(serializers.ModelSerializer):
    """
    Level serializer for viswamedha.com
    """
    class Meta:
        model = Level
        fields = ['id', 'name']
        read_only_fields = ['id']
