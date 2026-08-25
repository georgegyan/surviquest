from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Survey
from .serializers import SurveySerializer
from .analytics import (get_survey_analytics)

class SurveyListCreateView(generics.ListCreateAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class SurveyListView(generics.ListAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(owner=self.request.user).order_by("-created_at")

class SurveyDetailView(generics.RetrieveAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(
            owner=self.request.user
        )

class SurveyUpdateView(generics.UpdateAPIView):
    serializer_class = SurveySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(owner=self.request.user)

class SurveyDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Survey.objects.filter(owner=self.request.user)

class SurveyAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        try:
            survey = Survey.objects.get(id=pk, owner=request.user)

        except Survey.DoesNotExist:
            return Response(
                {
                    "detail":
                    "Survey not found."
                },
                status=404
            )

        analytics = (get_survey_analytics(survey))

        return Response(analytics)
        