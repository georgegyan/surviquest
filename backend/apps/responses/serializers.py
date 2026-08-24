from rest_framework import serializers

class AnswerSubmissionSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    answer = serializers.JSONField()

class SurveySubmissionSerializer(serializers.Serializer):
    answers = AnswerSubmissionSerializer(many=True)