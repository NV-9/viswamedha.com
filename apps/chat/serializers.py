from rest_framework import serializers

from apps.chat.models import DirectChat, GroupChat, Room, Message


class DirectChatSerializer(serializers.ModelSerializer):
    """
    Direct Chat serializer for viswamedha.com
    """

    users = serializers.SerializerMethodField()

    class Meta:
        model = DirectChat
        fields = ['id', 'room_uuid', 'users']
        read_only_fields = ['id', 'room_uuid']
        depth = 2
    
    def get_users(self, obj):
        return list(obj.users.values('user_uuid', 'username'))
        

class GroupChatSerializer(serializers.ModelSerializer):
    """
    Group Chat serializer for viswamedha.com
    """

    users = serializers.SerializerMethodField()

    class Meta:
        model = GroupChat
        fields = ['id', 'room_uuid', 'name', 'description', 'users', 'staff', 'owner']
        read_only_fields = ['id', 'room_uuid', 'users', 'staff', 'owner']
    
    def get_users(self, obj):
        return list(obj.users.values('user_uuid', 'username'))
    
class RoomSerializer(serializers.ModelSerializer):
    """
    Room serializer for viswamedha.com
    """

    class Meta:
        model = Room
        fields = ['id', 'room_uuid', 'group']
        read_only_fields = ['id', 'room_uuid']

class MessageSerializer(serializers.ModelSerializer):
    """
    Message serializer for viswamedha.com
    """

    user = serializers.SerializerMethodField()
    room = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['room', 'user', 'content', 'timestamp']
        read_only_fields = ['room', 'user', 'timestamp']
    

    def get_user(self, obj):
        return obj.user.username

    def get_room(self, obj):
        return str(obj.room.room_uuid)