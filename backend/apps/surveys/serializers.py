from rest_framework import serializers
from .models import Survey

class SurveySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.email')

    class Meta:
        model = Survey
        fields = '__all__'
        read_only_fields = ['owner', 'slug', 'created_at', 'updated_at']