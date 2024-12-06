from django.contrib import admin

from apps.tutor.models import Course, Event, Lesson, LessonPlan, Review, Student, Subject, Level

admin.site.register(Review)
admin.site.register(Subject)
admin.site.register(Level)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(LessonPlan)
admin.site.register(Event)
