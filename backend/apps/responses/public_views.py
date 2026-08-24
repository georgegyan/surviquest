import json
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.surveys.models import Survey
from apps.questions.models import Question
from .models import (Response as SurveyResponse, Answer)
from .serializers import (SurveySubmissionSerializer)

class SubmitSurveyView(APIView):
    def post(self, request, slug):
        serializer = SurveySubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            survey = Survey.objects.prefetch_related("questions").get(slug=slug)
        except Survey.DoesNotExist:
            return Response(
                {
                    "detail": "Survey not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        # Check survey status
        if survey.status != "published":
            return Response(
                {
                    "detail": "Survey is not published."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check expiration
        if (
            survey.expires_at and
            survey.expires_at < timezone.now()
        ):
            return Response(
                {
                    "detail": "Survey has expired."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        submitted_answers = (serializer.validated_data["answers"])
        submitted_question_ids = [item["question_id"] for item in submitted_answers]

        # Validate required questions
        required_questions = (
            survey.questions.filter(
                is_required=True
            )
        )

        for question in required_questions:
            if (
                question.id
                not in submitted_question_ids
            ):
                return Response(
                    {
                        "detail":
                        f"Question '{question.question_text}' is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Validate all submitted questions belong to survey
        survey_question_ids = set(survey.questions.values_list("id", flat=True))

        for question_id in submitted_question_ids:
            if question_id not in survey_question_ids:
                return Response(
                    {
                        "detail":
                        f"Question ID {question_id} does not belong to this survey."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Create response record
        response_record = (
            SurveyResponse.objects.create(
                survey=survey
            )
        )

        # Save answers
        for item in submitted_answers:

            question = Question.objects.get(
                id=item["question_id"]
            )

            Answer.objects.create(
                response=response_record,
                question=question,
                answer_text=json.dumps(
                    item["answer"]
                )
            )

        return Response(
            {
                "message":
                "Survey submitted successfully.",
                "response_id":
                response_record.id
            },
            status=status.HTTP_201_CREATED
        )