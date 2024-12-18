from rest_framework.permissions import BasePermission

class ContactMessagePermission(BasePermission):
    message = 'Cannot create contact message without authentication.'

    def has_permission(self, request, view):   
        return (request.user.is_authenticated and request.user.is_staff) or request.method == 'POST'
    
    def has_object_permission(self, request, view, obj):
        return request.user.is_authenticated and request.user.is_staff

class IsAdminForObjectOrReadOnlyPermission(BasePermission):
    """
    Custom permission to only admin to edit objects
    """
    message = 'You do not have the required permissions to view this.'

    def has_permission(self, request, view): 
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.is_authenticated and request.user.is_staff