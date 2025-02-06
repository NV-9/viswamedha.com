from django.contrib import admin
from django.contrib.admin import ModelAdmin

from apps.tutor.models import Course, Event, Lesson, LessonPlan, Review, Student, Subject, Level, LessonFile
from apps.tutor.forms import AddLessonForm

admin.site.register(Review)
admin.site.register(Subject)
admin.site.register(Level)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(LessonFile)
admin.site.register(LessonPlan)
admin.site.register(Event)

@admin.register(Lesson)
class LessonAdmin(ModelAdmin):
    list_display = ('event', 'lesson_plan', 'cost', 'paid')
    list_filter = ('event', 'lesson_plan', 'cost', 'paid')
    search_fields = ('event', 'lesson_plan', 'cost', 'paid')
    ordering = ('event', 'lesson_plan', 'cost', 'paid')

    form = AddLessonForm