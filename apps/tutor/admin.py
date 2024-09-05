from django.contrib import admin

from .models import Course, Event, Lesson, LessonPlan, Review, Student

admin.site.register(Course)
admin.site.register(Event)
admin.site.register(Lesson)
admin.site.register(LessonPlan)
admin.site.register(Review)
admin.site.register(Student)
