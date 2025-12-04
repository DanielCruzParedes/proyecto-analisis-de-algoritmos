# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from fastapi import FastAPI
from algoritmos.knapsack import knapsack_exact, knapsack_greedy
from fastapi.middleware.cors import CORSMiddleware

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



