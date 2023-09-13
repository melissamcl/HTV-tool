from rest_framework import serializers
from .models import HTVColors

class HTVColorsSerializer(serializers.ModelSerializer):
  class Meta:
    model = HTVColors
    fields = ('id', 'brand', 'style', 'name', 'hex', 'r', 'g', 'b')