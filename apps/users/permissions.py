from rest_framework.permissions import BasePermission

class IsOwnerOrAdmin(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it, or admin.
    """
    message = 'You must be the owner of this object.'

    def has_permission(self, request, view): 
        return (request.user.is_authenticated and request.user.is_staff) or request.method == 'POST'

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user or request.user.is_staff