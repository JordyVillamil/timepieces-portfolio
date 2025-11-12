# backend/catalog/management/commands/seed_watches.py

from django.core.management.base import BaseCommand
from catalog.models import Watch


class Command(BaseCommand):
    help = "Agrega relojes de ejemplo al catálogo"

    def handle(self, *args, **kwargs):
        watches_data = [
            {
                "name": "GENESIS",
                "short_description": "El inicio de una nueva era. Diseño minimalista con tecnología avanzada.",
                "price": 2499.99,
                "highlight_color": "#FF00D4",
                "brand": "TimePieces",
                "is_experimental_hero": True,
                "model_3d_url": "/watch.glb",
            },
            {
                "name": "NEXUS",
                "short_description": "Conectividad sin límites. El reloj del futuro.",
                "price": 3299.99,
                "highlight_color": "#00FFFF",
                "brand": "TimePieces",
                "is_experimental_hero": False,
            },
            {
                "name": "QUANTUM",
                "short_description": "Precisión cuántica en tu muñeca.",
                "price": 4599.99,
                "highlight_color": "#00FF00",
                "brand": "TimePieces",
                "is_experimental_hero": False,
            },
            {
                "name": "NEON",
                "short_description": "Estilo urbano con luz propia.",
                "price": 1899.99,
                "highlight_color": "#FF6B00",
                "brand": "TimePieces",
                "is_experimental_hero": False,
            },
            {
                "name": "PULSE",
                "short_description": "El latido de la innovación.",
                "price": 2799.99,
                "highlight_color": "#FF0066",
                "brand": "TimePieces",
                "is_experimental_hero": False,
            },
            {
                "name": "HORIZON",
                "short_description": "Explora nuevos horizontes del tiempo.",
                "price": 3499.99,
                "highlight_color": "#8B00FF",
                "brand": "TimePieces",
                "is_experimental_hero": False,
            },
        ]

        for watch_data in watches_data:
            watch, created = Watch.objects.get_or_create(
                name=watch_data["name"], defaults=watch_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"✓ Creado: {watch.name}"))
            else:
                self.stdout.write(self.style.WARNING(f"○ Ya existe: {watch.name}"))

        self.stdout.write(self.style.SUCCESS(f"\n✓ Proceso completado"))
