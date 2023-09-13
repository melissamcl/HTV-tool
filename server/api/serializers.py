from rest_framework import serializers
from .models import HTVColor

class HTVColorSerializer(serializers.ModelSerializer):
  class Meta:
    model = HTVColor
    fields = ('__all__')