import { useState } from "react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

export default function SubsetSumRPG() {
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const failSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    clickSound.current = new Audio("/sounds/Zelda_open_chest.mp3");
    clickSound.current.volume = 0.6;
    failSound.current = new Audio("/sounds/Combination_not_found.mp3");
    failSound.current.volume = 0.6;
  }, []);

  const [arr, setArr] = useState<string>("");
  const [target, setTarget] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const [resultDP, setResultDP] = useState<null | {
    result: boolean;
    subset: string[];
    execution_time: number;
  }>(null);

  const [resultGreedy, setResultGreedy] = useState<null | {
    result: boolean;
    subset: string[];
    execution_time: number;
  }>(null);

  const inputsDisabled = loading || (!!resultDP && !!resultGreedy);

  // ------------------------------
  // Ejecutar ambos algoritmos
  // ------------------------------
  async function ejecutarComparacion() {
    if (!arr || target === "" || target < 0)
      return alert("Completa los campos correctamente.");

    const numberObjects = numbers.map((n) => n.value);

    setLoading(true);
    setResultDP(null);
    setResultGreedy(null);

    // Exec DP
    const resDP = await fetch("http://127.0.0.1:8000/subset_sum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: numberObjects, sum: Number(target) }),
    }).then((r) => r.json());

    const subsetDP = obtenerSubconjunto(numberObjects, Number(target));
    const subsetDPIds = mapValuesToIds(subsetDP);

    // Guardar resultado DP
    setResultDP({
      result: resDP.result,
      subset: subsetDPIds,
      execution_time: resDP.execution_time,
    });

    // Exec greedy
    const resGreedy = await fetch("http://127.0.0.1:8000/greedy_subset_sum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr: numberObjects, sum: Number(target) }),
    }).then((r) => r.json());

    const subsetGreedyIds = mapValuesToIds(resGreedy.result.subset);

    // Guardar resultado Greedy
    setResultGreedy({
      result: resGreedy.result.exact,
      subset: subsetGreedyIds,
      execution_time: resGreedy.execution_time,
    });

    // Reproducir sonido según el resultado
    if (
      (resDP.result === true || resGreedy.result.exact === true) &&
      clickSound.current
    ) {
      clickSound.current.currentTime = 0;
      clickSound.current.play();
    } else if (
      resDP.result === false &&
      resGreedy.result.exact === false &&
      failSound.current
    ) {
      failSound.current.currentTime = 0;
      failSound.current.play();
    }

    setLoading(false);
  }

  // ------------------------------
  // Reconstrucción DP
  // ------------------------------
  function obtenerSubconjunto(arr: number[], sum: number): number[] {
    const n = arr.length;

    const dp = Array(n + 1)
      .fill(null)
      .map(() => Array(sum + 1).fill(false));

    for (let i = 0; i <= n; i++) dp[i][0] = true;

    for (let i = 1; i <= n; i++) {
      for (let s = 1; s <= sum; s++) {
        if (arr[i - 1] > s) dp[i][s] = dp[i - 1][s];
        else dp[i][s] = dp[i - 1][s] || dp[i - 1][s - arr[i - 1]];
      }
    }

    if (!dp[n][sum]) return [];

    const subset = [];
    let i = n,
      s = sum;

    while (i > 0 && s > 0) {
      if (dp[i][s] && !dp[i - 1][s]) {
        subset.push(arr[i - 1]);
        s -= arr[i - 1];
      }
      i--;
    }

    return subset.reverse();
  }

  // Mapear valores a ids unicos
  function mapValuesToIds(subsetVals: number[]) {
    const ids: string[] = [];
    const used = new Set<number>();

    subsetVals.forEach((v) => {
      const idx = numbers.findIndex((n, i) => n.value === v && !used.has(i));
      if (idx !== -1) {
        used.add(idx);
        ids.push(numbers[idx].id);
      }
    });

    return ids;
  }

  // ------------------------------
  // Lista dinámica de cofres
  // ------------------------------
  const numbers =
    arr
      ?.split(",")
      .map((x, i) => ({
        id: `item_${i}_${x.trim()}`,
        value: Number(x.trim()),
      }))
      .filter((o) => !isNaN(o.value)) || [];

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center p-10 text-white"
      style={{
        backgroundImage: "url('/subset_assets/dungeon_bg.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        imageRendering: "pixelated",
      }}
    >
      <h1 className="text-4xl font-rpg drop-shadow-lg mb-8 text-yellow-300">
        Obtener combinación de cofres con suma objetivo
      </h1>

      {/* Entrada */}
      <div className="bg-black/40 p-6 rounded-3xl border border-yellow-600/50 shadow-xl max-w-lg w-full mb-10">
        <label className="block mb-2 font-rpg">Oro en cada cofre:</label>
        <input
          type="text"
          placeholder="Ej: 10, 7, 15, 3, 12"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg mb-4"
          value={arr}
          onChange={(e) => setArr(e.target.value)}
          disabled={inputsDisabled}
        />

        <label className="block mb-2 font-rpg">Objetivo:</label>
        <input
          type="number"
          placeholder="Ej: 25"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg mb-4"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          disabled={inputsDisabled}
        />

        {!resultDP && !resultGreedy && (
          <motion.button
            onClick={ejecutarComparacion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-yellow-600 rounded-xl font-rpg text-xl shadow-lg border border-yellow-300"
          >
            Buscar Tesoro
          </motion.button>
        )}
      </div>

      {/* Siempre mostrar cofres dinámicos */}
      {numbers.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-4 mb-10">
          {numbers.map((item) => (
            <Chest key={item.id} selected={false} value={item.value} />
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center font-rpg text-2xl">
          <img src="/subset_assets/loading.gif" className="w-28 mx-auto" />
          <p className="text-yellow-300 mt-4">
            Los sabios están evaluando los cofres...
          </p>
        </div>
      )}

      {/* Comparación */}
      {!loading && resultDP && resultGreedy && (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Panel DP */}
          <ResultPanel
            title="Algoritmo aceptado por la comunidad"
            color="green"
            result={resultDP}
            numbers={numbers}
          />

          {/* Panel Heurístico */}
          <ResultPanel
            title="Algoritmo Aproximado (Hecho por nosotros)"
            color="green"
            result={resultGreedy}
            numbers={numbers}
          />
        </div>
      )}

      {/* Reiniciar */}
      {(resultDP || resultGreedy) && !loading && (
        <motion.button
          onClick={() => {
            setArr("");
            setTarget("");
            setResultDP(null);
            setResultGreedy(null);
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="mt-10 py-3 px-6 bg-yellow-700 rounded-xl font-rpg text-xl border border-yellow-300"
        >
          Reiniciar
        </motion.button>
      )}
    </div>
  );
}

/* Componentes auxiliares */
function Chest({ selected, value }: { selected: boolean; value: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex flex-col items-center"
    >
      <div className="relative w-24 h-28 rounded-xl">
        {selected && (
          <motion.div
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 1.3, repeat: Infinity }}
            className="absolute inset-0 rounded-xl bg-yellow-300/30 blur-md z-10"
          />
        )}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backgroundImage: selected
              ? "url('/subset_assets/chest_open.png')"
              : "url('/subset_assets/chest_closed.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            imageRendering: "pixelated",
          }}
        />
      </div>
      <p className="mt-2 font-rpg text-lg">{value} oro</p>
    </motion.div>
  );
}

function ResultPanel({
  title,
  color,
  result,
  numbers,
}: {
  title: string;
  color: string;
  result: { result: boolean; subset: string[]; execution_time: number };
  numbers: { id: string; value: number }[];
}) {
  return (
    <div
      className={`bg-black/40 p-6 rounded-3xl border border-${color}-400 shadow-xl`}
    >
      {/* BARRA DE ESTADO */}
      <h2
        className={`text-2xl font-rpg text-center mb-4 ${
          result.result ? "text-green-300" : "text-red-400"
        }`}
      >
        {result.result
          ? "✅ ¡Suma objetivo encontrada!"
          : "❌ Suma objetivo NO encontrada"}
      </h2>

      {/* Título del algoritmo */}
      <h2 className={`text-3xl font-rpg text-${color}-300 text-center mb-4`}>
        {title}
      </h2>

      {/* Cofres */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mt-4">
        {numbers.map((item) => (
          <Chest
            key={item.id}
            selected={result.subset.includes(item.id)}
            value={item.value}
          />
        ))}
      </div>

      {/* Tiempo */}
      <p className="text-center text-lg mt-4 font-rpg">
        ⏱ Tiempo: {result.execution_time.toFixed(6)}s
      </p>

      {/* Subset */}
      {result.result ? (
        <p className="text-xl mt-3 font-rpg text-green-300 text-center">
          Cofres seleccionados:{" "}
          {result.subset
            .map((id) => numbers.find((n) => n.id === id)?.value)
            .join(", ")}
        </p>
      ) : (
        <p className="text-red-400 text-center font-rpg mt-2">
          ❌ No se encontró combinación exacta
        </p>
      )}
    </div>
  );
}
