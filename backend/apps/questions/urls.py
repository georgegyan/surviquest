from django.urls import path
from .views import (
    QuestionCreateView,
    QuestionListView,
    QuestionUpdateView,
    QuestionDeleteView,
)

urlpatterns = [
    path("create/", QuestionCreateView.as_view(),  name="create-question"),
    path("survey/<int:survey_id>/", QuestionListView.as_view(), name="question-list"),
    path("<int:pk>/update/", QuestionUpdateView.as_view(), name="update-question"),
    path("<int:pk>/delete/", QuestionDeleteView.as_view(), name="delete-question"),
]