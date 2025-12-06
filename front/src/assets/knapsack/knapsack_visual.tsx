import { useState } from "react";
import { motion } from "framer-motion";
import { cards } from "../../../knapsack_assets/cards.tsx";

import CardsGrid from "./CardsGrid.tsx";

export default function KnapsackVisual() {
  const [elixir, setElixir] = useState<number | "">("");
  const [resultado, setResultado] = useState<null | {
    max_value: number;
    cards: { name: string; value: number; weight: number }[];
  }>(null);

  async function ejecutarKnapsack(maxElixir: number) {
    const res = await fetch("http://127.0.0.1:8000/knapsack01", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        max_elixir: maxElixir,
        cards: cards.map((c) => ({
          name: c.name,
          elixir: c.elixir,
          use: c.use,
        })),
      }),
    });

    const data = await res.json();
    console.log("Resultado del backend:", data);
    return data;
  }

  const handleSubmit = async () => {
    if (elixir === "" || elixir <= 0) return alert("Ingresa un número válido");
    alert("Elixir máximo: " + elixir);
    const sizeArrays = [];
    const valueArrays = [];
    const nameArrays = [];
    for (const card of cards) {
      sizeArrays.push(card.elixir);
      valueArrays.push(card.use);
      nameArrays.push(card.name);
    }

    const data = await ejecutarKnapsack(elixir as number);
    setResultado(data);
  };

  return (
    <div
      className="w-full flex items-top justify-top bg-black"
      style={{
        backgroundImage: "url('/knapsack_assets/red_diamonds_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardsGrid />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-black/40 p-10 rounded-3xl shadow-2xl text-center w-[90%] max-w-md border border-purple-500/30 backdrop-blur-md"
      >
        <h1 className="text-4xl font-clash text-purple-300 drop-shadow-lg mb-6">
          Elixir Máximo
        </h1>

        <p className="font-clash text-gray-300 mb-6 text-lg">
          Ingresa el máximo de{" "}
          <span className="font-bold text-purple-400">elixir total</span> que
          deseas que tenga el mazo generado.
        </p>

        <input
          type="number"
          value={elixir}
          onChange={(e) => setElixir(Number(e.target.value))}
          placeholder="Ejemplo: 20"
          className="w-full text-center px-4 py-3 font-clash bg-black/60 border border-purple-500/40 rounded-xl text-white text-lg focus:outline-none focus:border-purple-400 shadow-lg"
        />

        {/* Boton de confirmar el elixir maximo */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-63 h-33 mt-6 py-3 font-clash text-white text-2xl font-bold rounded-xl transition-all relative overflow-hidden"
          style={{
            border: "none",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: "url('/knapsack_assets/button.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "inherit",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>Confirmar</span>
        </motion.button>

        {/* CARTAS USADAS PARA SACAR EL VALOR MAXIMO */}
        {resultado && resultado.cards.length > 0 && (
          <div className="grid grid-cols-4 gap-3 justify-items-center">
            {resultado.cards.slice(0, 8).map((c, idx) => {
              const cardInfo = cards.find((x) => x.name === c.name);
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.08 }}
                  className="relative cursor-pointer w-20 h-28 bg-blue-600 rounded-xl shadow-xl p-1 flex flex-col items-center justify-between"
                  style={{
                    border: "3px solid #78b9ff",
                    boxShadow: "0px 0px 10px #3da4ff",
                  }}
                >
                  {/* COSTE DE ELIXIR */}
                  <div
                    className="absolute top-1 left-1 bg-purple-600 text-white font-extrabold px-2 py-1 rounded-xl font-clash shadow-xl text-xs"
                    style={{ zIndex: 2 }}
                  >
                    {c.weight}
                  </div>

                  {/* IMAGEN */}
                  {cardInfo ? (
                    <img
                      src={cardInfo.img}
                      className="w-18 h-[85%] object-cover rounded-lg shadow-md mt-2"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-[85%] bg-gray-700 rounded-lg mt-2 flex items-center justify-center">
                      <span className="text-xs text-white">No Img</span>
                    </div>
                  )}
                  {/* NOMBRE OCULTO */}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ---- SI HAY MÁS DE 8 CARTAS ---- */}
        {resultado && resultado.cards.length > 8 && (
          <div className="mt-6">
            <h3 className="text-lg text-purple-300 mb-3 font-clash text-center">
              Cartas adicionales encontradas:
            </h3>

            <div className="grid grid-cols-4 gap-2 justify-items-center">
              {resultado.cards.slice(8).map((c, idx) => {
                const cardInfo = cards.find((x) => x.name === c.name);
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.08 }}
                    className="relative cursor-pointer w-16 h-22 bg-gray-700 rounded-lg shadow-md p-1 flex flex-col items-center justify-between"
                    style={{
                      border: "2px solid #78b9ff",
                      boxShadow: "0px 0px 6px #3da4ff",
                    }}
                  >
                    {/* COSTE DE ELIXIR */}
                    <div
                      className="absolute top-1 left-1 bg-purple-600 text-white font-extrabold px-2 py-1 rounded-xl font-clash shadow-xl text-xs"
                      style={{ zIndex: 2 }}
                    >
                      {c.weight}
                    </div>
                    {cardInfo ? (
                      <img
                        src={cardInfo.img}
                        className="w-full h-[85%] object-cover rounded-md mt-1"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="w-full h-[85%] bg-gray-600 rounded-md mt-1 flex items-center justify-center">
                        <span className="text-xs text-white">No Img</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-3 text-center font-clash text-yellow-300 text-sm">
              ⚠️ Se encontraron más de 8 cartas. Elige las mejores del grupo.
            </p>
          </div>
        )}

        {/* ---- SI HAY MENOS DE 8 CARTAS ---- */}
        {resultado && resultado.cards.length < 8 && (
          <p className="mt-4 text-center font-clash text-yellow-300 text-sm">
            ⚠️ El mazo tiene menos de 8 cartas. Se recomienda aumentar el elixir
            máximo.
          </p>
        )}
      </motion.div>
    </div>
  );
}
