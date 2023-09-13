from django.shortcuts import render
from rest_framework import generics
from .models import HTVColors
from .serializers import HTVColorsSerializer

# Return all colors using serializer functionality.
class HTVColorsView(generics.CreateAPIView):
  queryset = HTVColors.objects.all() 
  serializer_class = HTVColorsSerializer
