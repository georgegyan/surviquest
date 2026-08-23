from django.urls import path
from .views import (
    CreateSurveyView,
    SurveyListView
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
]