'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroExperimental from '@/components/HeroExperimental';
import type { Watch } from '@/lib/data';

export default function HeroPage() {
  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para cargar el reloj "Genesis" desde el backend
    async function loadGenesisWatch() {
      try {
        const response = await fetch('http://localhost:8000/api/watches/');
        const watches: Watch[] = await response.json();
        
        // Buscar el reloj llamado "Genesis"
        const genesisWatch = watches.find(
          w => w.name.toLowerCase().includes('genesis')
        );

        if (genesisWatch) {
          setWatch(genesisWatch);
        } else {
          console.error('No se encontró el reloj "Genesis"');
        }
      } catch (error) {
        console.error('Error al cargar el reloj Genesis:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGenesisWatch();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-6 h-16 w-16 rounded-full border-4 border-pink-500 border-t-transparent"
          />
          <motion.p
            className="text-xl text-zinc-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Cargando Genesis...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-6 text-6xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠️
          </motion.div>
          <h1 className="mb-4 text-3xl font-bold text-red-500">
            Error: No se encontró el reloj "Genesis"
          </h1>
          <p className="text-zinc-400 mb-6">
            Asegúrate de que existe un reloj con el nombre "Genesis" en el catálogo.
          </p>
          <motion.a
            href="/catalog"
            className="inline-block rounded-full bg-pink-500 px-6 py-3 text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ir al Catálogo
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroExperimental watch={watch} />
    </motion.main>
  );
}