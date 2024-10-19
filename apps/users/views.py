from django.views.decorators.http import require_POST
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
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
        return JsonResponse({'detail': 'You\'re not logged in.'})
    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})
