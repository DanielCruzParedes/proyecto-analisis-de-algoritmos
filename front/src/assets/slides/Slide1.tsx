import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Slide1() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 filter brightness-90"
        style={{
          backgroundImage: "url(/knapsack_assets/background_slide1.jpg)",
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center h-full px-6">
        <motion.img
          initial={{ y: -80, opacity: 0, filter: "drop-shadow(0 0 0px #000)" }}
          animate={{
            y: -30,
            opacity: 1,
            filter: "drop-shadow(0 2px 8px #000)",
          }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          src="/knapsack_assets/knapsack_royale_title.png"
          alt="Knapsack Royale"
          className="mt-20 max-w-2xl w-full h-auto mx-auto"
        />

        {/* Descripción */}
        <div className="flex flex-col items-center justify-center grow text-center">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-3xl font-clash max-w-3xl mt-1 leading-relaxed text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
          >
            Generador de mazos basado en el porcentaje de uso de las cartas.
          </motion.p>

          {/* Botón */}
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: "0 0 25px #000, 0 0 50px #000",
            }}
            onClick={() => (navigate("/knapsack"), window.scrollTo(0, 0))}
            className="
          mt-6 px-16 py-5 text-2xl font-bold rounded-full 
          bg-linear-to-r from-cyan-500 to-blue-600
          border-2 border-cyan-400 text-white
          shadow-lg shadow-cyan-500/50
          hover:brightness-125 font-clash
        "
          >
            Entrar
          </motion.button>
        </div>
      </div>

      {/* Efecto adicional de partículas neon */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background:
            "radial-gradient(circle at 20% 20%, #0ff, transparent 20%), radial-gradient(circle at 80% 80%, #0ff, transparent 20%)",
          backgroundSize: "100% 100%",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
