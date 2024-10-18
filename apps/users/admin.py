from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from apps.users.models import User

@admin.register(User)
class MyUserAdmin(UserAdmin):

    list_display = ['id', 'email_address', 'first_name', 'last_name']
    list_filter = ['is_verified']
    ordering = ['id', 'email_address']
    filter_horizontal = []

    fieldsets = (
        (
            'Identification', {
                'fields': (
                    ('id', 'user_uuid',),
                )
            }
        ),
        (
            'Personal Information', {
                'fields': (('email_address', 'date_of_birth'), ('first_name', 'last_name'),),
            }
        ),
        (
            'Permissions', {
                'fields': (('is_active','is_staff',)),
            }
        ),
        (
            'Verification', {
                'fields': (('is_verified', 'verification_token'), ('reset_password_token', 'reset_instance_token')),
            }
        ),
        (
            'Log', {
                'fields': (('created_at', 'updated_at'), ('last_login', 'password_reset_at'),),
            }
        ),
    )
    readonly_fields = ['id', 'user_uuid', 'created_at', 'updated_at', 'last_login', 'password_reset_at']
