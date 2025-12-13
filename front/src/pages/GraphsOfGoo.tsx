import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Node {
  id: number;
  x: number;
  y: number;
  color: number | null;
  neighbors: number[];
}

interface GraphData {
  [key: number]: number[];
}

const GOO_COLORS = [
  "#22c55e", // Verde
  "#3b82f6", // Azul
  "#f59e0b", // Naranja
  "#ec4899", // Rosa
  "#8b5cf6", // Púrpura
  "#ef4444", // Rojo
  "#14b8a6", // Teal
  "#f97316", // Naranja oscuro
];

export default function GraphsOfGoo() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<[number, number][]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("greedy");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedSample, setSelectedSample] = useState<string>("goo_simple");
  const [customGraph, setCustomGraph] = useState<string>("");

  const sampleGraphs = {
    goo_simple: {
      0: [1, 2],
      1: [0, 2],
      2: [0, 1, 3],
      3: [2],
    },
    goo_tower: {
      0: [1, 2, 3],
      1: [0, 2],
      2: [0, 1, 3],
      3: [0, 2, 4],
      4: [3],
    },
    goo_bridge: {
      0: [1],
      1: [0, 2],
      2: [1, 3],
      3: [2, 4],
      4: [3, 5],
      5: [4],
    },
    goo_complex: {
      0: [1, 2, 3, 4],
      1: [0, 2, 5],
      2: [0, 1, 3, 5],
      3: [0, 2, 4, 6],
      4: [0, 3, 6],
      5: [1, 2, 6],
      6: [3, 4, 5],
    },
  };

  const graphLayouts: { [key: string]: { x: number; y: number }[] } = {
    goo_simple: [
      { x: 200, y: 200 },
      { x: 400, y: 200 },
      { x: 300, y: 350 },
      { x: 300, y: 500 },
    ],
    goo_tower: [
      { x: 300, y: 150 },
      { x: 200, y: 300 },
      { x: 400, y: 300 },
      { x: 300, y: 450 },
      { x: 300, y: 550 },
    ],
    goo_bridge: [
      { x: 100, y: 300 },
      { x: 200, y: 300 },
      { x: 300, y: 300 },
      { x: 400, y: 300 },
      { x: 500, y: 300 },
      { x: 600, y: 300 },
    ],
    goo_complex: [
      { x: 300, y: 150 },
      { x: 150, y: 300 },
      { x: 300, y: 300 },
      { x: 450, y: 300 },
      { x: 550, y: 150 },
      { x: 150, y: 450 },
      { x: 450, y: 450 },
    ],
  };

  useEffect(() => {
    loadGraph(selectedSample);
  }, [selectedSample]);

  const loadGraph = (graphKey: string) => {
    const graph = sampleGraphs[graphKey as keyof typeof sampleGraphs];
    const layout = graphLayouts[graphKey];
    
    const nodeList: Node[] = Object.keys(graph).map((key) => {
      const id = parseInt(key);
      return {
        id,
        x: layout[id].x,
        y: layout[id].y,
        color: null,
        neighbors: graph[id as keyof typeof graph],
      };
    });

    const edgeList: [number, number][] = [];
    Object.entries(graph).forEach(([node, neighbors]) => {
      const nodeId = parseInt(node);
      neighbors.forEach((neighbor: number) => {
        if (nodeId < neighbor) {
          edgeList.push([nodeId, neighbor]);
        }
      });
    });

    setNodes(nodeList);
    setEdges(edgeList);
    setResult(null);
  };

  const runAlgorithm = async () => {
    setIsRunning(true);
    setResult(null);

    const graph = nodes.reduce((acc, node) => {
      acc[node.id] = node.neighbors;
      return acc;
    }, {} as GraphData);

    try {
      let endpoint = "";
      if (selectedAlgorithm === "greedy") {
        endpoint = "http://localhost:8000/graph-coloring/greedy";
      } else if (selectedAlgorithm === "backtracking") {
        endpoint = "http://localhost:8000/graph-coloring/backtracking";
      } else if (selectedAlgorithm === "optimal") {
        endpoint = "http://localhost:8000/graph-coloring/optimal";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ graph }),
      });

      const data = await response.json();
      setResult(data);

      // Animar la coloración
      if (data.colors) {
        const colorEntries = Object.entries(data.colors);
        for (let i = 0; i < colorEntries.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const [nodeId, color] = colorEntries[i];
          setNodes((prev) =>
            prev.map((node) =>
              node.id === parseInt(nodeId)
                ? { ...node, color: color as number }
                : node
            )
          );
        }
      }
    } catch (error) {
      console.error("Error running algorithm:", error);
      alert("Error: Asegúrate de que el backend esté corriendo en http://localhost:8000");
    } finally {
      setIsRunning(false);
    }
  };

  const resetColors = () => {
    setNodes((prev) => prev.map((node) => ({ ...node, color: null })));
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white p-6">
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1
          className="text-6xl font-extrabold mb-2"
          style={{
            fontFamily: "'Comic Sans MS', cursive",
            textShadow: "0 0 20px #22c55e, 0 0 40px #16a34a",
          }}
        >
          Graphs of Goo
        </h1>
        <p className="text-green-300 text-xl">
          Coloración de Grafos - Inspirado en World of Goo
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full transition"
        >
          ← Volver al Inicio
        </button>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Control */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/30 h-fit"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">
            Panel de Control
          </h2>

          {/* Selección de Grafo */}
          <div className="mb-6">
            <label className="block text-green-300 mb-2 font-semibold">
              Selecciona una Torre de Goo:
            </label>
            <select
              value={selectedSample}
              onChange={(e) => {
                setSelectedSample(e.target.value);
                resetColors();
              }}
              className="w-full bg-green-900/50 border-2 border-green-500/50 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
            >
              <option value="goo_simple">Torre Simple (4 nodos)</option>
              <option value="goo_tower">Torre Alta (5 nodos)</option>
              <option value="goo_bridge">Puente de Goo (6 nodos)</option>
              <option value="goo_complex">Estructura Compleja (7 nodos)</option>
            </select>
          </div>

          {/* Selección de Algoritmo */}
          <div className="mb-6">
            <label className="block text-green-300 mb-2 font-semibold">
              Algoritmo de Coloración:
            </label>
            <div className="space-y-2">
              {[
                { value: "greedy", label: "Greedy (Rápido)", desc: "Welsh-Powell" },
                { value: "backtracking", label: "Backtracking", desc: "Con restricciones" },
                { value: "optimal", label: "Óptimo", desc: "Número cromático" },
              ].map((algo) => (
                <button
                  key={algo.value}
                  onClick={() => setSelectedAlgorithm(algo.value)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition ${
                    selectedAlgorithm === algo.value
                      ? "bg-green-600 border-green-400 shadow-lg shadow-green-500/50"
                      : "bg-green-900/30 border-green-700/50 hover:border-green-500/50"
                  }`}
                >
                  <div className="font-bold">{algo.label}</div>
                  <div className="text-sm text-green-300">{algo.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="space-y-3">
            <button
              onClick={runAlgorithm}
              disabled={isRunning}
              className={`w-full py-3 px-6 rounded-full font-bold text-lg transition ${
                isRunning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105"
              }`}
            >
              {
                isRunning ? "Coloreando..." : "Colorear Grafo"
              }
            </button>
            <button
              onClick={resetColors}
              className="w-full py-2 px-6 rounded-full bg-red-600 hover:bg-red-700 transition"
            >
              Reiniciar
            </button>
          </div>

          {/* Resultados */}
          {result && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-4 bg-green-900/50 rounded-lg border-2 border-green-400"
            >
              <h3 className="font-bold text-green-300 mb-2">Resultados:</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-green-400">Colores usados:</span>{" "}
                  {result.num_colors_used || result.chromatic_number}
                </p>
                <p>
                  <span className="text-green-400">Algoritmo:</span>{" "}
                  {result.algorithm}
                </p>
                <p>
                  <span className="text-green-400">Válido:</span>{" "}
                  {result.is_valid ? "Sí" : "No"}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Visualización del Grafo */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="lg:col-span-2 bg-black/40 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-500/30"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">
            Visualización del Grafo
          </h2>

          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 min-h-[600px]">
            <svg width="100%" height="600" className="overflow-visible">
              {/* Renderizar aristas */}
              {edges.map(([from, to], idx) => {
                const fromNode = nodes.find((n) => n.id === from);
                const toNode = nodes.find((n) => n.id === to);
                if (!fromNode || !toNode) return null;

                return (
                  <motion.line
                    key={`edge-${idx}`}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#16a34a"
                    strokeWidth="4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  />
                );
              })}

              {/* Renderizar nodos (Goo Balls) */}
              {nodes.map((node, idx) => (
                <g key={`node-${node.id}`}>
                  {/* Nodo simple */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="30"
                    fill={
                      node.color !== null
                        ? GOO_COLORS[node.color % GOO_COLORS.length]
                        : "#374151"
                    }
                    stroke="#fff"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="cursor-pointer"
                  />

                  {/* ID del nodo */}
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="18"
                    fontWeight="bold"
                  >
                    {node.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Leyenda de Colores */}
          {result && result.colors && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex flex-wrap gap-3 justify-center"
            >
              {[...new Set(Object.values(result.colors))].map((color: any) => (
                <div
                  key={color}
                  className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-green-500/30"
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{
                      backgroundColor: GOO_COLORS[color % GOO_COLORS.length],
                    }}
                  />
                  <span className="text-sm">Color {color + 1}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
