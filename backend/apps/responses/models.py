from django.db import models
from apps.surveys.models import Survey
from apps.questions.models import Question

# Create your models here.
class Response(models.Model): 
    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="responses")
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_anonymous = models.BooleanField(default=True)
    respondent_identifier = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Response {self.id}"

class Answer(models.Model):
    response = models.ForeignKey(Response, on_delete=models.CASCADE, related_name="answers")
    questions = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return (f"Answer to {self.questions.id}")