from rest_framework import serializers
from .models import ( Question, QuestionOption )

class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = [
            "id",
            "option_text",
            "order",
        ]

class QuestionSerializer(serializers.ModelSerializer):
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

class QuestionSerializer(serializers.ModelSerializer):
    options = QuestionOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "question_text",
            "question_type",
            "is_required",
            "order",
            "settings",
            "options",
        ]