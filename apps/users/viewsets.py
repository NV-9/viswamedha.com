from rest_framework import viewsets

from apps.users.models import User
from apps.users.permissions import IsOwnerOrAdmin
from apps.users.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsOwnerOrAdmin]
    lookup_field = 'user_uuid'

    def get_queryset(self):
        if self.request.user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(id = self.request.user.id)