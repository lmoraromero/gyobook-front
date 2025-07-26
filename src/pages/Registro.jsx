/*
Componente Registro.jsx

Permite la creación de nuevos usuarios.
Incluye un formulario que envía el usuario y la contraseña al back.
Si se ha registrado bien el usuario, se guarda el token y los datos del usuario en el contexto y redirige a la página de inicio (Inicio.jsx)
También hay un enlace que redirige al login (Login.jsx)

*/

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Navegacion from "./Navegacion";
import Contexto from "../Contexto"

export default function Registro(){

    let navigate = useNavigate()

    //Funciones para guardar el token y el usuario
    let { setToken, setUsuario } = useContext(Contexto)

    //Estados locales
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [mensaje, setMensaje] = useState("")

    return <>
            <section className="contenedor">
                <Navegacion />
                <section className="contenido">
                    <h1 className="titulo-form">¿Nuevx por aquí? ¡Crea tu cuenta en un segundo! ✨</h1>
                    <form className="formulario" onSubmit={evento => {
                        evento.preventDefault()
                        
                        //Enviar datos al back mediante método POST
                        fetch("https://gyobook-api.onrender.com/registro", {
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
                        .then(datos => {
                            if (!datos) return;

                            let {token, usuario} = datos

                            setToken(token) //guardar token
                            setUsuario(usuario) //guardar usuario
                            navigate("/") //redirección
                        })
                    }}>
                        <input type="text" placeholder="Usuario" value={inputUsuario} onChange={evento => setInputUsuario(evento.target.value)} />
                        <input type="password" placeholder="Contraseña" value={inputPassword} onChange={evento => setInputPassword(evento.target.value)} />
                        <input type="submit" value="Crear cuenta" />
                    </form>
                    <p className="mensaje">{ mensaje }</p>
                    <p className="texto">
                        ¿Ya tienes cuenta? <Link to="/login">¡Puedes iniciar sesión aquí!</Link> 
                    </p>
                </section>
            </section>
            </>
}