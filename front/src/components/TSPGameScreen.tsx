import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import type { Point } from '../utils/tspDistance';
import { calculateTourDistance } from '../utils/tspDistance';
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

const getCityIcon = (cityIndex: number): string => {
  return cityIcons[cityIndex % 15];
};

interface TSPGameScreenProps {
  numCities: number;
  algorithm: string;
  cities: Point[];
  distanceMatrix: number[][];
  onFinish: (userTour: number[], userDistance: number) => void;
  onNewGame: () => void;
}

export default function TSPGameScreen({
  numCities,
  algorithm,
  cities,
  distanceMatrix,
  onFinish,
  onNewGame,
}: TSPGameScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [userTour, setUserTour] = useState<number[]>([]);
  const [visitedCities, setVisitedCities] = useState<Set<number>>(new Set());
  const [currentDistance, setCurrentDistance] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: HTMLImageElement }>({});

  useEffect(() => {
    const loadImages = async () => {
      const images: { [key: number]: HTMLImageElement } = {};
      const maxCities = Math.max(numCities, 25);
      const loadPromises: Promise<void>[] = [];
      
      for (let i = 0; i < maxCities; i++) {
        const iconSrc = getCityIcon(i);
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            images[i] = img;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = iconSrc;
        });
        loadPromises.push(promise);
      }
      
      await Promise.all(loadPromises);
      setLoadedImages(images);
    };
    loadImages();
  }, [numCities]);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const availableWidth = container.clientWidth - 48;
        const availableHeight = window.innerHeight - 200;
        const aspectRatio = 4 / 3;
        
        let width = availableWidth;
        let height = width / aspectRatio;
        
        if (height > availableHeight) {
          height = availableHeight;
          width = height * aspectRatio;
        }
        
        setCanvasSize({ width: Math.floor(width), height: Math.floor(height) });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawCanvas();
    }, 0);
    return () => clearTimeout(timer);
  }, [userTour, visitedCities, cities, canvasSize, loadedImages]);

  useEffect(() => {
    if (userTour.length > 1 && visitedCities.size === numCities) {
      const completeTour = [...userTour, userTour[0]];
      const dist = calculateTourDistance(completeTour, distanceMatrix);
      setCurrentDistance(dist);
    }
  }, [userTour, visitedCities, numCities, distanceMatrix]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || cities.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const originalWidth = 800;
    const originalHeight = 600;
    const scaleX = canvasSize.width / originalWidth;
    const scaleY = canvasSize.height / originalHeight;

    if (userTour.length > 1) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const firstCity = cities[userTour[0]];
      ctx.moveTo(firstCity.x * scaleX, firstCity.y * scaleY);
      for (let i = 1; i < userTour.length; i++) {
        const city = cities[userTour[i]];
        ctx.lineTo(city.x * scaleX, city.y * scaleY);
      }
      if (visitedCities.size === numCities) {
        ctx.lineTo(firstCity.x * scaleX, firstCity.y * scaleY);
      }
      ctx.stroke();
    }

    cities.forEach((city, index) => {
      const x = city.x * scaleX;
      const y = city.y * scaleY;
      const iconSize = 70;
      
      const img = loadedImages[index];
      if (img) {
        ctx.save();
        if (visitedCities.has(index)) {
          ctx.globalAlpha = 1.0;
        } else {
          ctx.globalAlpha = 0.6;
        }
        ctx.drawImage(
          img,
          x - iconSize / 2,
          y - iconSize / 2,
          iconSize,
          iconSize
        );
        ctx.restore();
      } else {
        ctx.fillStyle = visitedCities.has(index) ? '#10b981' : '#6b7280';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickScaleX = canvas.width / rect.width;
    const clickScaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * clickScaleX;
    const clickY = (e.clientY - rect.top) * clickScaleY;

    const originalWidth = 800;
    const originalHeight = 600;
    const cityScaleX = originalWidth / canvasSize.width;
    const cityScaleY = originalHeight / canvasSize.height;

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const scaledCityX = city.x * (canvasSize.width / originalWidth);
      const scaledCityY = city.y * (canvasSize.height / originalHeight);
      const distance = Math.sqrt(
        Math.pow(clickX - scaledCityX, 2) + Math.pow(clickY - scaledCityY, 2)
      );

      if (distance < 40) {
        const allVisited = visitedCities.size === numCities;
        const isFirstNode = userTour.length > 0 && userTour[0] === i;
        
        if (!visitedCities.has(i)) {
          const newTour = [...userTour, i];
          const newVisited = new Set(visitedCities);
          newVisited.add(i);

          setUserTour(newTour);
          setVisitedCities(newVisited);

          if (newTour.length > 1) {
            let dist;
            if (newVisited.size === numCities) {
              const completeTour = [...newTour, newTour[0]];
              dist = calculateTourDistance(completeTour, distanceMatrix);
            } else {
              dist = calculateTourDistance(newTour, distanceMatrix);
            }
            setCurrentDistance(dist);
          }
          break;
        } else if (allVisited && isFirstNode && userTour.length > 0) {
          const finalTour = [...userTour, userTour[0]];
          const finalDist = calculateTourDistance(finalTour, distanceMatrix);
          setCurrentDistance(finalDist);
          onFinish(finalTour, finalDist);
          break;
        }
      }
    }
  };

  const handleFinish = () => {
    if (visitedCities.size === numCities) {
      const finalTour = [...userTour, userTour[0]];
      const finalDist = calculateTourDistance(finalTour, distanceMatrix);
      onFinish(finalTour, finalDist);
    }
  };

  const handleReset = () => {
    setUserTour([]);
    setVisitedCities(new Set());
    setCurrentDistance(0);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex overflow-hidden relative">
      {/* Efectos de fondo animados */}
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

      <div className="flex-1 p-4 flex items-center justify-center relative z-10">
        <div ref={containerRef} className="w-full h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-cyan-500/30"
          >
            <h2 className="text-center mb-4 text-cyan-300" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '14px' }}>
              TSP Challenge
            </h2>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border-2 border-cyan-500/50 rounded-xl cursor-pointer shadow-lg shadow-cyan-500/20"
              style={{ 
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="w-80 bg-slate-800/90 backdrop-blur-xl border-l border-cyan-500/30 p-6 space-y-6 flex flex-col relative z-10">
        <div>
          <h3 className="text-cyan-300 font-semibold mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
            Ruta Actual
          </h3>
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/50 p-2 rounded min-h-[60px]">
            {userTour.length > 0 ? (
              <>
                <span className="text-slate-300">[</span>
                {userTour.map((cityIndex, idx) => (
                  <React.Fragment key={idx}>
                    {loadedImages[cityIndex] ? (
                      <img 
                        src={getCityIcon(cityIndex)} 
                        alt={`Ciudad ${cityIndex}`}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span className="text-slate-300">{cityIndex}</span>
                    )}
                    {idx < userTour.length - 1 && (
                      <span className="text-cyan-400">→</span>
                    )}
                  </React.Fragment>
                ))}
                {userTour.length === numCities && userTour.length > 0 && (
                  <>
                    <span className="text-cyan-400">→</span>
                    {loadedImages[userTour[0]] ? (
                      <img 
                        src={getCityIcon(userTour[0])} 
                        alt={`Ciudad ${userTour[0]}`}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span className="text-slate-300">{userTour[0]}</span>
                    )}
                  </>
                )}
                <span className="text-slate-300">]</span>
              </>
            ) : (
              <span className="text-slate-300">[]</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-cyan-300 font-semibold mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
            Distancia Actual
          </h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            {currentDistance.toFixed(2)} m
          </p>
        </div>

        <div>
          <h3 className="text-cyan-300 font-semibold mb-2" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}>
            Ciudades Visitadas
          </h3>
          <p className="text-2xl text-slate-300 font-bold" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            {visitedCities.size} / {numCities}
          </p>
        </div>

        <div className="pt-4 space-y-3 flex-1 flex flex-col justify-end">
          <motion.button
            onClick={handleFinish}
            disabled={visitedCities.size !== numCities}
            whileHover={visitedCities.size === numCities ? { scale: 1.05 } : {}}
            whileTap={visitedCities.size === numCities ? { scale: 0.95 } : {}}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-green-500/50 disabled:shadow-none"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            Terminar Ruta
          </motion.button>

          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-yellow-500/50"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            Reiniciar Ruta
          </motion.button>

          <motion.button
            onClick={onNewGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-all"
            style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '10px' }}
          >
            Nueva Partida
          </motion.button>
        </div>
      </div>
    </div>
  );
}
