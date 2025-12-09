from itertools import permutations, combinations
import time
from typing import List, Dict, Tuple

def calcular_analisis_resultado(distancia_usuario, distancia_optima):
    diferencia = distancia_usuario - distancia_optima
    porcentaje = abs((diferencia / distancia_optima) * 100) if distancia_optima > 0 else 0
    
    if porcentaje < 1:
        mensaje_estado = 'Perfecto'
    elif porcentaje < 5:
        mensaje_estado = 'Casi perfecto'
    elif porcentaje < 15:
        mensaje_estado = 'Optimo'
    elif porcentaje < 30:
        mensaje_estado = 'Mejorable'
    else:
        mensaje_estado = 'Uy chele, hacer caminos no es lo tuyo'
    
    return {
        "difference": round(diferencia, 2),
        "percentage": round(porcentaje, 2),
        "status_message": mensaje_estado
    }

def tspalgoritm(distance_matrix, num_cities, user_distance=None):
    tiempo_inicio = time.perf_counter()
    cantidad_tours_revisados = 0
    
    if num_cities < 2:
        resultado_base = {
            "tour": [0],
            "distance": 0.0,
            "time": 0.0,
            "tours_reviewed": 0
        }
        if user_distance is not None:
            analisis = calcular_analisis_resultado(user_distance, 0.0)
            resultado_base.update(analisis)
        return resultado_base
    
    ciudades = list(range(num_cities))
    
    mejor_tour = []
    mejor_distancia = float('inf')  
    
    for tour in permutations(ciudades):
        cantidad_tours_revisados += 1
        
        tour = list(tour)
        tour_completo = tour + [tour[0]]
        
        distancia_total = 0
        for i in range(len(tour_completo) - 1):
            ciudad_actual = tour_completo[i]
            ciudad_siguiente = tour_completo[i + 1]
            distancia_total += distance_matrix[ciudad_actual][ciudad_siguiente]
        
        if distancia_total < mejor_distancia:
            mejor_distancia = distancia_total
            mejor_tour = tour_completo
    
    tiempo_fin = time.perf_counter()
    tiempo_ejecucion = tiempo_fin - tiempo_inicio
    
    resultado = {
        "tour": mejor_tour,
        "distance": round(mejor_distancia, 2),
        "time": round(tiempo_ejecucion, 6),
        "tours_reviewed": cantidad_tours_revisados
    }
    
    if user_distance is not None:
        analisis = calcular_analisis_resultado(user_distance, mejor_distancia)
        resultado.update(analisis)
    
    return resultado

def held_karp_tsp(distance_matrix: List[List[float]], num_cities: int, user_distance=None) -> Dict:

    tiempo_inicio = time.perf_counter()
    
    if num_cities < 2:
        resultado_base = {
            "tour": [0],
            "distance": 0.0,
            "time": 0.0,
            "tours_reviewed": 0
        }
        if user_distance is not None:
            analisis = calcular_analisis_resultado(user_distance, 0.0)
            resultado_base.update(analisis)
        return resultado_base
    
    memo = {}
    
    for ciudad in range(1, num_cities):
        memo[(1 << ciudad, ciudad)] = (distance_matrix[0][ciudad], 0)
    
    for tamaño_subset in range(2, num_cities):
        for subset in generar_subsets(num_cities, tamaño_subset):
            for ciudad_final in range(1, num_cities):
                if not (subset & (1 << ciudad_final)):
                    continue
                
                subset_sin_final = subset & ~(1 << ciudad_final)
                mejor_distancia = float('inf')
                mejor_previa = -1
                
                for ciudad_previa in range(1, num_cities):
                    if not (subset_sin_final & (1 << ciudad_previa)):
                        continue
                    
                    distancia_previa = memo.get((subset_sin_final, ciudad_previa))
                    if distancia_previa is None:
                        continue
                    
                    distancia_total = distancia_previa[0] + distance_matrix[ciudad_previa][ciudad_final]
                    
                    if distancia_total < mejor_distancia:
                        mejor_distancia = distancia_total
                        mejor_previa = ciudad_previa
                
                if mejor_previa != -1:
                    memo[(subset, ciudad_final)] = (mejor_distancia, mejor_previa)
    
    todas_ciudades = (1 << num_cities) - 2
    mejor_distancia = float('inf')
    ultima_ciudad = -1
    
    for ciudad in range(1, num_cities):
        if not (todas_ciudades & (1 << ciudad)):
            continue
        
        resultado = memo.get((todas_ciudades, ciudad))
        if resultado is None:
            continue
        
        distancia_total = resultado[0] + distance_matrix[ciudad][0]
        
        if distancia_total < mejor_distancia:
            mejor_distancia = distancia_total
            ultima_ciudad = ciudad
    
    tour = reconstruir_tour(memo, num_cities, ultima_ciudad)
    
    tiempo_fin = time.perf_counter()
    tiempo_ejecucion = tiempo_fin - tiempo_inicio
    
    estados_explorados = len(memo)
    
    resultado = {
        "tour": tour,
        "distance": round(mejor_distancia, 2),
        "time": round(tiempo_ejecucion, 6),
        "tours_reviewed": estados_explorados
    }
    
    if user_distance is not None:
        analisis = calcular_analisis_resultado(user_distance, mejor_distancia)
        resultado.update(analisis)
    
    return resultado

def generar_subsets(num_cities: int, tamaño: int):
    subsets = []
    generar_subsets_recursivo(1, num_cities, tamaño, 0, 0, subsets)
    return subsets

def generar_subsets_recursivo(inicio, num_cities, tamaño, actual, cuenta, subsets):
    if cuenta == tamaño:
        subsets.append(actual)
        return
    
    for i in range(inicio, num_cities):
        generar_subsets_recursivo(
            i + 1, 
            num_cities, 
            tamaño, 
            actual | (1 << i), 
            cuenta + 1, 
            subsets
        )

def reconstruir_tour(memo: Dict, num_cities: int, ultima_ciudad: int) -> List[int]:
    tour = [0]
    subset = (1 << num_cities) - 2
    ciudad_actual = ultima_ciudad
    
    while ciudad_actual != 0:
        tour.append(ciudad_actual)
        subset_sin_actual = subset & ~(1 << ciudad_actual)
        ciudad_actual = memo[(subset, ciudad_actual)][1]
        subset = subset_sin_actual
    
    tour.append(0)
    return tour