from django.urls import path
from .views import (
    CreateSurveyView,
    SurveyListView,
    SurveyDetailView,
    SurveyUpdateView
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

    path(
    "<int:pk>/update/",
    SurveyUpdateView.as_view(),
    name="update-survey"
),
]