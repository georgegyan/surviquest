from django.urls import path
from .views import (
    CreateSurveyView,
    SurveyListView,
    SurveyDetailView
)

urlpatterns = [
    path(
        "create/",
        CreateSurveyView.as_view(),
        name="create-survey"
    ),

    path(
        "",
        SurveyListView.as_view(),
        name="survey-list"
    ),

    path(
    "<int:pk>/",
    SurveyDetailView.as_view(),
    name="survey-detail"
),
]