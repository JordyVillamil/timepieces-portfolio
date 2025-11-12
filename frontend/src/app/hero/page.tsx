// frontend/src/app/hero/page.tsx

import HeroExperimental from "@/components/HeroExperimental";
import { getHeroWatch } from "@/lib/data";

export default async function HeroPage() {
  const heroWatch = await getHeroWatch();

  if (!heroWatch) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-900 text-red-500">
        <p>Error: No se pudo cargar el reloj principal (Asegúrate de marcar uno como &apos;Hero&apos; en el Admin de Django).</p>
      </main>
    );
  }

  return (
    <main>
      <HeroExperimental watch={heroWatch} />
    </main>
  );
}