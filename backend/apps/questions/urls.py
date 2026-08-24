from django.urls import path
from .views import (
    QuestionCreateView,
    QuestionListView,
    QuestionUpdateView,
    QuestionDeleteView,
    OptionListView,
    OptionCreateView,
    OptionUpdateView,
    OptionDeleteView
)

urlpatterns = [
    path("create/", QuestionCreateView.as_view(),  name="create-question"),
    path("survey/<int:survey_id>/", QuestionListView.as_view(), name="question-list"),
    path("<int:pk>/update/", QuestionUpdateView.as_view(), name="update-question"),
    path("<int:pk>/delete/", QuestionDeleteView.as_view(), name="delete-question"),
    path("<int:question_id>/options/", OptionListView.as_view(), name="option-list"),
    path("options/create/", OptionCreateView.as_view(), name="create-option"),
    path("options/<int:pk>/update/", OptionUpdateView.as_view(), name="update-option"),
    path("options/<int:pk>/delete/", OptionDeleteView.as_view(), name="delete-option"),
]