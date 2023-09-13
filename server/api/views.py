from django.shortcuts import render
from rest_framework import generics, status
from .models import HTVColor
from .serializers import ColorSerializer, CreateColorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Return all colors using serializer functionality.
class ColorsView(generics.CreateAPIView):
  queryset = HTVColor.objects.all() 
  serializer_class = ColorSerializer

class CreateColorsView(APIView):
  # TODO figure out whether to store both rgb and hex
  # prob do calculation on frontend and only store hex
  serializer_class = CreateColorSerializer

  def post(self, request, format=None):
    serializer = self.serializer_class(data=request.data)
    if serializer.is_valid():
      brand = serializer.validated_data.get('brand')
      style = serializer.validated_data.get('style')
      name = serializer.validated_data.get('name')
      hex = serializer.validated_data.get('hex')

      print(f"Received data: brand={brand}, style={style}, name={name}, hex={hex_value}")

      queryset = HTVColor.objects.filter(brand=brand, style=style, name=name)

      print(f"Matching records: {queryset.count()}")

      if queryset.exists():
        color = queryset.first()
        color.hex = hex
        color.save(update_fields=['hex'])
      else:
        color = HTVColor(brand=brand, style=style, name=name, hex=hex)
        color.save()

      return Response(ColorSerializer(color).data, status=status.HTTP_201_CREATED)
  
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)