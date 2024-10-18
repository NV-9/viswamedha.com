from rest_framework import serializers

from apps.users.models import User

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer for viswamedha.com
    """
    class Meta:
        model = User
        fields = ['id', 'user_uuid', 'username', 'email_address', 'first_name', 'last_name', 'date_of_birth', 'is_staff', 'is_active', 'is_verified', 'created_at', 'updated_at', 'verification_token', 'reset_password_token', 'reset_instance_token', 'password_reset_at']
        read_only_fields = ['id', 'user_uuid', 'created_at', 'updated_at', 'verification_token', 'reset_password_token', 'reset_instance_token', 'password_reset_at']
