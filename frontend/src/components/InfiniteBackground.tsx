import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function InfiniteBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-zinc-950 pointer-events-none">
      {/* Grid de Espejos Infinitos */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Luces Animadas */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-pink-500/30 blur-[120px]"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -100, 0, 100, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: '10%',
          top: '20%',
        }}
      />

      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[100px]"
        animate={{
          x: [0, -150, 0, 150, 0],
          y: [0, 100, 0, -100, 0],
          scale: [1, 0.8, 1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          right: '10%',
          top: '40%',
        }}
      />

      <motion.div
        className="absolute h-[700px] w-[700px] rounded-full bg-purple-500/20 blur-[140px]"
        animate={{
          x: [0, 120, 0, -120, 0],
          y: [0, -120, 0, 120, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          left: '50%',
          bottom: '10%',
        }}
      />

      {/* Luz que sigue al mouse */}
      <motion.div
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[80px]"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Efecto de Espejo con Reflejo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
    </div>
  );
}