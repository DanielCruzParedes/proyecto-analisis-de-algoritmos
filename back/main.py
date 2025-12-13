# correr < pip install fastapi uvicorn > para instalar las dependencias necesarias
# Para correr el servidor, usa el siguiente comando: < uvicorn main:app --reload >

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, List
from algoritmos.knapsack import knapsack_exact, knapsack_greedy
from algoritmos.graph_coloring import (
    graph_coloring_greedy, 
    graph_coloring_backtracking,
    chromatic_number,
    validate_coloring,
    get_color_count,
    get_sample_graphs
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GraphInput(BaseModel):
    graph: Dict[int, List[int]]
    max_colors: int = None

class GraphColoringResponse(BaseModel):
    colors: Dict[int, int]
    num_colors_used: int
    is_valid: bool
    algorithm: str

@app.get("/")
async def hello_world():
    return {"message": "Hello, World!"}


@app.get("/graph-coloring/samples")
async def get_samples():
    return get_sample_graphs()

@app.post("/graph-coloring/greedy")
async def color_graph_greedy(graph_input: GraphInput):

    colors = graph_coloring_greedy(graph_input.graph)
    
    return GraphColoringResponse(
        colors=colors,
        num_colors_used=get_color_count(colors),
        is_valid=validate_coloring(graph_input.graph, colors),
        algorithm="Greedy (Welsh-Powell)"
    )

@app.post("/graph-coloring/backtracking")
async def color_graph_backtracking(graph_input: GraphInput):

    colors = graph_coloring_backtracking(graph_input.graph, graph_input.max_colors)
    
    if colors is None:
        return {
            "error": "No se pudo colorear el grafo con el número de colores especificado",
            "max_colors": graph_input.max_colors
        }
    
    return GraphColoringResponse(
        colors=colors,
        num_colors_used=get_color_count(colors),
        is_valid=validate_coloring(graph_input.graph, colors),
        algorithm="Backtracking"
    )

@app.post("/graph-coloring/optimal")
async def find_chromatic_number(graph_input: GraphInput):

    chrom_num, colors = chromatic_number(graph_input.graph)
    
    return {
        "chromatic_number": chrom_num,
        "colors": colors,
        "num_colors_used": get_color_count(colors),
        "is_valid": validate_coloring(graph_input.graph, colors),
        "algorithm": "Chromatic Number Finder"
    }

# Aqui se agregan las rutas



