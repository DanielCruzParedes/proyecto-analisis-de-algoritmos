# Análisis y Visualización de Algoritmos

Proyecto de la clase de Análisis de Algoritmos Q4-2025

Este proyecto es una aplicación **full-stack** diseñada para demostrar y comparar visualmente diferentes enfoques algorítmicos para resolver problemas clásicos de las ciencias de la computación: el **problema de la Mochila 0/1 (0/1 Knapsack)**, el **problema Subset Sum**, y el **problema del Viajante (Traveling Salesman Problem, TSP)**.

La aplicación cuenta con un **backend en Python utilizando FastAPI**, encargado de ejecutar los algoritmos, y un **frontend desarrollado con React, Vite y TypeScript**, que proporciona interfaces interactivas y temáticas para cada problema.

---

## Problemas Implementados

### 1. Knapsack Royale
Una interfaz inspirada en *Clash Royale* para el **problema de la Mochila 0/1**.

- **Objetivo**: Encontrar el mazo óptimo de cartas (objetos) que maximice el porcentaje total de uso (valor) sin exceder un costo total de elixir (peso).
- **Algoritmos**: Comparación entre una solución estándar mediante programación dinámica y un algoritmo aproximado voraz (greedy) desarrollado a medida.

---

### 2. Subset Dungeon
Una interfaz con temática RPG retro para el **problema Subset Sum**.

- **Objetivo**: Dado un conjunto de cofres que contienen distintas cantidades de oro (un conjunto de números), determinar si existe un subconjunto cuya suma sea exactamente igual a un valor objetivo.
- **Algoritmos**: Comparación entre una solución estándar con programación dinámica y un algoritmo heurístico aproximado diseñado por el equipo.

---

### 3. TSP Challenge
Un juego interactivo para el **problema del Viajante (TSP)**.

- **Objetivo**: Encontrar la ruta más corta posible que visite un conjunto de ciudades exactamente una vez y regrese a la ciudad de origen. Los usuarios pueden dibujar su propia ruta y comparar su eficiencia contra soluciones generadas por computadora.
- **Algoritmos**: Comparación entre la solución del usuario, el algoritmo exacto de Held-Karp (para instancias pequeñas) y una heurística voraz del Vecino Más Cercano (Nearest Neighbor).

---

## Tecnologías Utilizadas

### Backend
- **Lenguaje**: Python 3
- **Framework**: FastAPI
- **Servidor**: Uvicorn

### Frontend
- **Framework**: React
- **Lenguaje**: TypeScript
- **Herramienta de construcción**: Vite
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Cliente HTTP**: Axios

---

## Algoritmos Implementados

| Problema | Algoritmo Estándar | Algoritmo Personalizado / Aproximado |
|---------|-------------------|--------------------------------------|
| **Mochila 0/1** | Programación Dinámica con Memoización | Greedy (basado en la razón valor/peso, con variaciones) |
| **Subset Sum** | Programación Dinámica con Memoización | Heurístico (intentos voraces omitiendo un elemento a la vez) |
| **Viajante (TSP)** | Held-Karp (Programación Dinámica con Bitmasking) | Heurística del Vecino Más Cercano |

---

## Estructura del Proyecto



```
.
├── back/             # FastAPI Backend
│   ├── algoritmos/   # Python files for each algorithm
│   │   ├── knapsack.py
│   │   ├── subset_sum.py
│   │   └── tsp.py
│   └── main.py       # FastAPI application and API routes
│
└── front/            # React Frontend
    ├── public/       # Static assets (fonts, images)
    ├── src/
    │   ├── assets/   # Components and assets for each problem visualization
    │   ├── components/ # Reusable React components
    │   ├── pages/    # Page components
    │   ├── services/ # API communication
    │   └── utils/    # Utility functions
    └── ...           # Configuration files
```

## Instalación y Configuración

### Requisitos Previos
- Node.js y npm
- Python 3.x y pip

---

### Configuración del Backend

1. Navegar al directorio `back`:
    ```bash
    cd back
    ```
2.  Instalar los paquetes necesarios de Python:
    ```bash
    pip install fastapi uvicorn
    ```
3.  Ejecutar el servidor backend:
    ```bash
    uvicorn main:app --reload
    ```
    El backend estará disponible en http://127.0.0.1:8000.

### Configuración del Frontend

1.  Navegar al directorio front:
    ```bash
    cd front
    ```
2.  Instalar las dependencias de npm:
    ```bash
    npm install
    ```
3.  Ejecutar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    El frontend estará disponible en http://localhost:5173 (o en otro puerto si el 5173 está ocupado).

