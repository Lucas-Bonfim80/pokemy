import pokemyLogo from "../assets/pokemyimg.png";
import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
  return (
    <header className="header">
      <img src={pokemyLogo} className="pokemyLogo" />

      <div className="navegacao">
        <Link to="/salvos">
          <button className="buttonSalvos">Pokemons buscados</button>
        </Link>
        <Link to="/">
          <button className="buttonSalvos">Buscar Pokemon</button>
        </Link>

        <Link to="/todos">
          <button className="buttonSalvos">Buscar todos Pokemon</button>
        </Link>
      </div>

    </header>
  );
}

export default Header;
