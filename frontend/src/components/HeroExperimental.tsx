// frontend/src/components/HeroExperimental.tsx

import { Watch } from '@/lib/data';
import WatchModel from './WatchModel'; // 1. Importa el componente 3D

interface HeroProps {
  watch: Watch;
}

export default function HeroExperimental({ watch }: HeroProps) {
  const accentColor = watch.highlight_color || '#00FFFF';

  // Asumimos que la URL en la DB es '/watch.glb'
  // O puedes usar la URL del modelo que guardaste en 'public/'
  const modelUrl = watch.model_3d_url || "/watch.glb"; 

  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-zinc-950 p-8 md:p-16 text-white overflow-hidden">
      
      {/* --- Contenedor de Texto (con z-index) --- */}
      <div className="relative z-10">
        <h1 
          className="text-8xl md:text-[12rem] lg:text-[16rem] font-extrabold uppercase leading-none tracking-tighter"
          style={{ color: accentColor }}
        >
          {watch.name}
        </h1>

        <p className="mt-4 max-w-2xl text-xl text-zinc-400 md:text-2xl ml-1">
          {watch.short_description}
        </p>

        <div className="mt-8 flex items-baseline gap-8 ml-1">
          <span className="text-5xl font-light">
            ${parseFloat(watch.price).toFixed(2)}
          </span>
          <button 
            className="rounded-full px-8 py-3 text-lg font-semibold text-black transition-transform hover:scale-105"
            style={{ backgroundColor: accentColor }}
          >
            Descubrir
          </button>
        </div>
      </div>

      {/* --- 2. Componente 3D (detrás del texto) --- */}
      <WatchModel modelUrl={modelUrl} />

    </section>
  );
}