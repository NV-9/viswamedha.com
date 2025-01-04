from django.urls import path

from apps.tutor.views import other_lessons_view

urlpatterns = [
    path('other-lessons/', other_lessons_view, name='other_lessons_view'),
]
