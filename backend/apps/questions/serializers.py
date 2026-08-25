from rest_framework import serializers
from .models import ( Question, QuestionOption )

class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = [
            "id",
            "question",
            "option_text",
            "order",
        ]

class QuestionSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(allow_blank=True)
    options = QuestionOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "survey",
            "question_text",
            "question_type",
            "is_required",
            "order",
            "settings",
            "options",
            "created_at",
        ]