from django.db.models import Model, AutoField, CharField, IntegerField, TextField, ForeignKey, CASCADE, OneToOneField, ManyToManyField, DateTimeField, BooleanField, UUIDField
from django.utils.translation import gettext_lazy as _
from uuid import uuid4
from random import choice 


from apps.users.models import User
from apps.tutor.models import Student


def get_random_code():
    return ''.join(choice('0123456789abcdefghijklmnopqrstuvwxyz') for i in range(8))

class Room(Model):
    """
    Room model for viswamedha.com
    """

    id   = AutoField(primary_key = True)
    room_uuid = UUIDField(verbose_name = _('Room UUID'), default = uuid4, editable = False)

    class Meta:
        verbose_name = 'Room'
        verbose_name_plural = 'Rooms'
    
    @property
    def group(self):
        return hasattr(self, 'group_chat')

class DirectChat(Room):
    """
    Direct Chat model for viswamedha.com
    """
    
    room  = OneToOneField(Room, on_delete = CASCADE, parent_link = True, related_name = 'direct_chat')

    users = ManyToManyField(User, verbose_name = _('Users'), related_name = 'direct_rooms', blank = True)
    online = ManyToManyField(User, verbose_name = _('Online'), related_name = 'direct_online_rooms', blank = True)
    limit = IntegerField(verbose_name = _('Limit'), default = 2, editable = False)

    class Meta:
        verbose_name = 'Chat'
        verbose_name_plural = 'Chats'


class GroupChat(Room):
    """
    Group Chat model for viswamedha.com
    """

    room  = OneToOneField(Room, on_delete = CASCADE, parent_link = True, related_name = 'group_chat')
    name = CharField(verbose_name = _('Name'), max_length = 255, unique = True)
    description = TextField(verbose_name = _('Description'), blank = True, default = '')

    users = ManyToManyField(User, verbose_name = _('Users'), related_name = 'group_rooms', blank = True)
    online = ManyToManyField(User, verbose_name = _('Online'), related_name = 'group_online_rooms', blank = True)
    staff = ManyToManyField(User, verbose_name = _('Staff'), related_name = 'staff_rooms', blank = True)
    owner = ForeignKey(User, verbose_name = _('Owner'), related_name = 'rooms_owned', on_delete = CASCADE)
    limit = IntegerField(verbose_name = _('Limit'), default = 10)

    invite_code = CharField(verbose_name = _('Invite Code'), max_length = 8, default = get_random_code, unique = True)

    class Meta:
        verbose_name = 'Group Chat'
        verbose_name_plural = 'Group Chats'

    def __str__(self):
        return self.name

class Message(Model):
    """
    Message model for viswamedha.com
    """

    message_uuid = UUIDField(verbose_name = _('Message UUID'), default = uuid4, editable = False)
    user = ForeignKey(to = User, on_delete = CASCADE)
    room = ForeignKey(to = Room, on_delete = CASCADE)
    content   = CharField(max_length = 512)
    timestamp = DateTimeField(auto_now_add = True)

    def __str__(self):
        return f'{self.user.username}: {self.content} [{self.timestamp}]'