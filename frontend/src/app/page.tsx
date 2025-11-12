// frontend/src/app/page.tsx

import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter mb-6">
          Time<span className="text-pink-500">Pieces</span>
        </h1>
        
        <p className="max-w-2xl text-xl md:text-2xl text-zinc-400 mb-12">
          Relojes de lujo con tecnología experimental. Descubre nuestra colección única.
        </p>

        <div className="flex gap-6">
          <Link 
            href="/catalog"
            className="rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-black transition-transform hover:scale-105"
          >
            Ver Catálogo
          </Link>
          
          <Link 
            href="/hero"
            className="rounded-full border-2 border-pink-500 px-8 py-4 text-lg font-semibold transition-transform hover:scale-105"
          >
            Experiencia 3D
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-8 py-24">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-5xl">⚡</div>
            <h3 className="mb-2 text-xl font-bold">Diseño Futurista</h3>
            <p className="text-zinc-400">Explora relojes en 3D con tecnología React Three Fiber</p>
          </div>
          
          <div className="text-center">
            <div className="mb-4 text-5xl">💎</div>
            <h3 className="mb-2 text-xl font-bold">Calidad Premium</h3>
            <p className="text-zinc-400">Materiales de lujo y artesanía excepcional</p>
          </div>
          
          <div className="text-center">
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="mb-2 text-xl font-bold">Innovación</h3>
            <p className="text-zinc-400">Tecnología de vanguardia en cada pieza</p>
          </div>
        </div>
      </section>
    </main>
  );
}