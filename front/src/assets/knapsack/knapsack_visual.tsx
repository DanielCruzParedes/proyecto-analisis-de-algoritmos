import { useState } from "react";
import { motion } from "framer-motion";
import { cards } from "../../../knapsack_assets/cards.tsx";

import CardsGrid from "./CardsGrid.tsx";

export default function KnapsackVisual() {
  const [elixir, setElixir] = useState<number | "">("");

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

  const handleSubmit = () => {
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
    // Llamada del knapsack con el valor recibido
    ejecutarKnapsack(elixir as number);
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
      </motion.div>
    </div>
  );
}
