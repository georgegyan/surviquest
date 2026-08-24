import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.surveys.models import Survey
from apps.responses.models import Answer

class ExportSurveyCSVView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        try:
            survey = Survey.objects.get(id=pk,owner=request.user)

        except Survey.DoesNotExist:
            return HttpResponse("Survey not found", status=404)

        response = HttpResponse(content_type="text/csv")
        response["Content-Disposition"] = (f'attachment; filename="{survey.title}.csv"')
        writer = csv.writer(response)
        questions = survey.questions.all()
        headers = [question.question_text for question in questions]
        writer.writerow(headers)
        survey_responses = (survey.responses.prefetch_related("answers"))

        for survey_response in survey_responses:
            row = []
            for question in questions:
                answer = (
                    survey_response.answers.filter(
                        question=question
                    ).first())
                row.append(
                    answer.answer_text
                    if answer
                    else "")
            writer.writerow(row)
            
        return response