import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Contexto from "../Contexto"
import Navegacion from "./Navegacion"

export default function Libros(){

    let {token, libros, setLibros, hasLibros, setHasLibros} = useContext(Contexto)
    let navigate = useNavigate()

    let [librosBuscados, setLibrosBuscados] = useState([]) // libros para búsqueda local
    let [buscando, setBuscando] = useState(false)
    let [texto, setTexto] = useState("")
    let [mensaje, setMensaje] = useState("")

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

                                if(!texto.trim()){
                                    setBuscando(false)
                                    setLibrosBuscados([])
                                    return
                                }
                                
                                let params = new URLSearchParams({ texto })

                                fetch(`https://gyobook-api.onrender.com/busqueda?${params.toString()}`)
                                .then(respuesta => respuesta.json())
                                .then(resultados => {
                                    if(resultados.length == 0){
                                        setTexto("")
                                        setLibrosBuscados([])
                                        setBuscando(false)
                                    }else{
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
                            {
                                (buscando ? librosBuscados : libros).length == 0 ? 
                                <li>Actualmente no hay libros en la base de datos :(</li> :
                                (buscando ? librosBuscados : libros).map(({ id, titulo, autor, paginas, genero, url_portada }) => (
                                    <li key={id} className="tarjeta-libro" onClick={() => navigate(`/reviews/${id}`)}>
                                        <img src={"https://gyobook-api.onrender.com/" + url_portada} alt={`Portada de ${ titulo }`} className="portada-libro" />
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