import { useEffect, useState } from 'react';
import './App.css';
import { fetchGameModes } from './services/gameModes';
import { fetchGameMaps } from './services/gameMaps';
import type { GameMode, GameMap } from './types';

function App() {
  const [modeRandom, setModeRandom] = useState<GameMode | null>(null);
  const [mapRandom, setMapRandom] = useState<GameMap | null>(null);

  const [playersInput, setPlayersInput] = useState("");
  const [teamA, setTeamA] = useState<string[]>([]);
  const [teamB, setTeamB] = useState<string[]>([]);

  const getData = async () => {
    try {
      // 1️⃣ Traer modos
      const modesData = await fetchGameModes();
      const enabledModes = Object.values(modesData).filter(
        (mode) =>
          !mode.Disabled &&
          mode.TeamSize === 3 &&
          mode.TeamCount === 2
      );

      // 2️⃣ Traer mapas
      const mapsData = await fetchGameMaps();
      const enabledMaps = Object.values(mapsData).filter((map) => !map.Disabled);

      // 3️⃣ Modo aleatorio
      let randomMode: GameMode | null = null;
      if (enabledModes.length > 0) {
        randomMode = enabledModes[Math.floor(Math.random() * enabledModes.length)];
        setModeRandom(randomMode);
      }

      // 4️⃣ Mapa aleatorio para ese modo
      if (enabledMaps.length > 0 && randomMode) {
        const mapsForMode = enabledMaps.filter(
          (map) => map.GameModeVariation === randomMode!.Name
        );
        if (mapsForMode.length > 0) {
          const randomMap =
            mapsForMode[Math.floor(Math.random() * mapsForMode.length)];
          setMapRandom(randomMap);
        }
      }
    } catch (error) {
      console.error("❌ Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const generarEquipos = () => {
    const jugadores = playersInput
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p !== "");

    if (jugadores.length < 2) return;

    // Mezclar aleatoriamente
    const mezclados = [...jugadores].sort(() => Math.random() - 0.5);

    // Dividir en 2 equipos lo más equilibrado posible
    const mitad = Math.ceil(mezclados.length / 2);
    setTeamA(mezclados.slice(0, mitad));
    setTeamB(mezclados.slice(mitad));
    getData();
  };

  return (
    <>
      <div>
        <h1>Map Royale</h1>

        {modeRandom && (
          <div>
            <h2>Modo Aleatorio: {modeRandom.Name}</h2>
            <img
              src={`https://raw.githubusercontent.com/Brawlify/CDN/master/game-modes/regular/${modeRandom.id}.png`}
              alt={modeRandom.Name}
              width={50}
            />
          </div>
        )}

        {mapRandom && (
          <div>
            <h2>Mapa Aleatorio: {mapRandom.Name}</h2>
            <h4>Nombre: {mapRandom.Name}</h4>
            <img
              src={`https://raw.githubusercontent.com/Brawlify/CDN/master/maps/regular/${mapRandom.id}.png`}
              alt={mapRandom.Name}
              width={300}
            />
          </div>
        )}
      </div>

      <div className="card">
        <h2>Ingresar jugadores</h2>
        <textarea
          rows={6}
          value={playersInput}
          onChange={(e) => setPlayersInput(e.target.value)}
          placeholder="Ingresa un jugador por línea..."
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <button onClick={generarEquipos}>Generar equipos</button>

        {teamA.length > 0 && teamB.length > 0 && (
          <div className="versus">
            <div className="team">
              <h3>Equipo A</h3>
              <ul>
                {teamA.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="vs-text">VS</div>
            <div className="team">
              <h3>Equipo B</h3>
              <ul>
                {teamB.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
