import type { GameMap } from '../types';

const MAPS_API_URL = 'https://api.brawlify.com/game/csv_logic/locations';

export const fetchGameMaps = async (): Promise<Record<string, GameMap>> => {
  const response = await fetch(MAPS_API_URL);
  if (!response.ok) {
    throw new Error(`Error en la API de mapas: ${response.status}`);
  }
  return response.json();
};
