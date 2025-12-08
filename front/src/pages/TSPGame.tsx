import { useState } from 'react';
import { motion } from 'framer-motion';
import TSPConfigScreen from '../components/TSPConfigScreen';
import TSPGameScreen from '../components/TSPGameScreen';
import TSPResultsScreen from '../components/TSPResultsScreen';
import type { Point } from '../utils/tspDistance';
import { calculateDistanceMatrix, calculateTourDistance } from '../utils/tspDistance';
import { generateRandomCities } from '../utils/tspCityGenerator';
import { solveTSP } from '../services/tspApi';

type GameState = 'config' | 'playing' | 'results';

export default function TSPGame() {
  const [gameState, setGameState] = useState<GameState>('config');
  const [numCities, setNumCities] = useState(5);
  const [algorithm, setAlgorithm] = useState('tspalgoritm');
  const [cities, setCities] = useState<Point[]>([]);
  const [distanceMatrix, setDistanceMatrix] = useState<number[][]>([]);
  const [userTour, setUserTour] = useState<number[]>([]);
  const [userDistance, setUserDistance] = useState(0);
  const [optimalResult, setOptimalResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = (citiesCount: number, algo: string) => {
    setNumCities(citiesCount);
    setAlgorithm(algo);
    
    const calculateCanvasSize = () => {
      const availableWidth = window.innerWidth - 400;
      const availableHeight = window.innerHeight - 200;
      const aspectRatio = 4 / 3;
      
      let width = availableWidth;
      let height = width / aspectRatio;
      
      if (height > availableHeight) {
        height = availableHeight;
        width = height * aspectRatio;
      }
      
      return { width: Math.floor(width), height: Math.floor(height) };
    };

    const canvasSize = calculateCanvasSize();
    const newCities = generateRandomCities(
      citiesCount,
      canvasSize.width,
      canvasSize.height
    );
    const matrix = calculateDistanceMatrix(newCities);

    setCities(newCities);
    setDistanceMatrix(matrix);
    setGameState('playing');
    setUserTour([]);
    setUserDistance(0);
  };

  const handleFinish = async (tour: number[], distance: number) => {
    const finalDistance = calculateTourDistance(tour, distanceMatrix);
    setUserTour(tour);
    setUserDistance(finalDistance);
    
    if (algorithm === 'accepted') {
      alert('Aceptado por la Comunidad aun no esta disponible');
      return;
    }
    
    setLoading(true);

    try {
      const result = await solveTSP({
        distance_matrix: distanceMatrix,
        num_cities: numCities,
        algorithm: algorithm as 'tspalgoritm',
        user_distance: finalDistance,
      });
      setOptimalResult(result);
      setGameState('results');
    } catch (error) {
      console.error('Error al resolver TSP:', error);
      alert('Error al calcular la solución óptima');
    } finally {
      setLoading(false);
    }
  };

  const handleNewGame = () => {
    setGameState('config');
  };

  const handlePlayAgain = () => {
    const calculateCanvasSize = () => {
      const availableWidth = window.innerWidth - 400;
      const availableHeight = window.innerHeight - 200;
      const aspectRatio = 4 / 3;
      
      let width = availableWidth;
      let height = width / aspectRatio;
      
      if (height > availableHeight) {
        height = availableHeight;
        width = height * aspectRatio;
      }
      
      return { width: Math.floor(width), height: Math.floor(height) };
    };

    const canvasSize = calculateCanvasSize();
    const newCities = generateRandomCities(
      numCities,
      canvasSize.width,
      canvasSize.height
    );
    const matrix = calculateDistanceMatrix(newCities);

    setCities(newCities);
    setDistanceMatrix(matrix);
    setGameState('playing');
    setUserTour([]);
    setUserDistance(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-cyan-500/30"
        >
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30 15 L50 5 L70 15 L70 50 L50 60 L30 50 Z"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M30 70 L50 60 L70 70 L70 105 L50 115 L30 105 Z"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  fill="none"
                />
                <line
                  x1="50"
                  y1="5"
                  x2="50"
                  y2="60"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />
                <line
                  x1="50"
                  y1="60"
                  x2="50"
                  y2="115"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                />
                <motion.path
                  d="M35 20 L50 55 L65 20"
                  fill="#06b6d4"
                  opacity={0.6}
                  initial={{ pathLength: 0, opacity: 0.6 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0.6, 0.3, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.path
                  d="M35 100 L50 65 L65 100"
                  fill="#06b6d4"
                  opacity={0.6}
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle
                  cx="50"
                  cy="60"
                  r="3"
                  fill="#06b6d4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
            <p className="text-cyan-300 text-lg" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              Calculando recorrido
            </p>
            <p className="text-cyan-300 text-lg" style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '12px' }}>
              Si pusiste mas de 12 ciudades pues tene paciencia
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  switch (gameState) {
    case 'config':
      return <TSPConfigScreen onStart={handleStart} />;
    case 'playing':
      return (
        <TSPGameScreen
          numCities={numCities}
          algorithm={algorithm}
          cities={cities}
          distanceMatrix={distanceMatrix}
          onFinish={handleFinish}
          onNewGame={handleNewGame}
        />
      );
    case 'results':
      return (
        <TSPResultsScreen
          userTour={userTour}
          userDistance={userDistance}
          optimalTour={optimalResult?.tour || []}
          optimalDistance={optimalResult?.distance || 0}
          executionTime={optimalResult?.time || 0}
          toursReviewed={optimalResult?.tours_reviewed}
          algorithm={algorithm}
          cities={cities}
          difference={optimalResult?.difference}
          percentage={optimalResult?.percentage}
          statusMessage={optimalResult?.status_message}
          onPlayAgain={handlePlayAgain}
          onNewConfig={handleNewGame}
        />
      );
  }
}
