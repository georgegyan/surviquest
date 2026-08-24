from django.urls import path

from .public_views import (SubmitSurveyView)

urlpatterns = [
    path("<slug:slug>/submit/", SubmitSurveyView.as_view(), name="submit-survey"),
]