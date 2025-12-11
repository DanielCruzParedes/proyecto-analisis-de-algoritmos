import { useState } from "react";
import { motion } from "framer-motion";

export default function SubsetSumRPG() {
  const [arr, setArr] = useState<string>("");
  const [target, setTarget] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    result: boolean;
    subset: string[]; 
    execution_time: number;
  }>(null);

  const inputsDisabled = loading || !!result;

  // -----------------------------------
  // Ejecutar algoritmo del backend
  // -----------------------------------
  async function ejecutarSubsetSum() {
    if (!arr || target === "" || target < 0)
      return alert("Completa los campos correctamente.");

    const numberObjects = numbers.map((n) => n.value);

    setLoading(true);
    setResult(null);

    const res = await fetch("http://127.0.0.1:8000/subset_sum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        arr: numberObjects,
        sum: Number(target),
      }),
    });

    const data = await res.json();

    // reconstrucción usando DP
    const subsetValues = obtenerSubconjunto(numberObjects, Number(target));

    // convertir valores a IDs únicos
    const subsetIds: string[] = [];
    const usedIndexes = new Set<number>();

    subsetValues.forEach((val) => {
      const index = numbers.findIndex(
        (n, i) => n.value === val && !usedIndexes.has(i)
      );
      if (index !== -1) {
        subsetIds.push(numbers[index].id);
        usedIndexes.add(index);
      }
    });

    setResult({
      ...data,
      subset: subsetIds,
    });

    setLoading(false);
  }

  // -----------------------------------
  // DP para reconstrucción del subset (visual)
  // -----------------------------------
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

  const numbers =
    arr?.split(",").map((x, i) => ({
      id: `item_${i}_${x.trim()}`,
      value: Number(x.trim()),
    })) || [];

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center p-10 text-white"
      style={{
        backgroundImage: "url('/subset_assets/dungeon_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        imageRendering: "pixelated",
      }}
    >
      {/* Título */}
      <h1 className="text-4xl font-rpg drop-shadow-lg mb-8 text-yellow-300">
        🏰 Cálculo de Subset Sum — Edición RPG 🔮
      </h1>

      {/* Entrada de datos */}
      <div className="bg-black/40 p-6 rounded-3xl border border-yellow-600/50 backdrop-blur-lg shadow-xl max-w-lg w-full mb-6">
        <label className="block mb-2 font-rpg">Oro en cada cofre:</label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg mb-4"
          placeholder="Ej: 10, 7, 15, 3, 12"
          value={arr}
          onChange={(e) => setArr(e.target.value)}
          disabled={inputsDisabled}
        />

        <label className="block mb-2 font-rpg">Objetivo de oro:</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg"
          placeholder="Ej: 25"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          disabled={inputsDisabled}
        />

        {!result && (
          <motion.button
            onClick={ejecutarSubsetSum}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full py-3 bg-yellow-600 rounded-xl font-rpg text-xl shadow-lg border border-yellow-300"
            disabled={inputsDisabled}
          >
            Buscar Tesoro
          </motion.button>
        )}
      </div>

      {/* Pantalla de carga */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-yellow-300 font-rpg text-2xl"
        >
          <img
            src="/subset_assets/loading.gif"
            className="w-32 h-32 mx-auto mb-3"
          />
          Buscando combinación perfecta...
        </motion.div>
      )}

      {/* Grid de cofres */}
      {!loading && numbers.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 mt-6">
          {numbers.map((item) => {
            const selected = result?.subset.includes(item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-28 h-32 rounded-xl transition-all duration-300 overflow-visible">
                  {/* Overlay dorado animado si está seleccionado */}
                  {selected && (
                    <motion.div
                      initial={{ opacity: 0.7, scale: 1 }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 z-10 rounded-xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 40%, rgba(255, 230, 80, 0.45) 0%, rgba(255, 215, 0, 0.25) 60%, rgba(255,215,0,0.0) 100%)",
                        mixBlendMode: "screen",
                        filter: "blur(1.5px)",
                      }}
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

                <p className="mt-2 font-rpg text-lg">{item.value} de oro</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Resultado */}
      {result && !loading && (
        <div className="mt-10 bg-black/40 p-6 rounded-3xl border border-yellow-500 backdrop-blur-lg max-w-lg text-center">
          {result.result ? (
            <h2 className="text-3xl text-yellow-300 font-rpg">
              🎉 ¡Tesoro Encontrado! 🎉
            </h2>
          ) : (
            <h2 className="text-3xl text-red-400 font-rpg">
              ❌ No existe combinación exacta
            </h2>
          )}

          <p className="text-lg mt-2 font-rpg">
            Tiempo tardado en descubrirlo: {result.execution_time.toFixed(6)}s
          </p>

          {result.subset.length > 0 && (
            <p className="text-xl mt-3 font-rpg text-yellow-300">
              Cofres seleccionados:{" "}
              {result.subset
                .map((id) => {
                  const item = numbers.find((n) => n.id === id);
                  return item ? item.value : "?";
                })
                .join(", ")}
            </p>
          )}

          {/* Botón para probar de nuevo */}
          <motion.button
            onClick={() => {
              setResult(null);
              setArr("");
              setTarget("");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full py-3 bg-yellow-700 rounded-xl font-rpg text-xl shadow-lg border border-yellow-300"
          >
            Probar de nuevo
          </motion.button>
        </div>
      )}
    </div>
  );
}
