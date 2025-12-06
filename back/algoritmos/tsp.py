from itertools import permutations
import time

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