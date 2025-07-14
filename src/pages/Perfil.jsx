import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function Perfil(){

    let {usuario, setToken, setUsuario} = useContext(Contexto)
    let navigate = useNavigate()

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
                            setToken("")
                            setUsuario(null)
                            navigate("/")
                        }}>Cerrar sesión</button>
                    </section>
                </section>
            </>
}