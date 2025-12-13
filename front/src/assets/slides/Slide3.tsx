import { motion } from "framer-motion";

export default function Slide3() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center z-0 filter brightness-75"
        style={{ backgroundImage: "url(/src/assets/algoritmo3.jpg)" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />

      {}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-10"
          style={{
            width: Math.random() * 40 + 15,
            height: Math.random() * 40 + 15,
            background: `radial-gradient(circle at 30% 30%, ${
              ['rgba(34, 197, 94, 0.5)', 'rgba(16, 185, 129, 0.5)', 'rgba(5, 150, 105, 0.5)', 'rgba(163, 230, 53, 0.5)'][i % 4]
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 25 - 12, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {}
      <div className="relative z-20 flex flex-col items-center h-full px-6">
        {}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          className="mt-20"
        >
          <motion.h1
            animate={{
              textShadow: [
                "0 0 20px #22c55e, 0 0 40px #16a34a",
                "0 0 30px #16a34a, 0 0 60px #22c55e",
                "0 0 20px #22c55e, 0 0 40px #16a34a",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl text-white font-extrabold tracking-wide text-center"
            style={{
              fontFamily: "'Comic Sans MS', cursive",
              WebkitTextStroke: "2px #22c55e",
            }}
          >
            Graphs of Goo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-green-300 text-xl mt-2 italic"
          >
            (Inspirado en World of Goo)
          </motion.p>
        </motion.div>

        {}
        <div className="flex flex-col items-center justify-center grow text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="max-w-4xl"
          >
            <motion.p
              className="text-3xl leading-relaxed text-green-50 mb-6 font-semibold"
              style={{ textShadow: "0 0 15px rgba(34, 197, 94, 0.8)" }}
            >
              
              Resuelve el problema de coloración de grafos donde cada Goo
              debe tener un color diferente a sus vecinas conectadas.
            </motion.p>

            <motion.div
              className="flex gap-4 justify-center mt-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {["Greedy", "Backtracking", "Optimo"].map((algo, i) => (
                <motion.div
                  key={algo}
                  className="bg-green-500/30 px-4 py-2 rounded-full border-2 border-green-400/60 text-green-100"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(34, 197, 94, 0.4)" }}
                  transition={{ delay: i * 0.1 }}
                >
                   {algo}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{
              scale: 1.1,
              y: -8,
              boxShadow: "0 0 40px #22c55e, 0 0 80px #16a34a",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/graphs-of-goo")}
            className="
              mt-14 px-20 py-6 text-2xl font-bold rounded-full 
              bg-gradient-to-r from-green-600 via-emerald-600 to-green-600
              border-4 border-green-300 text-white
              shadow-[0_0_30px_rgba(34,197,94,0.7)]
              hover:brightness-125 hover:shadow-[0_0_50px_rgba(34,197,94,0.9)]
              transition-all duration-300
              relative overflow-hidden
            "
            style={{
              fontFamily: "'Comic Sans MS', cursive",
            }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10">JUGAR</span>
          </motion.button>
        </div>
      </div>

      {}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, rgba(34, 197, 94, 0.15), transparent)",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute bottom-0 rounded-full bg-green-400/25 border border-green-300/40"
            style={{
              width: Math.random() * 40 + 20,
              height: Math.random() * 40 + 20,
              left: `${i * 12 + Math.random() * 10}%`,
            }}
            animate={{
              y: [-20, -150],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
