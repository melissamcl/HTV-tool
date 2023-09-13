from django.urls import path
from .views import HTVColorListView

app_name = 'api'

urlpatterns = [
    path('colors/', HTVColorListView.as_view())
]
