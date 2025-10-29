# backend/catalog/views.py

from rest_framework import viewsets, permissions
from .models import Watch
from .serializers import WatchSerializer

class WatchViewSet(viewsets.ModelViewSet):
    """
    ViewSet que proporciona las operaciones CRUD para el modelo Watch.
    Permite listar (Catálogo) y recuperar detalles (Detalle de Producto).
    """
    queryset = Watch.objects.all().order_by('id')
    serializer_class = WatchSerializer
    # Para un portafolio, podemos permitir acceso de solo lectura a cualquiera:
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class HeroWatchViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet específico para el Hero. Solo lista (GET) los relojes marcados 
    como 'is_experimental_hero=True'.
    """
    queryset = Watch.objects.filter(is_experimental_hero=True).order_by('id')
    serializer_class = WatchSerializer
    permission_classes = [permissions.AllowAny] # El Hero debe ser público