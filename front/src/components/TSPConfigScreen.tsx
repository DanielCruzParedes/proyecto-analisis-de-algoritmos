import { useState } from 'react';
import { motion } from 'framer-motion';

interface TSPConfigScreenProps {
  onStart: (numCities: number, algorithm: string) => void;
}

export default function TSPConfigScreen({ onStart }: TSPConfigScreenProps) {
  const [numCities, setNumCities] = useState(5);
  const [algorithm, setAlgorithm] = useState('tspalgoritm');

  const handleStart = () => {
    if (numCities >= 4 && numCities <= 15) {
      if (algorithm === 'accepted') {
        alert('Aceptado por la Comunidad aun no esta disponible');
        return;
      }
      onStart(numCities, algorithm);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
  
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-5xl w-full border border-cyan-500/30"
      >
   
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            TSP CHALLENGE
          </h1>
          <p className="text-cyan-300 text-lg font-semibold tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Configura tu partida
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="flex flex-row items-end gap-8">

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 space-y-3"
            >
              <label className="block text-cyan-300 font-bold text-lg mb-3 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Cantidad de Ciudades
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="4"
                  max="15"
                  value={numCities}
                  onChange={(e) => setNumCities(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  style={{
                    background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((numCities - 4) / 11) * 100}%, #475569 ${((numCities - 4) / 11) * 100}%, #475569 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>4</span>
                  <span>15</span>
                </div>
              </div>
              <div className="text-center">
              <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-3xl px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/50 min-w-[80px] tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {numCities}
              </span>
              </div>
            </motion.div>


            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 space-y-3"
            >
              <label className="block text-cyan-300 font-bold text-lg mb-3 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                Algoritmo
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAlgorithm('tspalgoritm')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    algorithm === 'tspalgoritm'
                      ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/50 scale-105'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                <div className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>Implementación Propia</div>
                <div className="text-cyan-300 text-xs mt-1 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>Disponible</div>
                </button>
                <button
                  onClick={() => {
                    if (algorithm === 'accepted') {
                      alert('Aceptado por la Comunidad aun no esta disponible');
                    }
                  }}
                  disabled
                  className="p-4 rounded-xl border-2 border-slate-600 bg-slate-700/30 opacity-60 cursor-not-allowed relative"
                >
                <div className="text-slate-400 font-bold text-sm tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>Aceptado por la Comunidad</div>
                <div className="text-slate-500 text-xs mt-1 tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>Próximamente</div>
                <div className="absolute top-2 right-2 bg-slate-600 text-slate-400 text-xs px-2 py-1 rounded tracking-wide" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Bloqueado
                </div>
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleStart}
              disabled={numCities < 4 || numCities > 15}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-12 rounded-xl text-xl shadow-lg shadow-cyan-500/50 transition-all duration-300 relative overflow-hidden whitespace-nowrap"
            >
              <span className="relative z-10 tracking-widest font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                INICIAR JUEGO
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
