import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Salvos from "./pages/Salvos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/salvos" element={<Salvos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;