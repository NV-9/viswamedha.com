from rest_framework import serializers

from apps.users.models import User

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer for viswamedha.com
    """
    full_name = serializers.SerializerMethodField()
    is_student = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'user_uuid', 'username', 'email_address', 'first_name', 'last_name', 'date_of_birth', 'is_staff', 'is_active', 'is_verified', 'verification_token', 'reset_password_token', 'reset_instance_token', 'password_reset_at', 'full_name', 'is_student']
        read_only_fields = ['id', 'user_uuid', 'verification_token', 'reset_password_token', 'reset_instance_token', 'password_reset_at', 'full_name', 'is_student']
    
    def get_full_name(self, obj):
        return obj.full_name

    def get_is_student(self, obj):
        return obj.is_student
