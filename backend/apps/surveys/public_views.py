from rest_framework.generics import RetrieveAPIView
from .models import Survey
from .public_serializers import PublicSurveySerializer

class PublicSurveyView(RetrieveAPIView):
    serializer_class = (PublicSurveySerializer)
    lookup_field = "slug"
    queryset = (Survey.objects.prefetch_related("questions", "questions__options"))