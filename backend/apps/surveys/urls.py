from django.urls import path
from .views import CreateSurveyView

urlpatterns = [
    path(
        "",
        CreateSurveyView.as_view(),
        name="create-survey"
    ),
]