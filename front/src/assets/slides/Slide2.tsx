import { motion } from "framer-motion";
import fondo from "../assets_TSP/fondo.jpg";

export default function Slide2() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 filter brightness-90"
        style={{ backgroundImage: `url(${fondo})` }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center h-full px-6">
        {/* Título*/}
        <motion.h1
          initial={{ y: -80, opacity: 0, textShadow: "0 0 0px #00f" }}
          animate={{
            y: 0,
            opacity: 1,
            textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff",
          }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          className="mt-20 text-7xl text-white font-extrabold tracking-wide text-center"
          style={{ fontFamily: "'Press Start 2P', cursive" }}
        >
          TSP Challenge
        </motion.h1>

        {/* Descripción */}
        <div className="flex flex-col items-center justify-center grow text-center">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-3xl max-w-3xl mt-12 leading-relaxed text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '16px' }}
          >
            Problema del Agente Viajero
          </motion.p>
           <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-3xl max-w-3xl mt-12 leading-relaxed text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '16px' }}
          >
           Compara tu camino contra la maquina
          </motion.p>

          {/* Botón */}
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            whileHover={{
              scale: 1.05,
              y: -4,
              boxShadow: "0 0 25px #0ff, 0 0 50px #0ff",
            }}
            onClick={() => (window.location.href = "/tsp-game")}
            className="
              mt-14 px-16 py-5 text-2xl font-bold rounded-full 
              bg-linear-to-r from-cyan-500 to-blue-600
              border-2 border-cyan-400 text-white
              shadow-lg shadow-cyan-500/50
              hover:brightness-125
            "
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '16px' }}
          >
            Entrar
          </motion.button>
        </div>
      </div>

      {/* efectos macizos */}
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
