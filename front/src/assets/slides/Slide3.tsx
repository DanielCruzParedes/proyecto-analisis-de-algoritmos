import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Slide3() {
  const navigate = useNavigate();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 filter brightness-90"
        style={{ backgroundImage: "url(/subset_assets/slide3_background.jpg)" }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 z-10" />

      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center h-full px-6">
        {/* Título*/}
        <motion.img
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          src="/subset_assets/subset_dungeon_title.png"
          alt="Subset Dungeon Title"
          className="mt-20 max-w-4xl w-full h-auto"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Descripción */}
        <div className="flex flex-col items-center justify-center grow text-center">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-3xl font-rpg max-w-3xl mt-1 leading-relaxed text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
          >
            Encuentra la combinación de cofres que llena tu bolsa de oro
            exactamente hasta el objetivo.
          </motion.p>

          {/* Botón */}
            <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            whileHover={{
              scale: 1.08,
              y: -6,
              boxShadow: "0 0 32px #0ff, 0 0 64px #0ff",
              rotate: [0, -2, 2, -2, 2, 0], // efecto de vibración
              transition: { duration: 0.3, repeat: 1, repeatType: "reverse" },
            }}
            whileTap={{
              scale: 0.97,
              rotate: [0, 2, -2, 2, -2, 0],
              boxShadow: "0 0 16px #0ff, 0 0 32px #0ff",
            }}
            onClick={() => navigate("/subset")}
            className="
              mt-14 px-16 py-5 text-2xl font-bold rounded-full 
              bg-linear-to-r from-yellow-400 via-red-500 to-pink-500
              border-4 border-yellow-300 text-white
              shadow-lg shadow-yellow-400/60
              hover:brightness-125
              font-rpg tracking-widest outline-2 outline-black
              transition-all duration-200
              select-none
              [text-shadow:2px_2px_0_#000,0_0_16px_#fff8]
            "
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
            >
            ▶ Entrar ◀
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
