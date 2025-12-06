import React from 'react';
import type { Point } from '../utils/tspDistance';

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

  React.useEffect(() => {
    drawResults();
  }, [userTour, optimalTour, cities]);

  const drawResults = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cities[userTour[0]].x, cities[userTour[0]].y);
    for (let i = 1; i < userTour.length; i++) {
      ctx.lineTo(cities[userTour[i]].x, cities[userTour[i]].y);
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
    ctx.stroke();

    cities.forEach((city, index) => {
      ctx.fillStyle = '#6b7280';
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

  const difference = differenceFromBackend ?? (userDistance - optimalDistance);
  const percentage = percentageFromBackend ?? Math.abs((difference / optimalDistance) * 100);
  const statusMessage = statusMessageFromBackend ?? '';

  const algorithmName = 'Aceptado por la Comunidad';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Resultados
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="border-2 border-gray-200 rounded-lg p-4 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Tu Camino
              </h2>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ruta:</p>
                <p className="text-sm font-mono text-gray-800 break-all">
                  [{userTour.join(' → ')}]
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Distancia:</p>
                <p className="text-2xl font-bold text-blue-600">
                  {userDistance.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4 mt-4 space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Solucion Optima ({algorithmName})
              </h2>
              <div>
                <p className="text-sm text-gray-600 mb-1">Ruta:</p>
                <p className="text-sm font-mono text-gray-800 break-all">
                  [{optimalTour.join(' → ')}]
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Distancia:</p>
                <p className="text-2xl font-bold text-green-600">
                  {optimalDistance.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Tiempo de cálculo:
                </p>
                <p className="text-lg text-gray-800">
                  {executionTime.toFixed(6)}s
                </p>
              </div>
              {toursReviewed !== undefined && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tours revisados:</p>
                  <p className="text-lg text-gray-800">{toursReviewed}</p>
                </div>
              )}
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4 mt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Análisis
              </h2>
              <div>
                 <p className="text-sm text-gray-600 mb-1">Diferencia:</p>
                <p className="text-xl font-bold text-red-600">
                  {difference >= 0 ? '+' : ''}{difference.toFixed(2)} ({percentage.toFixed(2)}% sobre el
                  óptimo)
                </p>
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-800">
                  {statusMessage}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Visualización
            </h3>
            <div className="mb-4 text-sm text-gray-600">
              <p>
                <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>
                Tu ruta (azul)
              </p>
              <p>
                <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
                Ruta óptima (verde)
              </p>
            </div>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-300 rounded-lg w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={onPlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onNewConfig}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Cambiar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}
