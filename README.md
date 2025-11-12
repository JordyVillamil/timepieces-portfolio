# TimePieces ⌚

**TimePieces** es una aplicación web moderna para la visualización y venta de relojes de lujo con tecnología 3D interactiva. El proyecto combina Django REST Framework en el backend con Next.js y React Three Fiber en el frontend para ofrecer una experiencia inmersiva de exploración de productos.

---

## 🚀 Características

- ✨ **Visualización 3D Interactiva**: Modelos de relojes renderizados con React Three Fiber
- 🎨 **Diseño Futurista**: Interfaz moderna con animaciones y efectos visuales
- 📱 **Responsive**: Adaptado para dispositivos móviles, tablets y desktop
- 🔄 **API RESTful**: Backend robusto con Django REST Framework
- 🐳 **Dockerizado**: Despliegue fácil con Docker Compose
- 🗄️ **PostgreSQL**: Base de datos relacional para persistencia
- 🎯 **TypeScript**: Tipado estático para mayor seguridad y mantenibilidad

---

## 🛠️ Stack Tecnológico

### Backend
- **Django 5.1.3**: Framework web de Python
- **Django REST Framework**: API REST
- **PostgreSQL 15**: Base de datos
- **CORS Headers**: Manejo de políticas CORS
- **Pillow**: Procesamiento de imágenes

### Frontend
- **Next.js 15.0.3**: Framework de React con App Router
- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework de estilos utility-first
- **React Three Fiber**: Renderizado 3D con Three.js
- **React Three Drei**: Helpers para R3F

### DevOps
- **Docker & Docker Compose**: Contenedorización
- **PostgreSQL Alpine**: Imagen ligera de base de datos

---

## 📁 Estructura del Proyecto

```
TimePieces/
├── backend/                    # Aplicación Django
│   ├── catalog/               # App principal del catálogo
│   │   ├── management/        # Comandos personalizados
│   │   │   └── commands/
│   │   │       └── seed_watches.py
│   │   ├── migrations/
│   │   ├── models.py          # Modelo Watch
│   │   ├── serializers.py     # Serializadores DRF
│   │   ├── views.py           # ViewSets y vistas
│   │   └── urls.py
│   ├── config/                # Configuración del proyecto
│   │   ├── settings.py
│   │   └── urls.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                   # Aplicación Next.js
│   ├── public/                # Archivos estáticos
│   │   └── watch.glb          # Modelo 3D del reloj
│   ├── src/
│   │   ├── app/               # App Router de Next.js
│   │   │   ├── page.tsx       # Landing page
│   │   │   ├── hero/          # Página experimental 3D
│   │   │   │   └── page.tsx
│   │   │   └── catalog/       # Catálogo de relojes
│   │   │       ├── page.tsx
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── components/        # Componentes React
│   │   │   ├── HeroExperimental.tsx
│   │   │   └── WatchModel.tsx
│   │   └── lib/
│   │       └── data.ts        # Funciones de fetch
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── Dockerfile
│
├── docker-compose.yml          # Orquestación de contenedores
└── README.md
```

---

## 🔧 Instalación y Configuración

### Prerrequisitos

- [Docker](https://www.docker.com/get-started) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Git](https://git-scm.com/)

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/timepieces.git
cd timepieces
```

### Levantar el Proyecto con Docker

```bash
docker-compose up --build
```

Este comando:
1. Construye las imágenes de Docker
2. Crea la base de datos PostgreSQL
3. Ejecuta las migraciones de Django
4. Carga datos de ejemplo con `seed_watches`
5. Inicia el servidor de desarrollo

### Acceder a la Aplicación

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Backend**: [http://localhost:8000/api](http://localhost:8000/api)
- **Admin Django**: [http://localhost:8000/admin](http://localhost:8000/admin)

---

## 🗂️ Endpoints de la API

### Catálogo de Relojes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/watches/` | Listar todos los relojes |
| GET | `/api/watches/{id}/` | Obtener un reloj específico |
| GET | `/api/hero-watches/` | Obtener relojes marcados como "hero" |
| POST | `/api/watches/` | Crear un nuevo reloj (admin) |
| PUT | `/api/watches/{id}/` | Actualizar un reloj (admin) |
| DELETE | `/api/watches/{id}/` | Eliminar un reloj (admin) |

### Ejemplo de Respuesta

```json
{
  "id": 1,
  "name": "GENESIS",
  "short_description": "El inicio de una nueva era. Diseño minimalista con tecnología avanzada.",
  "price": "2499.99",
  "highlight_color": "#FF00D4",
  "model_3d_url": "/watch.glb",
  "brand": "TimePieces",
  "is_experimental_hero": true
}
```

---

## 🎨 Páginas del Frontend

### 1. Landing Page (`/`)
- Hero section con título impactante
- Botones de navegación al catálogo y experiencia 3D
- Sección de características del producto

### 2. Catálogo (`/catalog`)
- Grid responsive con todos los relojes
- Tarjetas con información resumida
- Navegación a páginas de detalle

### 3. Detalle del Reloj (`/catalog/[id]`)
- Visualización 3D interactiva del modelo
- Información completa del producto
- Precio y botón de compra

### 4. Experiencia Hero (`/hero`)
- Visualización 3D inmersiva a pantalla completa
- Controles de cámara interactivos
- Información flotante del producto

---

## 🗄️ Modelo de Datos

### Watch (Reloj)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Integer | ID único autogenerado |
| `name` | String(100) | Nombre del reloj |
| `short_description` | Text | Descripción breve |
| `price` | Decimal(10,2) | Precio del producto |
| `highlight_color` | String(7) | Color de acento (hex) |
| `model_3d_url` | String(500) | URL del modelo 3D |
| `brand` | String(100) | Marca del reloj (opcional) |
| `is_experimental_hero` | Boolean | Marca para hero experimental |

---

## 🔨 Comandos Útiles

### Desarrollo Local (Sin Docker)

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_watches
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Con Docker

```bash
# Levantar servicios
docker-compose up

# Reconstruir servicios
docker-compose up --build

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Ejecutar comandos en contenedores
docker-compose exec backend python manage.py createsuperuser
docker-compose exec frontend npm run build
```

### Agregar Datos de Ejemplo

```bash
docker-compose exec backend python manage.py seed_watches
```

### Crear Superusuario de Django

```bash
docker-compose exec backend python manage.py createsuperuser
```

---

## 📦 Agregar Nuevos Relojes

### Opción 1: Panel de Administración de Django

1. Accede a [http://localhost:8000/admin](http://localhost:8000/admin)
2. Inicia sesión con tu superusuario
3. Ve a "Watches" > "Add Watch"
4. Completa los campos y guarda

### Opción 2: Comando de Seed

Edita `backend/catalog/management/commands/seed_watches.py` y agrega nuevos objetos al array `watches_data`:

```python
{
    'name': 'NUEVO_RELOJ',
    'short_description': 'Descripción del reloj',
    'price': 1999.99,
    'highlight_color': '#FF00FF',
    'brand': 'TimePieces',
    'is_experimental_hero': False,
    'model_3d_url': '/nuevo-modelo.glb'  # Opcional
}
```

Luego ejecuta:

```bash
docker-compose exec backend python manage.py seed_watches
```

### Opción 3: API REST

```bash
curl -X POST http://localhost:8000/api/watches/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "INFINITY",
    "short_description": "El tiempo infinito en tu muñeca",
    "price": "3999.99",
    "highlight_color": "#FFD700",
    "brand": "TimePieces"
  }'
```

---

## 🎨 Personalización de Estilos

### Colores del Tema

Los colores principales están definidos en `frontend/tailwind.config.ts`:

```typescript
colors: {
  pink: {
    500: '#FF00D4',
  },
  zinc: {
    950: '#09090b',
    900: '#18181b',
    // ...
  }
}
```

### Fuentes

El proyecto usa la fuente Geist Sans. Puedes cambiarla en `frontend/src/app/layout.tsx`.

---

## 🌐 Variables de Entorno

### Backend (`.env` en `/backend`)

```env
DEBUG=True
SECRET_KEY=tu-clave-secreta
DATABASE_URL=postgres://user:password@db:5432/watchesdb
ALLOWED_HOSTS=localhost,127.0.0.1,backend
```

### Frontend (`.env.local` en `/frontend`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🚀 Despliegue en Producción

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel deploy
```

Configura la variable de entorno en Vercel:
- `NEXT_PUBLIC_API_URL`: URL de tu API en producción

### Backend (Railway/Heroku)

1. Configura las variables de entorno
2. Agrega `gunicorn` a `requirements.txt`
3. Crea un `Procfile`:

```
web: gunicorn config.wsgi --log-file -
```

4. Actualiza `ALLOWED_HOSTS` en `settings.py`

---

## 🧪 Testing

### Backend

```bash
docker-compose exec backend python manage.py test
```

### Frontend

```bash
cd frontend
npm run test
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- [Three.js](https://threejs.org/) - Biblioteca 3D
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer para Three.js
- [Next.js](https://nextjs.org/) - Framework de React
- [Django](https://www.djangoproject.com/) - Framework web de Python
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la sección de [Issues](https://github.com/tu-usuario/timepieces/issues)
2. Crea un nuevo issue con detalles del problema
3. Contacta al equipo de desarrollo

---

## 🗺️ Roadmap

- [ ] Implementar carrito de compras
- [ ] Agregar sistema de usuarios y autenticación
- [ ] Integrar pasarela de pagos (Stripe/PayPal)
- [ ] Añadir más modelos 3D de relojes
- [ ] Implementar filtros y búsqueda avanzada
- [ ] Agregar sistema de reviews y ratings
- [ ] Crear dashboard de administración personalizado
- [ ] Implementar notificaciones en tiempo real
- [ ] Añadir modo oscuro/claro
- [ ] Optimizar rendimiento 3D para móviles

---

## 📸 Screenshots

![Landing Page](./docs/screenshots/landing.png)
![Catálogo](./docs/screenshots/catalog.png)
![Detalle 3D](./docs/screenshots/detail.png)
![Hero Experimental](./docs/screenshots/hero.png)

---

**Hecho con ❤️ y ⚡ por el equipo de TimePieces**