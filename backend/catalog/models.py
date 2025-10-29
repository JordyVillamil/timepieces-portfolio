# backend/catalog/models.py

from django.db import models

class Watch(models.Model):
    # --- Jerarquía Visual Principal ---
    name = models.CharField(
        max_length=100, 
        unique=True, 
        verbose_name="Nombre del Reloj (Tipografía Audaz)"
    )
    # Descripción para el texto discreto
    short_description = models.TextField(
        max_length=200, 
        verbose_name="Descripción Breve (Texto discreto)"
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)

    # --- Diseño Experimental y 3D ---
    # URL al archivo .glb o .gltf para React-Three-Fiber
    model_3d_url = models.URLField(
        max_length=300, 
        blank=True, 
        null=True, 
        verbose_name="URL del Modelo 3D (.glb)"
    )
    # Color de acento (ej. #FF5733) para el botón o el título
    highlight_color = models.CharField(
        max_length=7, 
        default="#FF00D4", 
        verbose_name="Color de Acento (Neón)"
    )
    
    # --- Campos de Accesibilidad y Filtro ---
    brand = models.CharField(max_length=50, default="TimePieces")
    # Filtro para saber cuáles mostrar en el Hero principal
    is_experimental_hero = models.BooleanField(
        default=False, 
        verbose_name="¿Es apto para el Hero experimental?"
    )

    class Meta:
        verbose_name = "Reloj TimePiece"
        verbose_name_plural = "Relojes TimePieces"
        ordering = ['-id'] # Mostrar los más nuevos primero

    def __str__(self):
        return self.name