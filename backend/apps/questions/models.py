from django.db import models
from apps.surveys.models import Survey


class Question(models.Model):

    QUESTION_TYPES = [
        ("short_text", "Short Text"),
        ("long_text", "Long Text"),
        ("multiple_choice", "Multiple Choice"),
        ("checkbox", "Checkbox"),
        ("dropdown", "Dropdown"),
        ("rating", "Rating"),
        ("yes_no", "Yes/No"),
    ]

    survey = models.ForeignKey(Survey, on_delete=models.CASCADE, related_name="questions")
    question_text = models.TextField()
    question_type = models.CharField(max_length=30, choices=QUESTION_TYPES)
    is_required = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=1)
    settings = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.question_text

class QuestionOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="options")
    option_text = models.CharField(max_length=255)
    order = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.option_text