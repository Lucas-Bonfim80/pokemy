import { useState } from "react";
import Header from "../components/Header";

function Home() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);

const buscarPokemon = async () => {
  const response = await fetch(
    `http://127.0.0.1:8000/pokemon/buscar-e-salvar/${pokemon}`,
    { method: "POST" }
  );

  const result = await response.json();

  setData(result.pokemon);
};

  return (
    <div className="main">
      <Header />
      <h1>Buscar Pokémon</h1>

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
          <img src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF"/>
        </button>
      </div>

      {data && (
        <div className="">
          <h2>{data.nome}</h2>
          <p>Altura: {data.altura}</p>
          <p>Peso: {data.peso}</p>
          <p>Tipos: {data.tipos.join(", ")}</p>
          <div className="imgPoke">
            <img src={data.imagem} alt="" />
            <img src={data.imagem_costas} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
