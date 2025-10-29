// frontend/src/components/WatchModel.tsx

"use client"; // ¡Muy importante! 3D requiere Client Components

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";

// 1. Componente que carga el modelo
function Model(props: { modelUrl: string }) {
  // useGLTF es un hook de 'drei' que carga el modelo
  const { scene } = useGLTF(props.modelUrl);
  return <primitive object={scene} scale={1} />; // 'primitive' renderiza la escena
}

// 2. Componente principal del lienzo 3D
export default function WatchModel({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas 
      dpr={[1, 2]} // Optimización de píxeles (calidad/rendimiento)
      camera={{ fov: 45, position: [0, 0, 5] }} // Posición de la cámara
      style={{
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0,
        zIndex: 0, // Lo ponemos detrás del texto
        opacity: 0.5 // Hacemos el modelo semitransparente
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.8} position={[10, 10, 5]} />
      
      {/* 'Stage' centra el modelo y añade una iluminación de estudio */}
      <Stage environment="city" intensity={0.6}>
        <Model modelUrl={modelUrl} />
      </Stage>
      
      {/* Permite al usuario rotar el modelo (para probar) */}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}