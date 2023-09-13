from django.urls import path
from .views import HTVColorsView

urlpatterns = [
    path('colors/', HTVColorsView.as_view())
]
