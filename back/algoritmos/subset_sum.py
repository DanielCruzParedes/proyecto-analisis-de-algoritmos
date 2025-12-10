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
