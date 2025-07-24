import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function ReviewsLibro(){

    let {token} = useContext(Contexto)
    let navigate = useNavigate()

    let {id_libro} = useParams();
    let [libro, setLibro] = useState(null);
    let [reviewsLibro, setReviewsLibro] = useState([])
    let [loading, setLoading] = useState(true)
    let [mensaje, setMensaje] = useState("")

    useEffect(() => {
        setLoading(true)
        setMensaje("")
        
        fetch(`https://gyobook-api.onrender.com/libro/${id_libro}`)
        .then(respuesta => respuesta.json())
        .then(libroData => {
            setLibro(libroData[0]) //al traer un array hay que seleccionar el primero(aunque sea único)
            return fetch(`https://gyobook-api.onrender.com/reviews/${id_libro}`)
        })
        .then(respuesta => respuesta.json())
        .then(data =>{
            setReviewsLibro(data)
            setLoading(false)
        })
        .catch(() => {
            setMensaje("No se pudo cargar el libro, inténtalo más tarde 😪")
            setLoading(false)
        })
    }, [])

    let fecha = libro?.fecha_publicacion ? new Date(libro.fecha_publicacion).toLocaleDateString("es-ES") : "" //asegurarse de que está la fecha, crea un objeto js Date y usando .toLocaleDateString("es-ES"), hace que el formato sea legible DD//MM/AAAA

    //hacer la media para ver la punuación media del libro. 
    //.reduce() sirve para acumular un valor a partir de lso elementos de un array -> suma es el acumulador (por defecto inicia en 0) y review es cada una de las reseñas
    //.toFixed(2) convierte el resultado en un número con dos decimales
    let mediaPuntuacion = reviewsLibro.length > 0 ? (reviewsLibro.reduce((suma, review) => suma + parseFloat(review.puntuacion), 0) / reviewsLibro.length).toFixed(2) : null 

    return <>
        <section className="contenedor reviewslibro">
            <Navegacion />
            <section className="contenido">
                <div className="libro">
                    {mensaje && <p className="mensaje">{ mensaje }</p>}

                    {loading && !mensaje && <p className="mensaje-cargando">Cargando libro y reseñas...</p>}

                    {!loading && libro && (
                        <div className="libro-ficha">
                            <img 
                                src={"https://gyobook-api.onrender.com/" + libro.url_portada}
                                alt={`Portada del libro ${libro.titulo}`} 
                                className="portada" 
                            />
                            <div className="libro-informacion">
                                <h3>{libro.titulo}</h3>
                                <p><strong>Autor: </strong>{libro.autor}</p>
                                <p><strong>Género: </strong>{libro.genero}</p>
                                <p><strong>Fecha de publicación: </strong>{fecha}</p>
                                <p><strong>Páginas: </strong>{libro.paginas}</p>
                                <p><strong>Sinopsis: </strong>{libro.sinopsis}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="media">
                    {!loading && mediaPuntuacion && (
                    <div className="media-puntuacion">
                        <h2>Puntuación media: {mediaPuntuacion} / 5 ⭐</h2>
                    </div>
                    )}
                </div>
                <div className="reviews">
                    {
                        !loading && token && (
                            <button className="addReview" onClick={() => {
                                navigate(`/reviews/crear/${id_libro}`)
                            }}>Añadir reseña</button>
                        )
                    }
                    {!loading && reviewsLibro.length == 0 ? <p>Actualmente no hay reseñas</p> :
                    reviewsLibro.map(review => 
                        <div key={review.id} className="review">
                            <div className="cabecera">
                                <img src={review.perfil} alt={`Foto de perfil de ${review.nombre_usuario}`} className="review-foto" />
                                <h3>{ review.nombre_usuario }</h3>
                            </div>
                            <p className="puntuacion"><strong>Puntuación:</strong> { review.puntuacion }/5 ⭐</p>
                                <p>{ review.texto }</p>
                        </div>
                    ) }
                </div>
            </section>
        </section>
    </>
}