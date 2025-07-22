import { useContext, useEffect, useState } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function Reviews(){

    let {usuario} = useContext(Contexto)

    let [reviews, setReviews] = useState([])
    let [mensaje, setMensaje] = useState("")

    useEffect(() => {
        fetch(`http://localhost:4000/reviews/usuario/${usuario.id}`)
        .then(respuesta => respuesta.json())
        .then(data => {
            setReviews(data)
        })
        .catch(() => {
            setMensaje("No se pudieron cargar las reseñas, inténtalo más tarde 😪")
        })
    }, [])

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido" style={{ justifyContent: "flex-start" }}>
                        <h2 className="titulo-usuario">Reseñas de {usuario.usuario}</h2>

                        {mensaje && <p className="mensaje">{mensaje}</p>}

                        {
                        reviews.length == 0 ? <p>Aún no hay reseñas. ¡Empieza a explorar y a escribir! ✨</p> : 
                        <div className="lista-reviews-usuario">
                            {
                                reviews.map(review => (
                                    <div key={review.id} className="review-usuario">
                                        <img
                                            src={`http://localhost:4000/${review.url_portada}`}
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