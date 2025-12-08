import React from 'react';
import { motion } from 'framer-motion';
import type { Point } from '../utils/tspDistance';
import icon1 from '../assets/assets_TSP/icon_1.png';
import icon2 from '../assets/assets_TSP/icon_2.png';
import icon3 from '../assets/assets_TSP/icon_3.png';
import icon4 from '../assets/assets_TSP/icon_4.png';
import icon5 from '../assets/assets_TSP/icon_5.png';
import icon6 from '../assets/assets_TSP/icon_6.png';
import icon7 from '../assets/assets_TSP/icon_7.png';
import icon8 from '../assets/assets_TSP/icon_8.png';
import icon9 from '../assets/assets_TSP/icon_9.png';
import icon10 from '../assets/assets_TSP/icon_10.png';
import icon11 from '../assets/assets_TSP/icon_11.png';
import icon12 from '../assets/assets_TSP/icon_12.png';
import icon13 from '../assets/assets_TSP/icon_13.png';
import icon14 from '../assets/assets_TSP/icon_14.png';
import icon15 from '../assets/assets_TSP/icon_15.png';

const cityIcons: { [key: number]: string } = {
  0: icon1,
  1: icon2,
  2: icon3,
  3: icon4,
  4: icon5,
  5: icon6,
  6: icon7,
  7: icon8,
  8: icon9,
  9: icon10,
  10: icon11,
  11: icon12,
  12: icon13,
  13: icon14,
  14: icon15,
};

interface TSPResultsScreenProps {
  userTour: number[];
  userDistance: number;
  optimalTour: number[];
  optimalDistance: number;
  executionTime: number;
  toursReviewed?: number;
  algorithm: string;
  cities: Point[];
  difference?: number;
  percentage?: number;
  statusMessage?: string;
  onPlayAgain: () => void;
  onNewConfig: () => void;
}

export default function TSPResultsScreen({
  userTour,
  userDistance,
  optimalTour,
  optimalDistance,
  executionTime,
  toursReviewed,
  algorithm,
  cities,
  difference: differenceFromBackend,
  percentage: percentageFromBackend,
  statusMessage: statusMessageFromBackend,
  onPlayAgain,
  onNewConfig,
}: TSPResultsScreenProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = React.useState<{ [key: number]: HTMLImageElement }>({});

  React.useEffect(() => {
    const loadImages = async () => {
      const images: { [key: number]: HTMLImageElement } = {};
      const loadPromises = Object.keys(cityIcons).map((key) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          const index = parseInt(key);
          img.onload = () => {
            images[index] = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = cityIcons[index];
        });
      });
      await Promise.all(loadPromises);
      setLoadedImages(images);
    };
    loadImages();
  }, []);

  React.useEffect(() => {
    drawResults();
  }, [userTour, optimalTour, cities, loadedImages]);

  const drawResults = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cities[userTour[0]].x, cities[userTour[0]].y);
    for (let i = 1; i < userTour.length; i++) {
      ctx.lineTo(cities[userTour[i]].x, cities[userTour[i]].y);
    }
    if (userTour.length > 0) {
      ctx.lineTo(cities[userTour[0]].x, cities[userTour[0]].y);
    }
    ctx.stroke();

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(cities[optimalTour[0]].x, cities[optimalTour[0]].y);
    for (let i = 1; i < optimalTour.length; i++) {
      ctx.lineTo(cities[optimalTour[i]].x, cities[optimalTour[i]].y);
    }
    if (optimalTour.length > 0) {
      ctx.lineTo(cities[optimalTour[0]].x, cities[optimalTour[0]].y);
    }
    ctx.stroke();

    cities.forEach((city, index) => {
      const iconSize = 70;
      const img = loadedImages[index];
      if (img) {
        ctx.drawImage(
          img,
          city.x - iconSize / 2,
          city.y - iconSize / 2,
          iconSize,
          iconSize
        );
      } else {
        ctx.fillStyle = '#6b7280';
        ctx.beginPath();
        ctx.arc(city.x, city.y, 12, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const difference = differenceFromBackend ?? (userDistance - optimalDistance);
  const percentage = percentageFromBackend ?? Math.abs((difference / optimalDistance) * 100);
  const accuracyPercentage = optimalDistance > 0 ? (optimalDistance / userDistance) * 100 : 100;
  const statusMessage = statusMessageFromBackend ?? '';


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            Resultados
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-cyan-500/30 space-y-6"
          >
            <div className="border-2 border-cyan-500/30 rounded-xl p-4 space-y-4 bg-slate-900/50">
              <h2 className="text-cyan-300 font-semibold mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Tu Camino
              </h2>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Ruta:</p>
                <p className="text-sm font-mono text-slate-300 break-all bg-slate-900/50 p-2 rounded" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '7px' }}>
                  [{userTour.join(' → ')}]
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Distancia:</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  {userDistance.toFixed(2)} m
                </p>
              </div>
            </div>

            <div className="border-2 border-green-500/30 rounded-xl p-4 space-y-4 bg-slate-900/50">
              <h2 className="text-green-300 font-semibold mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Solucion Optima
              </h2>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Ruta:</p>
                <p className="text-sm font-mono text-slate-300 break-all bg-slate-900/50 p-2 rounded" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '7px' }}>
                  [{optimalTour.join(' → ')}]
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Distancia:</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  {optimalDistance.toFixed(2)} m
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
                  Tiempo de calculo:
                </p>
                <p className="text-lg text-slate-300" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
                  {executionTime.toFixed(6)}s
                </p>
              </div>
              {toursReviewed !== undefined && (
                <div>
                  <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Tours revisados:</p>
                  <p className="text-lg text-slate-300" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>{toursReviewed}</p>
                </div>
              )}
            </div>

            <div className="border-2 border-purple-500/30 rounded-xl p-4 bg-slate-900/50">
              <h2 className="text-purple-300 font-semibold mb-4" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
                Analisis
              </h2>
              <div>
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Porcentaje de Acierto:</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  {accuracyPercentage.toFixed(2)}%
                </p>
              </div>
              <div className="mt-4">
                <p className="text-slate-400 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>Diferencia:</p>
                <p className="text-lg font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
                  {Math.abs(difference).toFixed(2)} m de diferencia con la solucion optima
                </p>
              </div>
              {statusMessage && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-cyan-300" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
                    {statusMessage}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-cyan-500/30"
          >
            <h3 className="text-cyan-300 font-semibold mb-4" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              Visualizacion
            </h3>
            <div className="mb-4 text-xs text-slate-300 space-y-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '8px' }}>
              <p>
                <span className="inline-block w-4 h-4 bg-cyan-500 mr-2 rounded"></span>
                Tu ruta (cyan)
              </p>
              <p>
                <span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded"></span>
                Ruta óptima (verde)
              </p>
            </div>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border-2 border-cyan-500/50 rounded-xl w-full shadow-lg shadow-cyan-500/20"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <motion.button
            onClick={onPlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-cyan-500/50 transition-all duration-300"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            Jugar de Nuevo
          </motion.button>
          <motion.button
            onClick={onNewConfig}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-4 px-8 rounded-xl transition-all"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}
          >
            Cambiar Configuracion
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

