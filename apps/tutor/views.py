from django.http import JsonResponse
from django.utils.dateparse import parse_datetime

from apps.tutor.models import Lesson
from apps.tutor.serializers import LessonSerializer


def other_lessons_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'You are not authenticated.', 'success': False})
    if not request.user.is_student:
        return JsonResponse({'error': 'You are not a student.', 'success': False})
    start_range = request.GET.get('start_range')
    end_range = request.GET.get('end_range')

    try:
        start_date = parse_datetime(start_range)
        end_date = parse_datetime(end_range)
        if not start_date or not end_date:
            return JsonResponse({'error': 'Invalid date range.', 'success': False})
    except Exception as e:
        return JsonResponse({'error': f'Invalid date range: {str(e)}', 'success': False})

    other_lessons = Lesson.objects.filter(
        start__gte=start_date, 
        end__lte=end_date
    ).exclude(
        lesson_plan__student__user=request.user
    )
    data = {
        'success': True,
        'lessons': [{
            'lesson_uuid': lesson.lesson_uuid,
            'start': lesson.start,
            'end': lesson.end,
            'title': 'Slot Taken',
            'allDay': False,
            'clashing': lesson.clashing,
        } for lesson in other_lessons]
    }
    return JsonResponse(data, safe=False)
    
