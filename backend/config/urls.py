# backend/config/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from catalog.views import WatchViewSet, HeroWatchViewSet # 1. Importa las vistas

# 2. Crea un router
router = DefaultRouter()
router.register(r'watches', WatchViewSet, basename='watch')
router.register(r'hero-watches', HeroWatchViewSet, basename='hero-watch')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 3. Agrega las URLs de la API
    path('api/', include(router.urls)), 
]
