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

class LessonSerializer(serializers.ModelSerializer):
    """
    Lesson serializer for viswamedha.com
    """
    event = EventSerializer()
    lesson_file = LessonFileSerializer(many=True, read_only=True)
    class Meta:
        model = Lesson
        fields = ['lesson_id', 'lesson_uuid', 'event', 'lesson_plan', 'cost', 'paid', 'lesson_file', 'note', 'homework']
        read_only_fields = ['lesson_id', 'lesson_uuid', 'lesson_file']
        depth = 3
    
    def update(self, instance, validated_data):
        instance.event.start = validated_data.get('start', instance.event.start)
        instance.event.end = validated_data.get('end', instance.event.end)
        instance.event.clashing = validated_data.get('clashing', instance.event.clashing)
        instance.event.save()
        instance.lesson_plan = validated_data.get('lesson_plan', instance.lesson_plan)
        instance.cost = validated_data.get('cost', instance.cost)
        instance.paid = validated_data.get('paid', instance.paid)
        instance.note = validated_data.get('note', instance.note)
        instance.homework = validated_data.get('homework', instance.homework)
        instance.save()
        return instance

class StudentSerializer(serializers.ModelSerializer):
    """
    Student serializer for viswamedha.com
    """
    lesson_plan = LessonPlanSerializer(many=True)
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ['id', 'user', 'lesson_plan', 'student_uuid']
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
