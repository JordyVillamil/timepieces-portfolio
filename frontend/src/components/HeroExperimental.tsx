import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Float } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import type { Watch } from "@/lib/data";
import WatchModel from "./WatchModel";
import InfiniteBackground from '@/components/InfiniteBackground';

interface HeroExperimentalProps {
  watch: Watch;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95] as [number, number, number, number],
    },
  },
};

const priceVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      bounce: 0.4,
    },
  },
};

export default function HeroExperimental({ watch }: HeroExperimentalProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white">
      <InfiniteBackground />

      {/* Canvas 3D - Lado Derecho - CON INTERACCIÓN */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 z-10">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          
          {/* Iluminación mejorada */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ec4899" />
          <pointLight position={[10, -10, -5]} intensity={0.8} color="#8b5cf6" />
          <spotLight 
            position={[0, 10, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={1} 
            castShadow 
          />
          <hemisphereLight intensity={0.5} groundColor="#444444" />

          <Suspense fallback={null}>
            <Float
              speed={1.5}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <WatchModel modelUrl={watch.model_3d_url || '/watch.glb'} />
            </Float>
          </Suspense>

          <OrbitControls
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            enablePan={true}
            enableRotate={true}
            rotateSpeed={0.8}
            maxPolarAngle={Math.PI * 2}    // Rotación vertical completa
            minPolarAngle={0}                // Desde arriba
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Content - Lado Izquierdo - SIN BLOQUEAR CANVAS */}
      <div className="relative z-20 h-full flex pointer-events-none">
        {/* Contenido del lado izquierdo */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-between p-8 md:p-12 pointer-events-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top Section - Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-block rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-2 backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: watch.highlight_color,
                backgroundColor: `${watch.highlight_color}20`,
              }}
            >
              <span className="text-sm font-semibold" style={{ color: watch.highlight_color }}>
                Edición Limitada
              </span>
            </motion.div>
          </motion.div>

          {/* Middle Section - Title & Description */}
          <motion.div 
            className="flex-1 flex flex-col justify-center space-y-6"
            variants={itemVariants}
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter leading-none"
              style={{ color: watch.highlight_color }}
              animate={{
                textShadow: [
                  `0 0 30px ${watch.highlight_color}60`,
                  `0 0 60px ${watch.highlight_color}80`,
                  `0 0 30px ${watch.highlight_color}60`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {watch.name}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-zinc-400 leading-relaxed"
              variants={itemVariants}
            >
              {watch.short_description}
            </motion.p>

            {/* Price & Brand Cards */}
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-6"
              variants={itemVariants}
            >
              {/* Price */}
              <motion.div
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm"
                variants={priceVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: watch.highlight_color,
                  boxShadow: `0 0 30px ${watch.highlight_color}40`,
                }}
              >
                <div className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
                  Precio
                </div>
                <motion.div
                  className="text-3xl font-light"
                  animate={{
                    color: [watch.highlight_color, '#ffffff', watch.highlight_color],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ${parseFloat(watch.price).toFixed(2)}
                </motion.div>
              </motion.div>

              {/* Brand */}
              <motion.div
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-sm"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: watch.highlight_color,
                  boxShadow: `0 0 30px ${watch.highlight_color}40`,
                }}
              >
                <div className="mb-1 text-xs uppercase tracking-wider text-zinc-500">
                  Marca
                </div>
                <div className="text-xl font-semibold">
                  {watch.brand || 'TimePieces'}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section - CTA Button */}
          <motion.div
            variants={itemVariants}
          >
            <motion.button
              className="group relative w-full overflow-hidden rounded-2xl px-8 py-6 text-lg font-bold text-black"
              style={{ backgroundColor: watch.highlight_color }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 40px ${watch.highlight_color}80`,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Añadir al Carrito
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Instrucciones de uso */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="text-center text-sm text-zinc-500 bg-zinc-900/70 backdrop-blur-sm px-4 py-2 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Arrastra para rotar 360° • Rueda para zoom
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Espacio del lado derecho - PERMITE CLICK EN CANVAS */}
        <div className="hidden md:block md:w-1/2 pointer-events-none"></div>
      </div>
    </div>
  );
}