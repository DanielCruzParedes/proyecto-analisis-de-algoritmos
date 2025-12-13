import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface TSPRequest {
  distance_matrix: number[][];
  num_cities: number;
  algorithm: 'tspalgoritm' | 'accepted';
  user_distance?: number;
}

export interface TSPResult {
  tour: number[];
  distance: number;
  time: number;
  tours_reviewed?: number;
  difference?: number;
  percentage?: number;
  status_message?: string;
}

export async function solveTSP(request: TSPRequest): Promise<TSPResult> {
  const response = await axios.post<TSPResult>(
    `${API_URL}/api/tsp/solve`,
    request
  );
  return response.data;
}
