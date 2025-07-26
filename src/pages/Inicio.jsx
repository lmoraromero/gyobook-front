/*
Componente Inicio.jsx

Página principal de la App.
Muesra una presentación de la web, una galería con las últimas 10 portadas de libros creados.
También obtiene la lista de ñibros desde la API y actualiza el estado global usando el contexto.
maneja errores en al conexión con el servidor. 

*/

import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"


export default function Inicio(){

    //Extrae los libros y el estado del contexto para saber si están caragdos
    let {libros, setLibros, hasLibros, setHasLibros} = useContext(Contexto)

    let [mensaje, setMensaje] = useState("")

    //cargar los libros si no están caragdos aún
    useEffect(() => {
        if(!hasLibros){
            fetch("https://gyobook-api.onrender.com/libros")
            .then(respuesta => respuesta.json())
            .then(libros => {
                setLibros(libros) //se guardan los libros en el contexto
                setHasLibros(true) //guarda que los libros se han cargado
            })
            .catch(error => {
                setMensaje("Error al conectar con el servidor")
            })
        }
    }, [])

    //Guarda los primeros 10 libros para la aglería
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
                                        <img src={libro.url_portada} alt={`Portada de ${libro.titulo}`} className="portada-libro" />
                                        </Link>
                                    ))
                                }
                            </div>

                        </div>
                    </section>
                </section>
            </>
}