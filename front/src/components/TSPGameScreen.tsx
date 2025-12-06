import { useState, useRef, useEffect } from 'react';
import type { Point } from '../utils/tspDistance';
import { calculateTourDistance } from '../utils/tspDistance';

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
  const [userTour, setUserTour] = useState<number[]>([]);
  const [visitedCities, setVisitedCities] = useState<Set<number>>(new Set());
  const [currentDistance, setCurrentDistance] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawCanvas();
    }, 0);
    return () => clearTimeout(timer);
  }, [userTour, visitedCities, cities]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userTour.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cities[userTour[0]].x, cities[userTour[0]].y);
      for (let i = 1; i < userTour.length; i++) {
        ctx.lineTo(cities[userTour[i]].x, cities[userTour[i]].y);
      }
      if (visitedCities.size === numCities) {
        ctx.lineTo(cities[userTour[0]].x, cities[userTour[0]].y);
      }
      ctx.stroke();
    }

    cities.forEach((city, index) => {
      const isVisited = visitedCities.has(index);
      ctx.fillStyle = isVisited ? '#10b981' : '#6b7280';
      ctx.beginPath();
      ctx.arc(city.x, city.y, 12, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(index.toString(), city.x, city.y);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const distance = Math.sqrt(
        Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2)
      );

      if (distance < 20) {
        const allVisited = visitedCities.size === numCities;
        const isFirstNode = userTour.length > 0 && userTour[0] === i;
        
        if (!visitedCities.has(i)) {
          const newTour = [...userTour, i];
          const newVisited = new Set(visitedCities);
          newVisited.add(i);

          setUserTour(newTour);
          setVisitedCities(newVisited);

          if (newTour.length > 1) {
            const dist = calculateTourDistance(newTour, distanceMatrix);
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

  const tourString =
    userTour.length > 0
      ? `[${userTour.join(' → ')}${userTour.length === numCities ? ' → ' + userTour[0] : ''}]`
      : '[]';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            TSP Challenge
          </h2>
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onClick={handleCanvasClick}
            className="border border-gray-300 rounded-lg cursor-pointer w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>

      <div className="w-80 bg-white shadow-lg p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Ruta Actual</h3>
          <p className="text-sm text-gray-600 break-all">{tourString}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Distancia Actual</h3>
          <p className="text-2xl font-bold text-blue-600">
            {currentDistance.toFixed(2)}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">
            Ciudades Visitadas
          </h3>
          <p className="text-lg text-gray-600">
            {visitedCities.size} / {numCities}
          </p>
        </div>

        <div className="pt-4 space-y-2">
          <button
            onClick={handleFinish}
            disabled={visitedCities.size !== numCities}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Terminar Ruta
          </button>

          <button
            onClick={handleReset}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reiniciar Ruta
          </button>

          <button
            onClick={onNewGame}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Nueva Partida
          </button>
        </div>
      </div>
    </div>
  );
}
