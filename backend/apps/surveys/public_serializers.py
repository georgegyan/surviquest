from rest_framework import serializers
from .models import Survey
from apps.questions.serializers import QuestionSerializer

class PublicSurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Survey
        fields = [
            "title",
            "description",
            "category",
            "expires_at",
            "questions",
        ]