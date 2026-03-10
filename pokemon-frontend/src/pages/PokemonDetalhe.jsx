import { useState, useEffect } from "react";
import Header from "../components/Header";
import typeIcons from "../utils/typeIcons";

function PokemonDetalhe() {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const buscarPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/charmander",
        );

        const data = await response.json();

        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar pokemon:", error);
      }
    };

    buscarPokemon();
  }, []);

  if (!pokemon) {
    return (
      <div className="main">
        <Header />
        <h2>Carregando pokemon...</h2>
      </div>
    );
  }

  return (
    <div className="main">
      <Header />

      <div className="listaPokemons">
        <div className="pokemonData">
          <h2 className="nomePokemon">{pokemon.name}</h2>

          <div className="altTam">
            <p>Altura: {pokemon.height}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Experiência base: {pokemon.base_experience}</p>
          </div>

          {/* TIPOS */}
          <div className="tipos">
            {pokemon.types.map((t) => (
              <div key={t.type.name} className="tipoItem">
                <img
                  src={typeIcons[t.type.name]}
                  alt={t.type.name}
                  width={95}
                />
              </div>
            ))}
          </div>

          {/* IMAGENS */}
          <div className="imgPoke">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="imagem"
            />

            <img
              src={pokemon.sprites.back_default}
              alt={pokemon.name}
              className="imagem"
            />

            <img
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}
              className="imagem"
            />
          </div>

          {/* HABILIDADES */}
          <div className="altTam">
            <h3>Habilidades</h3>

            {pokemon.abilities.map((a) => (
              <p key={a.ability.name}>
                {a.ability.name}
                {a.is_hidden ? " (hidden)" : ""}
              </p>
            ))}
          </div>

          {/* STATUS */}
          <div className="altTam">
            <h3>Status</h3>

            {pokemon.stats.map((s) => (
              <p key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetalhe;
