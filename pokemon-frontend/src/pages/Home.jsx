import { useState } from "react";
import Header from "../components/Header";
import typeIcons from "../utils/typeIcons";

function Home() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);

  const buscarPokemon = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/pokemon/buscar-e-salvar/${pokemon}`,
      { method: "POST" },
    );

    const result = await response.json();

    setData(result.pokemon);
  };

  return (
    <div className="main">
      <Header />
      <div className="busca">
        <input
          className="inputBusca"
          type="text"
          placeholder="Digite o Pokémon"
          value={pokemon}
          onChange={(e) => setPokemon(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") buscarPokemon();
          }}
        />

        <button className="find" onClick={buscarPokemon}>
          <img src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF" />
        </button>
      </div>

      <div className="pokeGrandao">
        {data && (
          <div className="pokeInfos">
            <h1>{data.nome}</h1>
            <div className="altTam">
              <p>Altura: {data.altura}</p>
              <p>Tamanho: {data.tamanho}</p>
            </div>
            <div className="imgPoke">
              <img src={data.imagem} className="imagem" />
              <img src={data.imagem_costas} className="imagem" />
            </div>

            <div className="tipos">
              {data.tipos.map((tipo) => (
                <div key={tipo} className="tipoItem">
                  <img src={typeIcons[tipo]} className="tipoImg" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
