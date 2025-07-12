import { Link } from "react-router-dom"
import { useContext } from "react"
import Contexto from "../Contexto"

export default function Navegacion() {
    let {token} = useContext(Contexto)

    return <>
        <nav className="navegacion">
            <img src="/Gyobook.png" alt="Gyobook logo" className="logo" />
        <ul>
            <li><Link to="/">Inicio</Link></li>
            {
                token ? 
                <>
                <li><Link to="/perfil">Perfil</Link></li>
                <li><Link to="/reviews">Mis Reseñas</Link></li>
                </>
                : <li><Link to="/login">Login</Link></li>
            }
            <li><Link to="/libros">Explora</Link></li>
        </ul>
        </nav>
    </>
}
