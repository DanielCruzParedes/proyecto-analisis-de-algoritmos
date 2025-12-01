# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from fastapi import FastAPI
from algoritmos.knapsack import knapsack_exact, knapsack_greedy

app = FastAPI()

@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}

# Aqui se agregan las rutas



