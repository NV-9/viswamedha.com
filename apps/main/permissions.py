from rest_framework import permissions

class ContactMessagePermission(permissions.BasePermission):
    message = 'Cannot create contact message without authentication.'

    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_staff:
            return True
        if request.method == 'POST':
            return True
        return False
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated and request.user.is_staff:
            return True
        return False