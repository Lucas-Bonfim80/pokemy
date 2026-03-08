import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Salvos from "./pages/Salvos";
import Todos from "./pages/Todos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salvos" element={<Salvos />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;