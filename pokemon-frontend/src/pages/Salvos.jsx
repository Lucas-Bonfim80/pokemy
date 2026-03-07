import { useEffect, useState } from "react";
import Header from "../components/Header";

function Salvos() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function buscarSalvos() {
      const response = await fetch("http://127.0.0.1:8000/pokemons");
      const result = await response.json();
      setPokemons(result);
    }

    buscarSalvos();
  }, []);

  return (
    <div className="main">
      <Header />

      <div className="listaPokemons">
        {pokemons.map((p) => (
          <div key={p.id} className="pokemonData">
            <h2>{p.nome}</h2>
            <p>Altura: {p.altura}</p>
            <p>Peso: {p.tamanho}</p>
            <p>Tipos: {p.tipos.join(", ")}</p>
            <div className="imgPoke">
              <img src={p.imagem}/>
              <img src={p.imagem_costas}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salvos;
