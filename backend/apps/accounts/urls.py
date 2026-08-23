from os import name

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView, RegisterView

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/auth/",
        include("apps.accounts.urls")
    ),

    path(
        "login/",
        LoginView.as_view(),
        name="login"
    ),
    path(
        "refresh/",
        TokenRefreshView.as_view(),
        name="refresh"
    )
]