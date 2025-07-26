/*
Componente ReviewsCrear.jsx

Permite al usuario crear una nueva reseña para un libro en concreto.
Muestra el formualrio con puntuación (incluyendo decimales) y el texto. Envía la reseña a la API mediante POST.
Si es exitosa al piublicación, se redirige a la página de reseñas del libro (ReviewsLibro.jsx)

*/

import { useNavigate, useParams } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function ReviewsCrear(){

    //Obtener el token y usuario del contexto
    let {token, usuario} = useContext(Contexto)
    let navigate = useNavigate()

    //Extrae el id del libro de la url
    let {id_libro} = useParams()

    //Estados locales
    let [libro, setLibro] = useState(null)
    let [puntuacion, setPuntuacion] = useState("1")
    let [decimal, setDecimal] = useState("00")
    let [texto, setTexto] = useState("")
    let [mensaje, setMensaje] = useState("")

    //Fetch de los datos del libro
    useEffect(() => {
        fetch(`https://gyobook-api.onrender.com/libro/${id_libro}`)
        .then(respuesta => respuesta.json())
        .then(libroData => {
            setLibro(libroData[0]) //guarda datos del libro
        })
        .catch(() => {
            setMensaje("No se pudo cargar el libro, inténtalo más tarde 😪")
        })
    }, [])


    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="review-box">
                            <h2 className="titulo-ficha">Reseña para {libro ? libro.titulo : "..."}</h2>
                            <p className="mensaje">{mensaje}</p>
                            <form className="review-form" onSubmit={evento => {
                                evento.preventDefault()

                                //combinar la puntuación como número decimal (float)
                                let puntuacionFinal = parseFloat(`${puntuacion}.${decimal}`) //transformar en float la puntuación 

                                //envía la reseña a la API mediante POST
                                fetch("https://gyobook-api.onrender.com/reviews/nueva", {
                                    method : "POST",
                                    body : JSON.stringify({
                                        puntuacion : puntuacionFinal,
                                        id_usuario : usuario.id,
                                        id_libro : id_libro,
                                        texto : texto
                                    }),
                                    headers : {
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${token}`
                                    }
                                })
                                .then(respuesta => {
                                    if(respuesta.status == 201){
                                        navigate(`/reviews/${id_libro}`) //redirección al libro
                                    }else{
                                        setMensaje("Error inesperado. Inténtalo más tarde")
                                    }
                                })
                                .catch((error) => {
                                    setMensaje("Error al conectar con el servidor");
                                });
                            }}>
                                <div className="review-rating">
                                    <label>
                                    Puntuación: 
                                    <select className="rating-select" value={puntuacion} onChange={evento => setPuntuacion(evento.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                    . 
                                    <select className="rating-select" value={decimal} onChange={evento => setDecimal(evento.target.value)}>
                                        <option value="00">00</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="75">75</option>
                                    </select>
                                    estrellas ⭐
                                </label>
                                </div>
                                <textarea className="review-textarea" rows={6} placeholder="Escribe aquí tu reseña" value={texto} onChange={evento => setTexto(evento.target.value)}></textarea>
                                <input className="review-submit" type="submit" value="Publicar" />
                            </form>
                        </div>
                    </section>
                </section>
            </>
}