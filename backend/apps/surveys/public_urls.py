from django.urls import path
from .public_views import PublicSurveyView

urlpatterns = [
    path("<slug:slug>/", PublicSurveyView.as_view(), name="public-survey"),
]