import type { GameMode } from '../types.ts';

const API_URL = 'https://api.brawlify.com/game/csv_logic/game_mode_variations';

export const fetchGameModes = async (): Promise<Record<string, GameMode>> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }
  return response.json();
};