/*
Componente Login.jsx

Página para que los usuarios puedan iniciar sesión.
Contiene un formulario con inputs para el usuario y la contraseña. 
Al enviar el formulario, se hace una petición POST a la API para autenticar.
Según la respuesta, guarda el token y datos de usuario en contexto global y redirige a la página de inicio (Inicio.jsx)
Muestra mensajes de error para usuario no encontrado o contraseña incorrecta.
Incluye también un enlace para ir a la página de registro (Registro.jsx)

*/
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Navegacion from "./Navegacion";
import Contexto from "../Contexto"

export default function Login(){

    let navigate = useNavigate()

    //Obtiene token y usuario del contexto global
    let { setToken, setUsuario } = useContext(Contexto)

    //Estados locales
    let [inputUsuario, setInputUsuario] = useState("")
    let [inputPassword, setInputPassword] = useState("")
    let [mensaje, setMensaje] = useState("")

    return <>
            <section className="contenedor">
                <Navegacion />
                <section className="contenido">
                    <h1 className="titulo-form">¿De vuelta? 👀 ¡Entra y sigue compartiendo tus lecturas! ✨</h1>
                    <form className="formulario" onSubmit={evento => {
                        evento.preventDefault()
                        
                        //Petición POST para autenticar al usuario
                        fetch("https://gyobook-api.onrender.com/login", {
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
                                    .then( ({token, id, usuario, perfil}) => {
                                        setToken(token) //guardar el token en el contexto
                                        setUsuario({ id, usuario, perfil }) //guardar todo el usuario en el contexto
                                        navigate("/") //redirige a inicio
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
                    <p className="texto">
                        ¿Aún no tienes cuenta? <Link to="/registro">¡Puedes registrarte aquí!</Link> 
                    </p>
                </section>
            </section>
            </>
}