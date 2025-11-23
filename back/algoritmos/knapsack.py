# Codigo placeholder

def knapsack_exact(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][capacity]


def knapsack_greedy(weights, values, capacity):
    ratio = [(values[i] / weights[i], i) for i in range(len(weights))]
    ratio.sort(reverse=True)
    total_value = 0
    remaining = capacity

    for r, idx in ratio:
        if weights[idx] <= remaining:
            total_value += values[idx]
            remaining -= weights[idx]
    return total_value
