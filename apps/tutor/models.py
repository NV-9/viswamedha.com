from django.db.models import Model, AutoField, CharField, IntegerField, TextField, ForeignKey, CASCADE, OneToOneField, ManyToManyField, DateTimeField, BooleanField, UUIDField
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from datetime import datetime, timedelta
from uuid import uuid4

from apps.users.models import User

class Student(Model):
    """
    Student model for viswamedha.com
    """

    id   = AutoField(primary_key = True)
    user = OneToOneField(User, verbose_name = _('User'),related_name = 'student', on_delete = CASCADE)
    student_uuid = UUIDField(verbose_name = _('Student UUID'), default = uuid4, editable = False)

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return self.user.full_name

class Review(Model):
    """
    Review model for viswamedha.com
    """

    id       = AutoField(primary_key = True)
    initials = CharField(verbose_name = _('Initials'), max_length = 5)
    review   = TextField(verbose_name = _('Review'))

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'

    def __str__(self):
        return "Review by " + self.initials


class Subject(Model):
    """
    Subject model for viswamedha.com
    """

    id   = AutoField(primary_key = True)
    name = CharField(verbose_name = _('Name'), max_length = 255)

    class Meta:
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'

    def __str__(self):
        return self.name

class Level(Model):
    """
    Level model for viswamedha.com
    """

    id   = AutoField(primary_key = True)
    name = CharField(verbose_name = _('Name'), max_length = 255)

    class Meta:
        verbose_name = 'Level'
        verbose_name_plural = 'Levels'

    def __str__(self):
        return self.name


class Course(Model):
    """
    Course model for viswamedha.com
    """

    id          = AutoField(primary_key = True)
    course_uuid = UUIDField(verbose_name = _('Course UUID'), default = uuid4, editable = False)
    subject     = ForeignKey(Subject, verbose_name = _('Subject'), on_delete = CASCADE)
    level       = ForeignKey(Level, verbose_name = _('Level'), on_delete = CASCADE)
    description = TextField(verbose_name = _('Description'))
    cost        = IntegerField(verbose_name = _('Cost/hr (pp)'))

    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
    
    @property
    def name(self):
        return self.subject.name + ' - ' + self.level.name

    def __str__(self):
        return self.name

class LessonPlan(Model):
    """
    Lesson Plan model for viswamedha.com
    """

    id      = AutoField(primary_key = True)
    lesson_plan_uuid = UUIDField(verbose_name = _('Lesson Plan UUID'), default = uuid4, editable = False)
    course  = ForeignKey(Course, verbose_name = _('Course'), related_name = 'lesson_plan', on_delete = CASCADE)
    student = ManyToManyField(Student, verbose_name = _('Student'), related_name = 'lesson_plan')
    cost    = IntegerField(verbose_name = _('Cost/hr'))

    class Meta:
        verbose_name = 'Lesson Plan'
        verbose_name_plural = 'Lesson Plans'

    def __str__(self):
        return f"{self.course.name} | [{', '.join(student.user.full_name for student in self.student.all())}]"
    
    def create_lessons(self, start: datetime, end: datetime) -> 'Lesson':
        """
        Create lessons for the lesson plan
        """
        duration: timedelta = end - start
        return [Lesson.objects.create(start = start, end = end, lesson_plan = self, student = student, cost = self.cost * int(duration.total_seconds() / 3600)) for student in self.student.all()]


class Event(Model):
    """
    Event model for viswamedha.com
    """

    id         = AutoField(primary_key = True)
    event_uuid = UUIDField(verbose_name = _('Event UUID'), default = uuid4, editable = False)

    start = DateTimeField(verbose_name = _('Start'))
    end   = DateTimeField(verbose_name = _('End'))
    
    clashing = BooleanField(verbose_name = _('Clashing'), default = True)

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'
    
    def __str__(self):
        return f"{self.start} | {self.end}"
    
    def clean(self):
        if self.start > self.end:
            raise ValidationError(_('Start date cannot be greater than end date.'))
        if self.clashing:
            conflicting_events = Event.objects.exclude(id=self.id).filter(
                clashing = True,
                start__lt = self.end,
                end__gt = self.start
            )
            if conflicting_events.exists() and not (self.start == conflicting_events.first().end or self.end == conflicting_events.last().start):
                raise ValidationError(_('Event clashes with another event.'))
        return super().clean()

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Lesson(Event):
    """
    Lesson model for viswamedha.com
    """

    lesson_id   = AutoField(primary_key = True)
    lesson_uuid = UUIDField(verbose_name = _('Lesson UUID'), default = uuid4, editable = False)
    event       = OneToOneField(Event, parent_link = True, on_delete = CASCADE)
    lesson_plan = ForeignKey(LessonPlan, verbose_name = _('Lesson Plan'), related_name = 'lesson', on_delete = CASCADE)
    
    cost = IntegerField(verbose_name = _('Cost'))
    paid = BooleanField(verbose_name = _('Paid'), default = False)

    class Meta:
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'

    def __str__(self):
        return f"{self.id} | {self.lesson_plan}"

    def next_week_lesson(self) -> 'Lesson':
        """
        Get the next week lesson
        """
        return Lesson.objects.create(
            start = self.start + timedelta(weeks = 1),
            end = self.end + timedelta(weeks = 1),
            lesson_plan = self.lesson_plan,
            student = self.student,
            cost = self.cost
        )