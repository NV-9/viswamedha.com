from django.http import JsonResponse

from apps.chat.models import DirectChat, GroupChat
from apps.chat.serializers import DirectChatSerializer, GroupChatSerializer
from apps.users.models import User

def create_direct_chat(request):
    if request.user.is_anonymous:
        return JsonResponse({'detail': 'User not authenticated', 'success': False})
    username = request.GET.get('username', None)
    if username is None:
        return JsonResponse({'detail': 'Username is required', 'success': False})
    try:
        user = User.objects.get(username = username)
    except User.DoesNotExist:       
        return JsonResponse({'detail': 'User not found', 'success': False})
    if DirectChat.objects.filter(users = request.user).filter(users = user).exists():
        return JsonResponse({'detail': 'Chat already exists', 'success': False})
    chat = DirectChat.objects.create()
    chat.users.add(request.user, user)
    chat.save()
    return JsonResponse({'success': True, 'chat': DirectChatSerializer(chat).data})
    
def join_group_chat(request):
    if request.user.is_anonymous:
        return JsonResponse({'detail': 'User not authenticated', 'success': False})
    invite_code = request.GET.get('invite_code', None)
    try:
        chat = GroupChat.objects.get(invite_code = invite_code)
    except GroupChat.DoesNotExist:
        return JsonResponse({'detail': 'Chat not found/Code incorrect', 'success': False})
    if chat.users.filter(user_uuid = request.user.user_uuid).exists():
        return JsonResponse({'detail': 'Already a member', 'success': False})
    if chat.users.count() >= chat.limit:
        return JsonResponse({'detail': 'Chat is full', 'success': False})
    chat.users.add(request.user)
    chat.save()
    return JsonResponse({'success': True, 'chat': GroupChatSerializer(chat).data})
