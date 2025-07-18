import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function ReviewsLibro(){

    let {token} = useContext(Contexto)
    let navigate = useNavigate()

    let {id_libro} = useParams();
    let [libro, setLibro] = useState(null);
    let [mensaje, setMensaje] = useState("")

    useEffect(() => {
        fetch(`http://localhost:4000/libro/${id_libro}`)
        .then(respuesta => respuesta.json())
        .then(libroData => {
            setLibro(libroData)
        })
        .catch(() => {
            setMensaje("No se pudo cargar el libro, inténtalo más tarde 😪")
        })
    }, [])

    return <>
        <section className="contenedor">
            <Navegacion />
            <section className="contenido">
                <div className="libro">
                    {mensaje && <p className="mensaje">{ mensaje }</p>}
                    {libro && (
                        <div className="libro-ficha">
                            <img 
                                src={libro.url_portada ? "http://localhost:4000/" + libro.url_portada : ""}
                                alt={`Portada del libro ${libro.titulo}`} 
                                className="portada" 
                            />
                            <div className="libro-informacion">
                                <h3>{libro.titulo}</h3>
                                <p><strong>Autor: </strong>{libro.autor}</p>
                                <p><strong>Género: </strong>{libro.genero}</p>
                                <p><strong>Fecha de publicación: </strong>{libro.fecha_publicacion.split('T')[0]}</p>
                                <p><strong>Páginas: </strong>{libro.paginas}</p>
                                <p><strong>Sinopsis: </strong>{libro.sinopsis}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="separador"></div>
                <div className="reviews">
                    {
                        token && (
                            <button className="addReview" onClick={() => {
                                navigate("/reviews/crear")
                            }}>Añadir reseña</button>
                        )
                    }
                    Aquí van las reseñas
                </div>
            </section>
        </section>
    </>
}