# Algoritmo de Subset Sum con memoización
def isSubsetSumRec(arr, n, sum, memo):
	# Si la suma es cero, se encontró un subconjunto
	if sum == 0:
		return True
	# Si no quedan elementos
	if n <= 0:
		return False
	# Si el valor ya fue computado, retornarlo
	if memo[n][sum] != -1:
		return memo[n][sum]
	# Si el último elemento es mayor que la suma, ignorarlo
	if arr[n - 1] > sum:
		memo[n][sum] = isSubsetSumRec(arr, n - 1, sum, memo)
	else:
		# Incluir o excluir el último elemento
		memo[n][sum] = (isSubsetSumRec(arr, n - 1, sum, memo)
						or isSubsetSumRec(arr, n - 1, sum - arr[n - 1], memo))
	return memo[n][sum]

def isSubsetSum(arr, sum):
	n = len(arr)
	memo = [[-1 for _ in range(sum + 1)] for _ in range(n + 1)]
	return isSubsetSumRec(arr, n, sum, memo)

# Algoritmo aproximado para subset sum
def subset_sum_heuristic(arr, target):
	n = len(arr)
	arr_sorted = sorted(arr)

	# Se intenta encontrar una suma exacta omitiendo un elemento cada vez
	for skip in range(n):
		current_sum = 0
		current_subset = []

		for i in range(n):
			if i == skip:
				continue

			if current_sum + arr_sorted[i] <= target:
				current_sum += arr_sorted[i]
				current_subset.append(arr_sorted[i])

			if current_sum == target:
				return {
					"exact": True,
					"subset": current_subset
				}

	# Si se probó todo y no se encontró suma exacta
	return {
		"exact": False,
		"subset": []
	}
