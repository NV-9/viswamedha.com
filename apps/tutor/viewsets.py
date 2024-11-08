from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.tutor.models import Review
from apps.tutor.serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    """
    Review viewset for viswamedha.com
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]