# ALGORITMOS ACEPTADOS POR LA COMUNIDAD

# KNAPSACK 0/1 con Memoization + Reconstrucción del Mazo

def knapsack_rec01(W, values, weights, n, memo):
    # Caso base
    if n == 0 or W == 0:
        return 0

    # Si ya se calculó este subproblema, devolverlo
    if memo[n][W] != -1:
        return memo[n][W]

    pick = 0

    # Si el ítem n-1 cabe en la mochila
    if weights[n - 1] <= W:
        pick = values[n - 1] + knapsack_rec01(W - weights[n - 1], values, weights, n - 1, memo)

    # Si no se elige el ítem n-1
    not_pick = knapsack_rec01(W, values, weights, n - 1, memo)

    memo[n][W] = max(pick, not_pick)
    return memo[n][W]


def knapsack01(W, values, weights, names):
    
    # W: elixir maximo que se quiere 
    # values: arreglo con los valores de las cartas (porcentaje de uso)
    # weights: arreglo con los costos de elixir de las cartas
    # names: lista de nombres de cartas

    n = len(values)
    memo = [[-1 for _ in range(W + 1)] for _ in range(n + 1)]

    max_value = knapsack_rec01(W, values, weights, n, memo)

    # RECONSTRUCCIÓN DEL MAZO
    selected = []
    remaining_W = W
    i = n

    while i > 0 and remaining_W > 0:
        if memo[i][remaining_W] == memo[i - 1][remaining_W]:
            # Este ítem NO se usó
            i -= 1
        else:
            # Este ítem SI se usó
            selected.append({
                "name": names[i - 1],
                "value": values[i - 1],
                "weight": weights[i - 1]
            })
            remaining_W -= weights[i - 1]
            i -= 1

    # la lista queda en reversa porque reconstruimos hacia atrás
    selected.reverse()

    return {
        "max_value": max_value,
        "cards": selected
    }

