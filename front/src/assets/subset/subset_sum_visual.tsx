import { useState } from "react";
import { motion } from "framer-motion";

export default function SubsetSumRPG() {
  const [arr, setArr] = useState<string>("");
  const [target, setTarget] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    result: boolean;
    subset: number[];
    execution_time: number;
  }>(null);

  async function ejecutarSubsetSum() {
    if (!arr || target === "" || target < 0)
      return alert("Completa los campos correctamente.");

    const numbers = arr.split(",").map((n) => Number(n.trim()));

    setLoading(true);
    setResult(null);

    const res = await fetch("http://127.0.0.1:8000/subset_sum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        arr: numbers,
        sum: Number(target),
      }),
    });

    const data = await res.json();

    // --- reconstrucción del subconjunto  ---
    // No viene del backend, lo calculamos nosotros mismo
    const subset = obtenerSubconjunto(numbers, Number(target));

    setResult({
      ...data,
      subset: subset,
    });

    setLoading(false);
  }

  /**
   * Reconstrucción del subconjunto ganador usando DP bottom-up.
   * (NO afecta el backend, solo sirve para visualización)
   */
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

    // reconstruir solución
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

  const numbers = arr ? arr.split(",").map((x) => Number(x.trim())) : [];

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center p-10 text-white"
      style={{
        backgroundImage: "url('/subset_assets/dungeon_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    >
      {/* Título */}
      <h1 className="text-3xl font-rpg drop-shadow-lg mb-6 text-white-300">
        Encuentra la combinación de cofres que suma el tesoro objetivo
      </h1>

      {/* Entrada de datos */}
      <div className="bg-black/40 p-6 rounded-3xl border border-yellow-600/50 backdrop-blur-lg shadow-xl max-w-lg w-full mb-6">
        <label className="block mb-2 font-rpg">
           Oro en cada cofre (números):
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg mb-4"
          placeholder="Ej: 10, 7, 15, 3, 12"
          value={arr}
          onChange={(e) => setArr(e.target.value)}
        />

        <label className="block mb-2 font-rpg">Objetivo de oro:</label>
        <input
          type="number"
          className="w-full px-4 py-2 rounded-xl bg-black/50 border border-yellow-500 text-white font-rpg"
          placeholder="Ej: 25"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />

        {/* Botón */}
        <motion.button
          onClick={ejecutarSubsetSum}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full py-3 bg-yellow-600 rounded-xl font-rpg text-xl shadow-lg border border-yellow-300"
        >
          🪄 Buscar Tesoro
        </motion.button>
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

      {/* Visualización de cofres */}
      {!loading && numbers.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 mt-4">
          {numbers.map((num, idx) => {
            const selected = result?.subset.includes(num);

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-32 h-47 rounded-xl flex items-center justify-center ${
                    selected
                      ? "border-yellow-400 shadow-[0_0_20px_5px_gold]"
                      : "border-gray-400"
                  }`}
                  style={{
                    backgroundImage: selected
                      ? "url('/subset_assets/chest_open.png')"
                      : "url('/subset_assets/chest_closed.png')",
                    backgroundSize: "cover",
                    imageRendering: "pixelated",
                  }}
                ></div>

                <p className="mt-2 font-rpg text-lg">{num} de oro</p>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Resultado final */}
      {result && !loading && (
        <div className="mt-8 bg-black/40 p-6 rounded-3xl border border-yellow-500 backdrop-blur-lg max-w-lg text-center">
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
            Tiempo de ejecución: {result.execution_time.toFixed(6)}s
          </p>

          {result.subset.length > 0 && (
            <p className="text-xl mt-3 font-rpg text-yellow-300">
              Subset ganador: {result.subset.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
