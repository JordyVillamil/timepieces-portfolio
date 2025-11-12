// frontend/src/lib/data.ts

// 1. Definir la estructura de datos (TypeScript)
export interface Watch {
  id: number;
  name: string;
  short_description: string;
  price: string;
  highlight_color: string;
  model_3d_url: string | null;
  is_experimental_hero: boolean;
  brand?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000/api';

export async function getHeroWatch(): Promise<Watch | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/hero-watches/`, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      throw new Error('Falló el fetch de datos');
    }

    const data = await res.json(); 
    return data[0] as Watch;

  } catch (error) {
    console.error("Error fetching hero watch:", error);
    return null;
  }
}

export async function getAllWatches(): Promise<Watch[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/watches/`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Falló el fetch del catálogo');
    }

    const data = await res.json();
    return data as Watch[];

  } catch (error) {
    console.error("Error fetching watches:", error);
    return [];
  }
}

export async function getWatchById(id: number): Promise<Watch | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/watches/${id}/`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Falló el fetch del reloj');
    }

    const data = await res.json();
    return data as Watch;

  } catch (error) {
    console.error(`Error fetching watch ${id}:`, error);
    return null;
  }
}