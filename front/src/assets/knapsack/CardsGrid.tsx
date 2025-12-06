import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cards } from "../../../knapsack_assets/cards";

interface CardInfo {
  name: string;
  use: number;
  elixir: number;
  img: string;
}

export default function CardsGrid() {
  const [selected, setSelected] = useState<CardInfo | null>(null);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center p-6"
      style={{
        backgroundImage: "url('/knapsack_assets/blue_diamonds_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="relative mb-8 px-8 py-4 rounded-2xl flex items-center justify-center"
        style={{
          height: "120px",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <img
          src="/knapsack_assets/stone_title_background.png"
          alt="Colección background"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          style={{ zIndex: 0 }}
        />
        <h1
          className="relative text-6xl font-clash text-white drop-shadow-lg"
          style={{ zIndex: 1 }}
        >
          Colección
        </h1>
      </div>

      {/* GRID DE CARTAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-2">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.08 }}
            onClick={() => setSelected(card)}
            className="relative cursor-pointer"
          >
            {/* COSTE DE ELIXIR */}
            <div className="absolute top-0 left-0 bg-purple-600 text-white font-extrabold px-3 py-1 rounded-2xl font-clash shadow-xl">
              {card.elixir}
            </div>

            {/* IMAGEN */}
            <img
              src={card.img}
              className="w-32 h-38 object-cover rounded-2xl shadow-xl"
            />

            {/* NOMBRE */}
            <p className="text-center text-white font-clash mt-2 text-lg drop-shadow">
              {card.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              backgroundImage:
                "url('/knapsack_assets/blue_diamonds_background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CONTENEDOR PRINCIPAL */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="
          relative
          bg-linear-to-b from-[#0771d4] to-[#002751]
          p-6
          rounded-3xl
          shadow-[0_0_25px_8px_rgba(0,145,255,0.7)]
          max-w-md
          w-[90%]
          border-[6px]
          border-[#2e6fb9]
        "
            >
              {/* BOTÓN DE CERRAR */}
              <button
                onClick={() => setSelected(null)}
                className="
            absolute top-3 right-3
            w-10 h-10 rounded-full
            bg-red-500
            hover:bg-red-600
            shadow-xl
            flex items-center justify-center
            border-4 border-red-300
          "
              >
                <span className="text-white text-2xl font-bold font-clash">
                  ×
                </span>
              </button>

              {/* IMAGEN DE LA CARTA */}
              <img
                src={selected.img}
                className="
            w-32 h-40 object-cover mx-auto rounded-xl 
            shadow-[0_0_15px_4px_rgba(255,255,255,0.5)]
          "
              />

              {/* NOMBRE */}
              <h2 className="text-3xl font-clash text-white mt-4 drop-shadow-lg">
                {selected.name}
              </h2>

              {/* PANEL DE INFORMACIÓN */}
              <div
                className="
            mt-6
            bg-gray-200
            rounded-3xl
            p-2
            shadow-[inset_0_0_10px_3px_rgba(255,255,255,0.9),0_0_20px_3px_rgba(150,150,150,0.7)]
            border-[6px] border-gray-400
            font-clash
          "
              >
                <p className="text-gray-800 text-xl mb-3">
                  ⭐ <span className="font-bold">Porcentaje de uso:</span>{" "}
                  {selected.use}%
                </p>

                <p className="text-gray-800 text-xl">
                  🔥 <span className="font-bold">Elixir:</span>{" "}
                  {selected.elixir}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
