# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import timeit 

from algoritmos.knapsack import knapsack01 as knapsack01, greedy_knapsack

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



