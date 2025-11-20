import { useGLTF } from '@react-three/drei';

interface WatchModelProps {
  modelUrl: string;
}

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={2.5} />;
}

export default function WatchModel({ modelUrl }: WatchModelProps) {
  return <Model modelUrl={modelUrl} />;
}