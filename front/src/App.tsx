import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./assets/inicio";
import KnapsackVisual from "./assets/knapsack/knapsack_visual.tsx";
import SubsetVisual from "./assets/subset/subset_sum_visual.tsx";
import "./index.css";
import TSPGame from "./pages/TSPGame";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/knapsack" element={<KnapsackVisual />} />
        <Route path="/subset" element={<SubsetVisual />} />
        <Route path="/tsp-game" element={<TSPGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
