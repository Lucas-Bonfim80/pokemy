import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Salvos from "./pages/Salvos";
import Todos from "./pages/Todos";
import PokemonDetalhe from "./pages/PokemonDetalhe"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salvos" element={<Salvos />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/pokemonDetalhe" element={<PokemonDetalhe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;