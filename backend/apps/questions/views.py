from rest_framework import generics
from rest_framework.permissions import (IsAuthenticated)
from .models import Question
from .serializers import (QuestionSerializer)

class QuestionCreateView(generics.CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

class QuestionListView(generics.ListAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        survey_id = self.kwargs["survey_id"]

        return Question.objects.filter(survey_id=survey_id).order_by("order")

class QuestionUpdateView(generics.UpdateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()

class QuestionDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()