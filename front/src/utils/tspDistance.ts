export type Point = {
  x: number;
  y: number;
};

export function euclideanDistance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function calculateDistanceMatrix(cities: Point[]): number[][] {
  const n = cities.length;
  const matrix: number[][] = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        matrix[i][j] = euclideanDistance(cities[i], cities[j]);
      }
    }
  }

  return matrix;
}

export function calculateTourDistance(
  tour: number[],
  distanceMatrix: number[][]
): number {
  let totalDistance = 0;
  for (let i = 0; i < tour.length - 1; i++) {
    totalDistance += distanceMatrix[tour[i]][tour[i + 1]];
  }
  return totalDistance;
}
