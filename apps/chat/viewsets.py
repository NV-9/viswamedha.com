from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from apps.chat.models import DirectChat, GroupChat, Room, Message
from apps.chat.serializers import DirectChatSerializer, GroupChatSerializer, RoomSerializer, MessageSerializer


class DirectChatViewSet(ModelViewSet):
    """
    Direct Chat viewset for viswamedha.com
    """
    queryset = DirectChat.objects.all()
    serializer_class = DirectChatSerializer
    lookup_field = 'room_uuid'
    filterset_fields = ['room_uuid', 'users', 'users__user_uuid']

    def get_queryset(self):
        queryset = super().get_queryset()
        if user_uuid:= self.request.query_params.get('users__user_uuid', None):
            queryset = queryset.filter(users__user_uuid=user_uuid)
        return queryset

class GroupChatViewSet(ModelViewSet):
    """
    Group Chat viewset for viswamedha.com
    """
    queryset = GroupChat.objects.all()
    serializer_class = GroupChatSerializer
    lookup_field = 'room_uuid'
    filterset_fields = ['room_uuid', 'users', 'users__user_uuid', 'owner', 'staff']

    def get_queryset(self):
        queryset = super().get_queryset()
        if user_uuid:= self.request.query_params.get('users__user_uuid', None):
            queryset = queryset.filter(users__user_uuid=user_uuid)
        return queryset

class RoomViewSet(ModelViewSet):
    """
    Room viewset for viswamedha.com
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'room_uuid'

class MessageViewSet(ModelViewSet):
    """
    Message viewset for viswamedha.com
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    lookup_field = 'message_uuid'
    filterset_fields = ['room__room_uuid']
    pagination_class = LimitOffsetPagination