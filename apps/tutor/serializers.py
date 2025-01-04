from rest_framework import serializers

from apps.tutor.models import Course, Event, Lesson, LessonPlan, Review, Student, Subject, Level, LessonFile
from apps.users.serializers import UserSerializer

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

class LessonPlanSerializer(serializers.ModelSerializer):
    """
    Lesson Plan serializer for viswamedha.com
    """
    course = CourseSerializer()
    class Meta:
        model = LessonPlan
        fields = ['id', 'course']
        read_only_fields = ['id']

class EventSerializer(serializers.ModelSerializer):
    """
    Event serializer for viswamedha.com
    """
    class Meta:
        model = Event
        fields = ['id', 'event_uuid', 'start', 'end', 'clashing']
        read_only_fields = ['id']

class LessonFileSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()
    file = serializers.FileField()
    lesson = serializers.UUIDField(write_only=True)

    class Meta:
        model = LessonFile
        fields = ['id', 'file', 'name', 'file_uuid', 'lesson']
        read_only_fields = ['id', 'file_uuid']

    def get_name(self, obj: LessonFile):
        return obj.filename
    
    def get_lesson(self, obj: LessonFile):
        return obj.lesson.lesson_uuid

    def validate_lesson(self, value):
        try:
            lesson = Lesson.objects.get(lesson_uuid=value)
        except Lesson.DoesNotExist:
            raise serializers.ValidationError("Invalid lesson UUID.")
        return lesson
    
    def create(self, validated_data):
        lesson = validated_data.pop('lesson') 
        return LessonFile.objects.create(lesson=lesson, **validated_data)


class StudentSerializer(serializers.ModelSerializer):
    """
    Student serializer for viswamedha.com
    """
    lesson_plan = LessonPlanSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['id', 'user', 'lesson_plan', 'student_uuid', 'username']
        read_only_fields = ['id']
        depth = 2
    


class LessonSerializer(serializers.ModelSerializer):
    """
    Lesson serializer for viswamedha.com
    """
    lesson_file = LessonFileSerializer(many=True, read_only=True)
    lesson_plan = LessonPlanSerializer(read_only=True)
    students = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['lesson_id', 'lesson_uuid', 'lesson_plan', 'cost', 'paid', 'lesson_file', 'note', 'homework', 'students', 'start', 'end', 'clashing']
        read_only_fields = ['lesson_id', 'lesson_uuid', 'lesson_file']
        depth = 3
    
    def get_students(self, obj: Lesson):
         return [{"student_uuid": student.student_uuid, "username": student.username} for student in obj.lesson_plan.student.all()]

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
