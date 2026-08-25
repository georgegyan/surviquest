from django.urls import path
from .views import (
    SurveyListCreateView,
    SurveyListView,
    SurveyDetailView,
    SurveyUpdateView,
    SurveyDeleteView,
    SurveyAnalyticsView
)
from .export_views import ExportSurveyCSVView, ExportSurveyExcelView

urlpatterns = [
    path("create/", SurveyListCreateView.as_view(), name="create-survey"),
    path("", SurveyListView.as_view(), name="survey-list"),
    path("<int:pk>/", SurveyDetailView.as_view(), name="survey-detail"),
    path("<int:pk>/update/", SurveyUpdateView.as_view(), name="update-survey"),
    path("<int:pk>/delete/", SurveyDeleteView.as_view(), name="delete-survey"),
    path("<int:pk>/analytics/", SurveyAnalyticsView.as_view(), name="survey-analytics"),
    path("<int:pk>/export/csv/", ExportSurveyCSVView.as_view(), name="export-csv"),
    path("<int:pk>/export/excel/", ExportSurveyExcelView.as_view(), name="export-excel"),
]