# Algoritmo de Coloración de Grafos - Graphs of Goo
# Inspirado en World of Goo

def graph_coloring_greedy(graph):

    nodes_by_degree = sorted(graph.keys(), key=lambda x: len(graph[x]), reverse=True)

    colors = {}
    

    for node in nodes_by_degree:

        neighbor_colors = {colors[neighbor] for neighbor in graph[node] if neighbor in colors}

        color = 0
        while color in neighbor_colors:
            color += 1
        
        colors[node] = color
    
    return colors


def graph_coloring_backtracking(graph, max_colors=None):

    nodes = list(graph.keys())
    n = len(nodes)
    
    if max_colors is None:
        max_colors = n
    
    colors = {}
    
    def is_safe(node, color):

        for neighbor in graph[node]:
            if neighbor in colors and colors[neighbor] == color:
                return False
        return True
    
    def backtrack(node_idx):

        if node_idx == n:
            return True
        
        node = nodes[node_idx]
        
        for color in range(max_colors):
            if is_safe(node, color):
                colors[node] = color
                if backtrack(node_idx + 1):
                    return True
                del colors[node]
        
        return False
    
    if backtrack(0):
        return colors
    return None


def chromatic_number(graph):

    n = len(graph)

    for num_colors in range(1, n + 1):
        result = graph_coloring_backtracking(graph, num_colors)
        if result is not None:
            return num_colors, result
    
    return n, graph_coloring_greedy(graph)


def validate_coloring(graph, colors):

    for node in graph:
        for neighbor in graph[node]:
            if colors[node] == colors[neighbor]:
                return False
    return True


def get_color_count(colors):

    return len(set(colors.values()))


def get_sample_graphs():

    return {
        "goo_simple": {
            0: [1, 2],
            1: [0, 2],
            2: [0, 1, 3],
            3: [2]
        },
        "goo_tower": {
            0: [1, 2, 3],
            1: [0, 2],
            2: [0, 1, 3],
            3: [0, 2, 4],
            4: [3]
        },
        "goo_bridge": {
            0: [1],
            1: [0, 2],
            2: [1, 3],
            3: [2, 4],
            4: [3, 5],
            5: [4]
        },
        "goo_complex": {
            0: [1, 2, 3, 4],
            1: [0, 2, 5],
            2: [0, 1, 3, 5],
            3: [0, 2, 4, 6],
            4: [0, 3, 6],
            5: [1, 2, 6],
            6: [3, 4, 5]
        }
    }
