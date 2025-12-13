# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import timeit 
from algoritmos.knapsack import knapsack01 as knapsack01, greedy_knapsack
from algoritmos.subset_sum import isSubsetSum, subset_sum_heuristic
from algoritmos.tsp import tspalgoritm, held_karp_tsp

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Card(BaseModel):
    name: str
    elixir: int      # weight
    use: int     # value
    
class KnapsackRequest(BaseModel):
    max_elixir: int
    cards: List[Card]

@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}


# Aqui se agregan las rutas
@app.post("/knapsack01")
async def run_knapsack01(req: KnapsackRequest):
    names = [c.name for c in req.cards]
    values = [c.use for c in req.cards]
    weights = [c.elixir for c in req.cards]
    start = timeit.default_timer()
    result = knapsack01(req.max_elixir, values, weights, names)
    end = timeit.default_timer()
    result["execution_time"] = end - start
    return result


# Nueva ruta para el algoritmo greedy_knapsack
@app.post("/greedy_knapsack")
async def run_greedy_knapsack(req: KnapsackRequest):
    names = [c.name for c in req.cards]
    values = [c.use for c in req.cards]
    weights = [c.elixir for c in req.cards]
    start = timeit.default_timer()
    result = greedy_knapsack(req.max_elixir, values, weights, names)
    end = timeit.default_timer()
    result["execution_time"] = end - start
    return result

# Ruta para el algoritmo subset_sum
class SubsetSumRequest(BaseModel):
    arr: list[int]
    sum: int

# Algoritmo de la comunidad para subset sum
@app.post("/subset_sum")
async def run_subset_sum(req: SubsetSumRequest):
    start = timeit.default_timer()
    result = isSubsetSum(req.arr, req.sum)
    end = timeit.default_timer()
    return {"result": result, "execution_time": end - start}

# Algoritmo aproximado para subset sum
@app.post("/greedy_subset_sum")
async def run_subset_sum_heuristic(req: SubsetSumRequest):
    start = timeit.default_timer()
    result = subset_sum_heuristic(req.arr, req.sum)
    end = timeit.default_timer()
    return {"result": result, "execution_time": end - start}

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



