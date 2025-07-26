/*
Componente Reviews.jsx

Página que muestra todas las reseñas creadas por el usuario.
Al cargar, realiza una petición GET al back para obtener todas sus reseñas (mediante id del usuario).
Muestra un mensaje si hay un error o si el usuario aún no ha escrito reseñas.
Aparece un mensaje de carga mientras se cargan los datos.
Cada reseña incluye la portada del libro, título, autor y puntuación dada por el usuario. 

*/

import { useContext, useEffect, useState } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function Reviews(){

    //Obtener usuario desde el contexto
    let {usuario} = useContext(Contexto)

    //Estados locales para guardar reseñas y estado de carga
    let [reviewsUsuario, setReviewsUsuario] = useState([]);
    let [mensaje, setMensaje] = useState("")
    let [loading, setLoading] = useState(true)

    //Petición al back para obtener las reseñas del usuario una vez se entra en el componente
    useEffect(() => {
        setLoading(true) //se activa la carga
        setMensaje("")

        fetch(`https://gyobook-api.onrender.com/reviews/usuario/${usuario.id}`)
        .then(respuesta => respuesta.json())
        .then(data => {
            setReviewsUsuario(data) //guardar las reseñas
            setLoading(false) //para la carga
        })
        .catch(() => {
            setMensaje("No se pudieron cargar las reseñas, inténtalo más tarde 😪")
            setLoading(false) //para la carga
        })
    }, [])

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido" style={{ justifyContent: "flex-start" }}>
                        <h2 className="titulo-usuario">Reseñas de {usuario.usuario}</h2>

                        {mensaje && <p className="mensaje">{mensaje}</p>}

                        {loading && !mensaje && <p className="mensaje-cargando">Cargando reseñas...</p>}

                        {
                        !loading && reviewsUsuario.length == 0 ? <p>Aún no hay reseñas. ¡Empieza a explorar y a escribir! ✨</p> : 
                        <div className="lista-reviews-usuario">
                            {
                                !loading && reviewsUsuario.map(review => (
                                    <div key={review.id} className="review-usuario">
                                        <img
                                            src={review.url_portada}
                                            alt={`Portada de ${review.titulo}`}
                                            className="portada-mini"
                                        />
                                        <div className="info-review">
                                            <h3>{review.titulo}</h3>
                                            <p><strong>Autor:</strong> {review.autor}</p>
                                            <p><strong>Puntuación:</strong> {review.puntuacion} / 5 ⭐</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        }
                    </section>
                </section>
            </>
}