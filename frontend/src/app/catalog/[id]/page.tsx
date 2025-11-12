// frontend/src/app/catalog/[id]/page.tsx

import Link from 'next/link';
import { getWatchById } from '@/lib/data';
import WatchModel from '@/components/WatchModel';

export default async function WatchDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const watch = await getWatchById(parseInt(id));

  if (!watch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Reloj no encontrado</h1>
          <Link href="/catalog" className="text-pink-500 hover:underline">
            ← Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-8 py-6">
        <Link href="/catalog" className="text-zinc-400 hover:text-white">
          ← Volver al catálogo
        </Link>
      </nav>

      <section className="container mx-auto grid gap-12 px-8 py-12 lg:grid-cols-2">
        {/* 3D Model */}
        <div className="relative h-[500px] rounded-2xl bg-zinc-900 overflow-hidden">
          {watch.model_3d_url ? (
            <WatchModel modelUrl={watch.model_3d_url} />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-500">
              Modelo 3D no disponible
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 
            className="mb-4 text-6xl md:text-7xl font-extrabold uppercase tracking-tighter"
            style={{ color: watch.highlight_color }}
          >
            {watch.name}
          </h1>

          <p className="mb-6 text-xl text-zinc-400">
            {watch.short_description}
          </p>

          <div className="mb-8 text-5xl font-light">
            ${parseFloat(watch.price).toFixed(2)}
          </div>

          {watch.brand && (
            <div className="mb-6 text-zinc-500">
              Marca: <span className="text-white">{watch.brand}</span>
            </div>
          )}

          <button 
            className="rounded-full px-8 py-4 text-lg font-semibold text-black transition-transform hover:scale-105 w-fit"
            style={{ backgroundColor: watch.highlight_color }}
          >
            Añadir al carrito
          </button>
        </div>
      </section>
    </main>
  );
}