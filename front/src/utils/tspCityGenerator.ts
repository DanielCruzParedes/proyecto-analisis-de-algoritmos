import type { Point } from './tspDistance';

export function generateRandomCities(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  padding: number = 50
): Point[] {
  const cities: Point[] = [];
  const minX = padding;
  const maxX = canvasWidth - padding;
  const minY = padding;
  const maxY = canvasHeight - padding;

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let x: number, y: number;
    let valid = false;

    while (!valid && attempts < 100) {
      x = Math.random() * (maxX - minX) + minX;
      y = Math.random() * (maxY - minY) + minY;

      valid = true;
      for (const city of cities) {
        const distance = Math.sqrt(
          Math.pow(x - city.x, 2) + Math.pow(y - city.y, 2)
        );
        if (distance < 40) {
          valid = false;
          break;
        }
      }

      attempts++;
    }

    cities.push({ x: x!, y: y! });
  }

  return cities;
}
