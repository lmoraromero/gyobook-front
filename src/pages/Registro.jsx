import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Navegacion from "./Navegacion";
import Contexto from "../Contexto"

export default function Registro(){

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
                        
                        fetch("http://localhost:4000/registro", {
                            method : "POST",
                            body : JSON.stringify({
                                usuario : inputUsuario,
                                password : inputPassword
                            }),
                            headers : {
                                "Content-type" : "application/json"
                            }
                        })
                        .then(respuesta => {
                            if(respuesta.status != 201){
                                if(respuesta.status == 400){
                                    setMensaje("Rellena todos los campos")
                                }else{
                                    setMensaje("Error en la conexión. inténtalo más tarde.")
                                }
                                return 
                            }
                            return respuesta.json()
                            
                        })
                        .then(({token}) => {
                            setToken(token)
                            navigate("/")
                        })
                    }}>
                        <input type="text" placeholder="Usuario" value={inputUsuario} onChange={evento => setInputUsuario(evento.target.value)} />
                        <input type="password" placeholder="Contraseña" value={inputPassword} onChange={evento => setInputPassword(evento.target.value)} />
                        <input type="submit" value="Crear cuenta" />
                    </form>
                    <p className="mensaje">{ mensaje }</p>
                    <p>
                        ¿Ya tienes cuenta? <Link to="/login">¡Puedes iniciar sesión aquí!</Link> 
                    </p>
                </section>
            </section>
            </>
}