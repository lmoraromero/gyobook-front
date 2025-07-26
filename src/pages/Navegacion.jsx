/*
Componente Navegacion.jsx

Barra de navegación proncipal de la app.
Muestra enlaces diferentes según el usuario está conectado (con el token) o no.
Los enlaces son: Inicio, Perfil, Mis Reseñas (solo si logueado), Login (si no logueado) y Explora.
Contiene un menú tipo hamburguesa que permite mostrar/ocultar el menú en el diseño responsive en móviles. Al hacer click en cualquier enlace, el menúhamburguesa se cerrará automáticamente.
Incluye el logo de Gyobook.

*/

import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import Contexto from "../Contexto"

export default function Navegacion() {

    //Obtener el token de contexto para ver si el usuario está logueado
    let {token} = useContext(Contexto)

    //Estado local para controlar si el menú hamburguesa está abierto o no
    let [menuAbierto, setMenuAbierto] = useState(false)

    return <>
        <button className="hamburguesa" onClick={() => {
        setMenuAbierto(!menuAbierto) //alternar el estado
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
