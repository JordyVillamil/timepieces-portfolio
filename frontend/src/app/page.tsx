// frontend/src/app/page.tsx

import HeroExperimental from "@/components/HeroExperimental"; // El alias '@/' apunta a 'src/'
import { getHeroWatch } from "@/lib/data"; // Nuestra función de fetching

// Convertimos la página en un componente Asíncrono
export default async function HomePage() {
  
  // 1. Obtenemos los datos del lado del servidor
  const heroWatch = await getHeroWatch();

  // 2. Manejo de error si la API falla
  if (!heroWatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-900 text-red-500">
        <p>Error: No se pudo cargar el reloj principal (Asegúrate de marcar uno como 'Hero' en el Admin de Django).</p>
      </main>
    );
  }

  // 3. Renderizamos el Hero pasándole los datos
  return (
    <main>
      <HeroExperimental watch={heroWatch} />
      {/* Aquí es donde irá el Scrollytelling 2.0 más adelante */}
    </main>
  );
}