/*
Componente Perfil.jsx

Página de perfil del usuario.
Muestra un saludo personalizado, la imagen de perfil y un botón para cerrar sesión.
Al cerrar sesión, se limpian el token y el usuario del contexto, redirigiendo a la página de inicio (Inicio.jsx)

*/

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function Perfil(){

    //Obtener datos y funciones del contexto
    let {usuario, setToken, setUsuario} = useContext(Contexto)
    let navigate = useNavigate()

    //Si aún no hay datos del usuario, se muestra un mensaje de carga
    if (!usuario) {
    return <p className="contenido">Cargando perfil...</p>;
    }

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <h1 className="saludo">¡Hola, { usuario.usuario }!</h1>
                        <img src={usuario.perfil} alt={`Foto de perfil de ${usuario.usuario}`} className="picture" />
                        <button className="logout" onClick={() => {
                            setToken("") //limpiar token 
                            setUsuario(null) //limpiar usuario
                            navigate("/") //redirección
                        }}>Cerrar sesión</button>
                    </section>
                </section>
            </>
}