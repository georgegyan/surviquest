from rest_framework import generics
from rest_framework.permissions import (IsAuthenticated)
from .models import Survey
from .serializers import SurveySerializer

class SurveyListCreateView(generics.ListCreateAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SurveyListView(generics.ListAPIView):
    serializer_class = SurveySerializer
    permisssion_classes = [IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(owner=self.request.user).order_by