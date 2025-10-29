from django.contrib import admin
from .models import Watch  # 1. Importa tu modelo

# 2. Registra el modelo en el panel de admin
admin.site.register(Watch)
