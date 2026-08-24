from rest_framework import generics
from rest_framework.permissions import (IsAuthenticated)
from .models import Question, QuestionOption
from .serializers import (QuestionSerializer, QuestionOptionSerializer)

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

class OptionCreateView(generics.CreateAPIView):
    serializer_class = (QuestionOptionSerializer)
    permission_classes = [IsAuthenticated]

class OptionListView(generics.ListAPIView):
    serializer_class = (QuestionOptionSerializer)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        question_id = self.kwargs["question_id"]
        return QuestionOption.objects.filter(question_id=question_id).order_by("order")

class OptionUpdateView(generics.UpdateAPIView):
    serializer_class = (QuestionOptionSerializer)
    permission_classes = [IsAuthenticated]
    queryset = QuestionOption.objects.all()

class OptionDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = QuestionOption.objects.all()