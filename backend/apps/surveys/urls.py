from django.urls import path
from .views import (
    SurveyListCreateView,
    SurveyListView,
    SurveyDetailView,
    SurveyUpdateView,
    SurveyDeleteView,
    SurveyAnalyticsView
)

urlpatterns = [
    path("create/", SurveyListCreateView.as_view(), name="create-survey"),
    path("", SurveyListView.as_view(), name="survey-list"),
    path("<int:pk>/", SurveyDetailView.as_view(), name="survey-detail"),
    path("<int:pk>/update/", SurveyUpdateView.as_view(), name="update-survey"),
    path("<int:pk>/delete/", SurveyDeleteView.as_view(), name="delete-survey"),
    path("<int:pk>/analytics", SurveyAnalyticsView.as_views(), name="survey-analytics"),
]