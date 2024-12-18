from rest_framework.permissions import BasePermission

class IsInLessonPlanOrIsAdmin(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it, or admin.
    """
    message = 'You do not have the required permissions to view this.'

    def has_permission(self, request, view): 
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.lesson_plan.student.contains(request.user.student) or request.user.is_staff