// frontend/src/lib/data.ts

// 1. Definir la estructura de datos (TypeScript)
export interface Watch {
  id: number;
  name: string;
  short_description: string;
  price: string; // DRF envía los decimales como strings
  highlight_color: string;
  model_3d_url: string | null;
  is_experimental_hero: boolean;
}

export async function getHeroWatch(): Promise<Watch | null> {
  try {
    const res = await fetch('http://backend:8000/api/hero-watches/', {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Falló el fetch de datos');
    }

    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    // 'data' ahora es la lista directamente, ej: [ { ... } ]
    const data = await res.json(); 
    
    // Devolvemos solo el primer reloj de la lista
    return data[0] as Watch;

  } catch (error) {
    console.error("Error fetching watch:", error);
    return null;
  }
}