import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Navegacion from "./Navegacion"


export default function Inicio(){

    let [ultimosLibros, setUltimosLibros] = useState([])
    let [indice, setIndice] = useState(0)
    let [mensaje, setMensaje] = useState("")
    let librosPagina = 5

    useEffect(() => {
        fetch("http://localhost:4000/libros")
        .then(respuesta => respuesta.json())
        .then(libros => {
            let ultimos = libros.slice(0,10)
            setUltimosLibros(ultimos)
        })
        .catch(error => {
            setMensaje("Error al conectar con el servidor")
        })
    }, [])

    let visibles = ultimosLibros.slice(indice, indice + librosPagina)


    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="presentacion">
                        <h1>¡Bienvenidx a Gyobook! 🥟</h1>
                        <p>Aquí encontrarás un espacio para descubrir libros, leer reseñas y, sobretodo, compartir las tuyas con la comunidad 💫</p>
                        </div>
                        <div className="buscar">
                            <form className="form-buscar">
                                <input type="text" placeholder="¿No encuentras lo que buscas? Explora y déjate sorprender ✨" />
                                <input type="submit" value="Buscar" />
                            </form>
                        </div>
                        <div className="galeria">
                            <h3 className="galeria-titulo">¡Descubre las últimas reseñas de nuestros usuarios!</h3>
                            {mensaje && <p className="mensaje">{ mensaje }</p>}
                            <div className="galeria-portadas">
                                {
                                    ultimosLibros.map(libro => (
                                        <Link key={libro.id} to={`/reviews/${libro.id}`} className="portada-link"> 
                                        <img src={"http://localhost:4000/" + libro.url_portada} alt={`Portada de ${libro.titulo}`} className="portada-libro" />
                                        </Link>
                                    ))
                                }
                            </div>

                        </div>
                    </section>
                </section>
            </>
}