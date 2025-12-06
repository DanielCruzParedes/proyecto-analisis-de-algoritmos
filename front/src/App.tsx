import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./assets/inicio";
import TSPGame from "./pages/TSPGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tsp-game" element={<TSPGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
