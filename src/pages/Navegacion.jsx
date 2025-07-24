import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import Contexto from "../Contexto"

export default function Navegacion() {
    let {token} = useContext(Contexto)
    let [menuAbierto, setMenuAbierto] = useState(false)

    return <>
        <button className="hamburguesa" onClick={() => {
        setMenuAbierto(!menuAbierto)
        }}>
        &#9776;
        </button>

        <nav className={menuAbierto ? "navegacion activo" : "navegacion"} >
            <img src="/Gyobook.png" alt="Gyobook logo" className="logo" />
        <ul>
            <li><Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
            {
                token ? 
                <>
                <li><Link to="/perfil" onClick={() => setMenuAbierto(false)}>Perfil</Link></li>
                <li><Link to="/reviews" onClick={() => setMenuAbierto(false)}>Mis Reseñas</Link></li>
                </>
                : <li><Link to="/login" onClick={() => setMenuAbierto(false)}>Login</Link></li>
            }
            <li><Link to="/libros" onClick={() => setMenuAbierto(false)}>Explora</Link></li>
        </ul>
        </nav>
    </>
}
