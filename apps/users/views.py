from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.conf import settings

from apps.users.models import User
from apps.users.serializers import UserSerializer

import json

@require_POST
def login_view(request):
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({'detail': 'Invalid JSON provided.', 'success': False}, status = 401)
    username = data.get('username')
    password = data.get('password')
    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.', 'success': False})

    user = authenticate(username = username, password = password)
    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.', 'success': False})

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.', 'success': True})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.', 'success': False})
    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.', 'success': True})


@require_POST
def signup_view(request):
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({'detail': 'Invalid JSON provided.', 'success': False}, status = 401)
    
    if User.objects.filter(username = data.get('username')).exists():
        return JsonResponse({'detail': 'Username already exists.', 'success': False})
    if User.objects.filter(email_address = data.get('email_address')).exists():
        return JsonResponse({'detail': 'Email address already exists.', 'success': False})
    if len(data.get('first_name')) == 0 or len(data.get('last_name')) == 0:
        return JsonResponse({'detail': 'First and last name(s) must be provided.', 'success': False})
    if data.get('password') != data.get('confirm_password'):
        return JsonResponse({'detail': 'Passwords do not match.', 'success': False})

    user = User.objects.create(username = data.get('username'),
                        email_address = data.get('email_address'),
                        first_name = data.get('first_name'),
                        last_name = data.get('last_name'),
                        date_of_birth = data.get('date_of_birth'))
    if not user:
        return JsonResponse({'detail': 'User not created.', 'success': False})
    user.set_password(data.get('password'))
    user.save()
    return JsonResponse({'detail': 'User account created successfully.', 'success': True})


def session_view(request):
    return JsonResponse({'isAuthenticated': request.user.is_authenticated, 'isStaff': request.user.is_staff})

def socials_view(request):
    return JsonResponse(settings.SOCIAL_ACCOUNT_LINKS)

def me_view(request):
    if request.user.is_authenticated:
        user_data = UserSerializer(request.user).data
        user_data.update({'success': True})
        user_data.update({'student_uuid': request.user.student.student_uuid if hasattr(request.user, 'student') else None})
        return JsonResponse(user_data)
    else:
        return JsonResponse({'detail': "You're not logged in.", 'success': False})

def change_password_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': "You're not logged in.", 'success': False})
    try:
        data = json.loads(request.body)
    except:
        return JsonResponse({'detail': 'Invalid JSON provided.', 'success': False}, status = 401)
    for key in ['old_password', 'password', 'confirm_password']:
        data: dict
        if data.get(key, None) is None:
            return JsonResponse({'detail': f'"{key}" not provided', 'succes': True})
    if data.get('password') != data.get('confirm_password'):
        return JsonResponse({'detail': 'Passwords do not match', 'success': True})
    user: User = request.user
    user.set_password(data.get('password'))
    user.save()
    return JsonResponse({'success': True})