# backend/catalog/serializers.py

from rest_framework import serializers
from .models import Watch

class WatchSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Watch. 
    Expone todos los campos necesarios para el frontend, incluyendo 
    los atributos de diseño (3D, color) y rendimiento.
    """
    class Meta:
        model = Watch
        fields = '__all__' 
        # __all__ es más rápido para un portafolio, pero en producción
        # es mejor listar los campos explícitamente.