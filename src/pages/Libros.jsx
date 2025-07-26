/*
Componente Libros.jsx

Página para explorar la lista de todos los libros disponibles en la BDD.
Permite buscar libros usando un texto de búsqueda que consulta a la API.
Muestra un listado con las portadas y datos principales de cada libro.
Sólo los usuarios autenticados (es decir, que estén logueados) pueden añadir nuevos libros y redirige a la creación de ficha del libro (Crearlibro.jsx).
Gestiona estados para búsqueda, mensajes de error y carga inicial del libros. 

*/

import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Contexto from "../Contexto"
import Navegacion from "./Navegacion"

export default function Libros(){

    //Extrae el token y estado global de libros desde el contexto
    let {token, libros, setLibros, hasLibros, setHasLibros} = useContext(Contexto)
    let navigate = useNavigate()

    //Declaración de estados locales para libros filtrados en la búsqueda, el modo búsqueda, texto y mensajes
    let [librosBuscados, setLibrosBuscados] = useState([]) 
    let [buscando, setBuscando] = useState(false)
    let [texto, setTexto] = useState("")
    let [mensaje, setMensaje] = useState("")

    //carga inicial de libros si aún no están cargados
    useEffect(() => {
        if(!hasLibros){
            fetch("https://gyobook-api.onrender.com/libros")
            .then(respuesta => respuesta.json())
            .then(libros => {
                setLibros(libros)
                setHasLibros(true)
            })
            .catch(() => {
                setMensaje("No se pudieron cargar los libros, inténtalo más tarde 😪")
            })
        }
    }, [])

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido libros-contenido">
                        <h2 className="titulo-libros">Explora libros</h2>
                        <div className="buscar-libros">
                            <form className="form-buscar" onSubmit={ evento => {
                                evento.preventDefault()

                                //si el texto está avcío, sale del modo búsqueda y no trae nada
                                if(!texto.trim()){
                                    setBuscando(false)
                                    setLibrosBuscados([])
                                    return
                                }
                                
                                //Parámetros para la consulta
                                let params = new URLSearchParams({ texto })

                                //Buscar los libros en la API con el texto de búsqueda como argumento
                                fetch(`https://gyobook-api.onrender.com/busqueda?${params.toString()}`)
                                .then(respuesta => respuesta.json())
                                .then(resultados => {
                                    if(resultados.length == 0){
                                        //Si no hay resultados limpia la búsqueda y no trae nada
                                        setTexto("")
                                        setLibrosBuscados([])
                                        setBuscando(false)
                                    }else{
                                        //Si hay resultados se actualizan los libros buscados y se activa el modo búsqueda
                                        setLibrosBuscados([])
                                        setLibrosBuscados(resultados)
                                        setBuscando(true)
                                    }
                                })
                                .catch(() => {
                                    setMensaje("No se pudieron cargar los libros, inténtalo más tarde 😪")
                                })
                            }} >
                                <input type="text" placeholder="¿No encuentras lo que buscas? Explora y déjate sorprender ✨" value={texto}  onChange={ evento => setTexto(evento.target.value) } />
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
                            {//Si buscando es true, se hará map de librosBuscados. Si no, se hará de libros. Si no hay libros, se muestra un mensaje
                                (buscando ? librosBuscados : libros).length == 0 ? 
                                <li>Actualmente no hay libros en la base de datos :(</li> :
                                (buscando ? librosBuscados : libros).map(({ id, titulo, autor, paginas, genero, url_portada }) => (
                                    <li key={id} className="tarjeta-libro" onClick={() => navigate(`/reviews/${id}`)}>
                                        <img src={url_portada} alt={`Portada de ${ titulo }`} className="portada-libro" />
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