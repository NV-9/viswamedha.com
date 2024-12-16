from rest_framework import permissions

class ContactMessagePermission(permissions.BasePermission):
    message = 'Cannot create contact message without authentication.'

    def has_permission(self, request, view):   
        return (request.user.is_authenticated and request.user.is_staff) or request.method == 'POST'
    
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.is_staff