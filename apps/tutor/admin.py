from django.contrib import admin

from .models import Course, LessonPlan, Student, Event, Lesson

admin.site.register(Course)
admin.site.register(LessonPlan)
admin.site.register(Student)
admin.site.register(Event)
admin.site.register(Lesson)
