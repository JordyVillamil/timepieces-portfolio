// frontend/src/app/page.tsx
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import InfiniteBackground from '@/components/InfiniteBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

const buttonTap = {
  scale: 0.95,
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen text-white">
      <InfiniteBackground />

      {/* Hero Section */}
      <motion.section
        className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.6, 0.01, 0.05, 0.95],
            }}
          >
            Time
            <motion.span
              className="text-pink-500"
              animate={{
                textShadow: [
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.8)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Pieces
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-xl md:text-2xl text-zinc-400 mb-12"
        >
          Relojes de lujo con tecnología experimental. Descubre nuestra colección única.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/catalog">
            <motion.button
              className="rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-black relative overflow-hidden group"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Ver Catálogo</span>
            </motion.button>
          </Link>

          <Link to="/hero">
            <motion.button
              className="rounded-full border-2 border-pink-500 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              Experiencia 3D
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="h-12 w-8 rounded-full border-2 border-pink-500 flex items-start justify-center p-2">
            <motion.div
              className="h-2 w-2 rounded-full bg-pink-500"
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="container relative mx-auto px-8 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              emoji: '⚡',
              title: 'Diseño Futurista',
              description: 'Explora relojes en 3D con tecnología React Three Fiber',
            },
            {
              emoji: '💎',
              title: 'Calidad Premium',
              description: 'Materiales de lujo y artesanía excepcional',
            },
            {
              emoji: '🚀',
              title: 'Innovación',
              description: 'Tecnología de vanguardia en cada pieza',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm text-center"
              whileHover={{
                scale: 1.05,
                borderColor: '#ec4899',
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              
              <motion.div
                className="mb-4 text-5xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                {feature.emoji}
              </motion.div>
              
              <h3 className="relative mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="relative text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative py-24 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          className="container mx-auto px-8"
        >
          <motion.h2
            className="mb-6 text-4xl md:text-6xl font-bold"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #ec4899, #8b5cf6, #ec4899)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            El Futuro del Tiempo
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="mb-8 text-xl text-zinc-400"
          >
            Únete a la revolución horológica
          </motion.p>
          
          <Link to="/catalog">
            <motion.button
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-10 py-5 text-lg font-bold text-white"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Ahora
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}