import { Link } from "react-router-dom";
import { useContext } from "react";
import Contexto from "../Contexto"

export default function Navegacion() {
    let {token} = useContext(Contexto)

    return (
        <nav>
        <ul>
            <li><Link to="/">Inicio</Link></li>
            {
                token ? <li><Link to="/perfil">Perfil</Link></li>
                : <li><Link to="/login">Login</Link></li>
            }
            <li><Link to="/libros">Libros</Link></li>
            <li><Link to="/reviews">Reseñas</Link></li>
        </ul>
        </nav>
    );
}
