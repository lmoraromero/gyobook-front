import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"


export default function Inicio(){

    let {libros, setLibros, hasLibros, setHasLibros} = useContext(Contexto)

    let [mensaje, setMensaje] = useState("")


    useEffect(() => {
        if(!hasLibros){
            fetch("http://localhost:4000/libros")
            .then(respuesta => respuesta.json())
            .then(libros => {
                setLibros(libros)
                setHasLibros(true)
            })
            .catch(error => {
                setMensaje("Error al conectar con el servidor")
            })
        }
    }, [])

    let ultimosLibros = libros.slice(0, 10);

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido" style={{ alignItems: 'center' }}> 
                        <div className="presentacion">
                        <h1>¡Bienvenidx a Gyobook! 🥟</h1>
                        <p>Aquí encontrarás un espacio para descubrir libros, leer reseñas y, sobretodo, compartir las tuyas con la comunidad 💫</p>
                        </div>
                        <div className="galeria">
                            <h3 className="galeria-titulo">¡Descubre las últimas reseñas de nuestros usuarios!</h3>
                            {mensaje && <p className="mensaje">{ mensaje }</p>}
                            <div className="galeria-portadas">
                                {
                                    [...ultimosLibros, ...ultimosLibros].map((libro, index) => (
                                        <Link key={`libro-${index}-${libro.id}`} to={`/reviews/${libro.id}`} className="portada-link" > 
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