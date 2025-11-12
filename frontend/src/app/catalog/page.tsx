// frontend/src/app/catalog/page.tsx

import Link from 'next/link';
import { getAllWatches } from '@/lib/data';

export default async function CatalogPage() {
  const watches = await getAllWatches();

  if (!watches || watches.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No hay relojes disponibles</h1>
          <p className="text-zinc-400">Agrega relojes desde el panel de administración de Django</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="container mx-auto px-8 py-12">
        <Link href="/" className="text-zinc-400 hover:text-white mb-4 inline-block">
          ← Volver al inicio
        </Link>
        <h1 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter">
          Catálogo
        </h1>
        <p className="mt-4 text-xl text-zinc-400">
          {watches.length} {watches.length === 1 ? 'reloj' : 'relojes'} disponibles
        </p>
      </header>

      {/* Grid de Relojes */}
      <section className="container mx-auto px-8 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {watches.map((watch) => (
            <Link 
              key={watch.id}
              href={`/catalog/${watch.id}`}
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-6 transition-transform hover:scale-105"
            >
              {/* Color Accent Bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: watch.highlight_color }}
              />

              <h2 
                className="mb-3 text-3xl font-bold uppercase tracking-tight"
                style={{ color: watch.highlight_color }}
              >
                {watch.name}
              </h2>

              <p className="mb-4 text-zinc-400 line-clamp-3">
                {watch.short_description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-light">
                  ${parseFloat(watch.price).toFixed(2)}
                </span>
                
                <span 
                  className="rounded-full px-4 py-2 text-sm font-semibold text-black"
                  style={{ backgroundColor: watch.highlight_color }}
                >
                  Ver detalles →
                </span>
              </div>

              {watch.brand && (
                <div className="mt-4 text-sm text-zinc-500">
                  {watch.brand}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}