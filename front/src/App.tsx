import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./assets/inicio";
import GraphsOfGoo from "./pages/GraphsOfGoo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/graphs-of-goo" element={<GraphsOfGoo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
