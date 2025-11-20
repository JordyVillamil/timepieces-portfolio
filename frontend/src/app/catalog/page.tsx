// frontend/src/app/catalog/page.tsx

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllWatches, type Watch } from '@/lib/data';
import InfiniteBackground from '@/components/InfiniteBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95] as const,
    },
  },
};

export default function CatalogPage() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWatches().then((data: Watch[]) => {
      setWatches(data);
      setLoading(false);
    });
  }, []);

  // Función helper para obtener la ruta de la imagen
  const getImagePath = (watchName: string) => {
    // Mapeo directo de nombres de relojes a archivos de imagen
    const imageMap: Record<string, string> = {
      'GENESIS': 'Genesis',
      'QUANTUM': 'Quantum',
      'NEXUS': 'Nexus',
      'NEON': 'Neon',
      'PULSE': 'Pulse',
      'HORIZON': 'Horizon',
      'TITAN': 'Titan',
    };
    
    const imageName = imageMap[watchName.toUpperCase()] || watchName.toLowerCase();
    return `/catalog/${imageName}.png`;
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950">
        <InfiniteBackground />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 rounded-full border-4 border-pink-500 border-t-transparent relative z-10"
        />
      </main>
    );
  }

  if (!watches || watches.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white bg-zinc-950">
        <InfiniteBackground />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">No hay relojes disponibles</h1>
          <p className="text-zinc-400">Agrega relojes desde el panel de administración</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen text-white bg-zinc-950">
      <InfiniteBackground />
      
      {/* Header */}
      <motion.header
        className="container relative z-10 mx-auto px-8 pt-24 pb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/" className="text-zinc-400 hover:text-white mb-4 inline-block">
          ← Volver al inicio
        </Link>
        
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Catálogo
        </motion.h1>
        
        <motion.p
          className="mt-4 text-xl text-zinc-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {watches.length} {watches.length === 1 ? 'reloj' : 'relojes'} disponibles
        </motion.p>
      </motion.header>

      {/* Grid de Relojes */}
      <motion.section
        className="container relative z-10 mx-auto px-8 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {watches.map((watch, index) => (
            <motion.div
              key={watch.id}
              variants={cardVariants}
              custom={index}
            >
              <Link to={`/hero/${watch.id}`}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 cursor-pointer"
                  whileHover={{
                    scale: 1.03,
                    borderColor: watch.highlight_color,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Color Accent Bar */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 z-20"
                    style={{ backgroundColor: watch.highlight_color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  />

                  {/* Imagen del Reloj */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950">
                    <img
                      src={getImagePath(watch.name)}
                      alt={watch.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback si la imagen no existe
                        e.currentTarget.src = '/catalog/default-watch.png';
                        e.currentTarget.onerror = null; // Evitar loop infinito
                      }}
                    />
                    
                    {/* Overlay de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
                    
                    {/* Glow Effect en hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at center, ${watch.highlight_color}30, transparent 70%)`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Contenido de texto */}
                  <div className="p-6 relative z-10">
                    <motion.h2
                      className="mb-3 text-3xl font-bold uppercase tracking-tight"
                      style={{ color: watch.highlight_color }}
                      whileHover={{
                        textShadow: `0 0 20px ${watch.highlight_color}`,
                      }}
                    >
                      {watch.name}
                    </motion.h2>

                    <p className="mb-4 text-zinc-400 line-clamp-2 text-sm">
                      {watch.short_description}
                    </p>

                    <div className="flex items-center justify-between">
                      <motion.span
                        className="text-2xl font-light"
                        whileHover={{ scale: 1.1 }}
                      >
                        ${parseFloat(watch.price).toFixed(2)}
                      </motion.span>

                      <motion.span
                        className="rounded-full px-4 py-2 text-sm font-semibold text-black"
                        style={{ backgroundColor: watch.highlight_color }}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: `0 0 20px ${watch.highlight_color}`,
                        }}
                      >
                        Ver detalles →
                      </motion.span>
                    </div>

                    {watch.brand && (
                      <div className="mt-4 text-xs text-zinc-500 uppercase tracking-wider">
                        {watch.brand}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}