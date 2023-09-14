from django.shortcuts import render
from rest_framework import generics, status
from .models import HTVColor
from .serializers import HTVColorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Handle GET all colors
class HTVColorListView(generics.ListAPIView):
  queryset = HTVColor.objects.all() 
  serializer_class = HTVColorSerializer

# Handle GET with hex code input - returns similar color(s) from db
class HTVColorSimilarityView(generics.ListAPIView):
  serializer_class = HTVColorSerializer

  def get_queryset(self):
    input_hex = self.request.query_params.get('hex_code','')
    # TODO: figure out best logic or tool for color matching and implement
    queryset = HTVColor.objects.all()
    return queryset[0]

# Handle PUSH for new color
class HTVColorCreateView(generics.CreateAPIView):
  serializer_class = HTVColorSerializer

  def post(self, request, format=None):
    serializer = self.serializer_class(data=request.data)

    if serializer.is_valid():
      brand = serializer.validated_data.get('brand')
      style = serializer.validated_data.get('style')
      name = serializer.validated_data.get('name')
      hex_code = serializer.validated_data.get('hex_code')

      input_color = HTVColor(brand=brand, style=style, name=name, hex_code=hex_code)
      input_color.save()

      return Response(HTVColorSerializer(input_color).data, status=status.HTTP_201_CREATED)
  
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Handle GET, PUT, PATCH /api/colors/<id>/ - primary use case to update exisiting color properties
class HTVColorUpdateView(generics.RetrieveUpdateAPIView):
  queryset = HTVColor.objects.all()
  serializer_class = HTVColorSerializer