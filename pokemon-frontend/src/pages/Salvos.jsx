import { useState, useEffect } from "react";
import Header from "../components/Header";
import Lixo from "../assets/icons8-lixo-96.png";
import typeIcons from "../utils/typeIcons";

function Salvos() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const buscarSalvos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/pokemons");
        const data = await response.json();

        setPokemons(data);
      } catch (error) {
        console.error("Erro ao buscar pokemons:", error);
      }
    };

    buscarSalvos();
  }, []);

  const deletarPokemon = async (nome) => {
    try {
      await fetch(`http://127.0.0.1:8000/pokemon/${nome}`, {
        method: "DELETE",
      });

      setPokemons((prev) => prev.filter((p) => p.nome !== nome));
    } catch (error) {
      console.error("Erro ao deletar pokemon:", error);
    }
  };

  return (
    <div className="main">
      <Header />

      <div className="listaPokemons">
        {pokemons.map((p) => {
          let tipos = [];

          try {
            tipos = Array.isArray(p.tipos) ? p.tipos : JSON.parse(p.tipos);
          } catch {
            tipos = [];
          }

          return (
            <div key={p.id} className="pokemonData">
              <h2 className="nomePokemon">{p.nome}</h2>
              <div className="altTam">
                <p>Altura: {p.altura}</p>
                <p>Tamanho: {p.tamanho}</p>
              </div>
              <div className="tipos">
                {tipos.map((tipo) => (
                  <div key={tipo} className="tipoItem">
                    <img src={typeIcons[tipo]} alt={tipo} width={95} />
                  </div>
                ))}
              </div>

              <div className="imgPoke">
                <img src={p.imagem} alt={p.nome} className="imagem" />
                <img src={p.imagem_costas} alt={p.nome} className="imagem" />
              </div>
              <div>
                <h2
                  onClick={() => deletarPokemon(p.nome)}
                >
                  Delete
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Salvos;
