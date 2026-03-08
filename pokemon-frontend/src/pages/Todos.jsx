import { useState, useEffect } from "react";
import Header from "../components/Header";
import typeIcons from "../utils/typeIcons";

function Todos() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const buscarTodos = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/pokemon/buscar-todos"
        );

        const data = await response.json();

        console.log("DATA:", data);

        setPokemons(data.pokemons || data);
      } catch (error) {
        console.error("Erro ao buscar pokemons:", error);
      }
    };

    buscarTodos();
  }, []);

  if (pokemons.length === 0) {
    return (
      <div className="main">
        <Header />
        <h2>Carregando pokémons...</h2>
      </div>
    );
  }

  return (
    <div className="main">
      <Header />

      <div className="listaPokemons">
        {pokemons.map((p, index) => (
          <div key={index} className="pokemonData">
            <h2 className="nomePokemon">{p.nome}</h2>

            <div className="altTam">
              <p>Altura: {p.altura}</p>
              <p>Tamanho: {p.tamanho}</p>
            </div>

            <div className="tipos">
              {p.tipos?.map((tipo) => (
                <div key={tipo} className="tipoItem">
                  <img src={typeIcons[tipo]} alt={tipo} width={95} />
                </div>
              ))}
            </div>

            <div className="imgPoke">
              <img src={p.imagem} alt={p.nome} className="imagem" />
              <img src={p.imagem_costas} alt={p.nome} className="imagem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;