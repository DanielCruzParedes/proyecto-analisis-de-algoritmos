import { useState } from 'react';
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
    
    const canvasWidth = 800;
    const canvasHeight = 600;
    const newCities = generateRandomCities(
      citiesCount,
      canvasWidth,
      canvasHeight
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
    const canvasWidth = 800;
    const canvasHeight = 600;
    const newCities = generateRandomCities(
      numCities,
      canvasWidth,
      canvasHeight
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculando recorrido</p>
        </div>
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
