# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from fastapi import FastAPI
from algoritmos.knapsack import knapsack_exact, knapsack_greedy
from algoritmos.tsp import tspalgoritm, held_karp_tsp
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}

# Aqui se agregan las rutas

class TSPRequest(BaseModel):
    distance_matrix: List[List[float]]
    num_cities: int
    algorithm: str
    user_distance: float = None

@app.post("/api/tsp/solve")
async def solve_tsp(request: TSPRequest):
    try:
        if request.algorithm == "tspalgoritm":
            result = tspalgoritm(request.distance_matrix, request.num_cities, request.user_distance)
        elif request.algorithm == "accepted" or request.algorithm == "held_karp":
            result = held_karp_tsp(request.distance_matrix, request.num_cities, request.user_distance)
        else:
            return {"error": "Algoritmo no válido"}
        
        return result
    except Exception as e:
        return {"error": str(e)}



