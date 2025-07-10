import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Navegacion from "./Navegacion";
import Contexto from "../Contexto"

export default function Login(){

    let navigate = useNavigate()
    let { setToken } = useContext(Contexto)

    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [mensaje, setMensaje] = useState("")

    return <>
            <section className="contenedor">
                <Navegacion />
                <section className="contenido">
                    <form onSubmit={evento => {
                        evento.preventDefault()
                        
                        fetch("http://localhost:4000/login", {
                            method: "POST", 
                            body : JSON.stringify({
                                usuario : inputUsuario,
                                password : inputPassword
                            }),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        })
                        .then(respuesta => {
                            if(respuesta.status == 200){
                                return respuesta.json()
                                    .then( ({token}) => {
                                        setToken(token)
                                        navigate("/")
                                    })
                            }else if(respuesta.status == 401){
                                setMensaje("Usuario no encontrado")
                            }else if(respuesta.status == 403){
                                setMensaje("Contraseña incorrecta")
                            }else{
                                setMensaje("Error inesperado. Inténtalo más tarde")
                            }
                        })

                    }}>
                        <input type="text" placeholder="Usuario" value={inputUsuario} onChange={evento => setInputUsuario(evento.target.value)} />
                        <input type="password" placeholder="Contraseña" value={inputPassword} onChange={evento => setInputPassword(evento.target.value)} />
                        <input type="submit" value="Entrar" />
                    </form>
                    <p className="mensaje">{ mensaje }</p>
                    <p>
                        ¿Aún no tienes cuenta? <Link to="/registro">¡Puedes registrarte aquí!</Link> 
                    </p>
                </section>
            </section>
            </>
}