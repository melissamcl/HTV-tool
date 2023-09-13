from rest_framework import serializers
from .models import HTVColor

class ColorSerializer(serializers.ModelSerializer):
  class Meta:
    model = HTVColor
    fields = ('id', 'brand', 'style', 'name', 'hex')

class CreateColorSerializer(serializers.ModelSerializer):
  class Meta:
    model = HTVColor
    fields = ('brand', 'style', 'name', 'hex')