import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Contexto from "../Contexto"
import Navegacion from "./Navegacion"

export default function Libros(){

    let {token} = useContext(Contexto)
    let navigate = useNavigate()

    let [libros, setLibros] = useState([])
    let [mensaje, setMensaje] = useState("")

    useEffect(() => {
        fetch("http://localhost:4000/libros")
        .then(respuesta => respuesta.json())
        .then(libros => {
            setLibros(libros)
        })
        .catch(() => {
            setMensaje("No se pudieron cargar los libros, inténtalo más tarde 😪")
        })
    }, [])

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido libros-contenido">
                        <h2 className="titulo-libros">Explora libros</h2>
                        <div className="buscar-libros">
                            <form className="form-buscar">
                                <input type="text" placeholder="¿Buscas algo en concreto?" />
                                <input type="submit" value="Buscar" />
                            </form>
                        </div>
                        { //si no hay token no muestra el botón de añadir libro, por lo que sólo los usuarios pueden añadir fichas
                            token && (
                                <button className="addBook" onClick={() => {
                                navigate("/libros/crear")
                                }}>Añadir libro</button>
                            )
                        }
                        {mensaje && <p className="mensaje">{ mensaje }</p>}
                        <div className="libros">
                            <ul>
                            {
                                libros.length == 0 ? <li>Actualmente no hay libros en la base de datos :(</li> :
                                libros.map(({ id, titulo, autor, paginas, genero, url_portada }) => (
                                    <li key={id} className="tarjeta-libro" onClick={() => navigate(`/reviews/${id}`)}>
                                        <img src={"http://localhost:4000/" + url_portada} alt={`Portada de ${ titulo }`} className="portada-libro" />
                                        <div className="info-libro">
                                            <h3>{ titulo }</h3>
                                            <p><strong>Autor: </strong>{ autor }</p>
                                            <p><strong>Páginas: </strong>{ paginas }</p>
                                            <p><strong>Género: </strong>{ genero }</p>
                                        </div>
                                    </li>))
                            }
                        </ul>
                        </div>
                    </section>
                </section>
            </>
}