/*
Componente CrearLibro.jsx

Permite a usuarios autenticados crear una nueva ficha de libro.
Incluye un formulario con los campos:
    - título
    - autor
    - género
    - fecha de publicación
    - número de páginas
    - sinopsis
    - portada (como imagen)

Antes de enviar el formulario valida que los campos estén completos y con el formato correcto.
Envía los datos al back mediante una petición POST con token JWT.
Si se ha creado correctamente, redirige a la página del libro (ReviewsLibro.jsx).
Muestra mensajes en caso de errores o datos no válidos.

*/

import { useNavigate} from "react-router-dom"
import { useState, useContext } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function CrearLibro(){

    //Se extrae el token y setHasLibros del contexto global para la autenticación y la recarga de los libros
    let {token, setHasLibros} = useContext(Contexto)

    //Para navegar entre rutas
    let navigate = useNavigate()

    //Declaración de estados locales para manejar los valores del formulario y mensajes
    let [mensaje, setMensaje] = useState("")
    let [titulo, setTitulo] = useState("")
    let [autor, setAutor] = useState("")
    let [genero, setGenero] = useState("")
    let [fecha, setFecha] = useState("")
    let [paginas, setPaginas] = useState("")
    let [sinopsis, setSinopsis] = useState("")
    let [portada, setPortada] = useState(null) //archivo de imagen seleccionado

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="ficha">
                            <h2 className="titulo-ficha">Crear ficha del libro</h2>
                            <p className="mensaje">{ mensaje }</p>
                            <form className="form-ficha" onSubmit={evento => {
                                evento.preventDefault()

                                //validación de los datos están completos  antes de enviar el formulario
                                if(!titulo.trim() || !autor.trim() || !genero.trim() || !fecha.trim() || !paginas.trim() || !sinopsis.trim() || !portada){
                                    setMensaje("🚨 Rellena todos los campos de la ficha.")
                                    return
                                }

                                //validación de que las máginas es un número entero mayor a 0
                                if(!Number.isInteger(Number(paginas)) || Number(paginas) <= 0){
                                    setMensaje("🚨 El número de páginas debe ser un número válido y mayor a 0.")
                                    return
                                }

                                //validación de que la fecha tenga formato AAA-MM-DD
                                let regexFecha = /^\d{4}-\d{2}-\d{2}$/
                                if(!regexFecha.test(fecha)){
                                    setMensaje("🚨 La fecha debe tener el formato AAAA-MM-DD")
                                    return
                                }

                                //crear objeto Formdata para enviar datos con imagen
                                let datos = new FormData()
                                datos.append("titulo", titulo)
                                datos.append("autor", autor)
                                datos.append("genero", genero)
                                datos.append("fecha_publicacion", fecha)
                                datos.append("paginas", paginas)
                                datos.append("sinopsis", sinopsis)
                                datos.append("portada", portada)

                                //enviar petición POST al back para crear el libro
                                fetch("https://gyobook-api.onrender.com/libro/nuevo", {
                                    method: "POST",
                                    body: datos,
                                    headers: {
                                        Authorization: "Bearer " + token,
                                    }
                                })
                                .then(respuesta => {
                                    if(respuesta.status == 201){
                                        return respuesta.json()
                                        .then(({id}) => {
                                            setHasLibros(false) //indica que la lista de libros se tiene que actualizar
                                            navigate(`/reviews/${id}`) //redirección a la página de la reseña del libro
                                        })
                                    } else if(respuesta.status == 400){
                                        setMensaje("🚨 Rellena todos los campos de la ficha.")
                                    } else if(respuesta.status == 422){
                                        setMensaje("🚨 Alguno de los datos no es válido.")
                                    } else{
                                        setMensaje("Error inesperado. Inténtalo más tarde")
                                    }
                                })
                                .catch(error => {
                                    setMensaje("Error al conectar con el servidor")
                                })
                            }}>

                                <label>
                                    Título:
                                    <input type="text" name="titulo" value={titulo}  onChange={ evento => setTitulo(evento.target.value) } />
                                </label>

                                <label>
                                    Autor:
                                    <input type="text" name="autor" value={autor}  onChange={ evento => setAutor(evento.target.value) } />
                                </label>

                                <label>
                                    Género:
                                    <input type="text" name="genero" value={genero}  onChange={ evento => setGenero(evento.target.value) } />
                                </label>

                                <label>
                                    Fecha de publicacion:
                                    <input type="text" name="fecha_publicacion" placeholder="AAAA-MM-DD" value={fecha}  onChange={ evento => setFecha(evento.target.value) } />
                                </label>

                                <label>
                                    Número de páginas:
                                    <input type="text" name="paginas" value={paginas}  onChange={ evento => setPaginas(evento.target.value) } />
                                </label>

                                <label>
                                    Sinopsis:
                                    <textarea name="sinopsis" rows="5" value={sinopsis}  onChange={ evento => setSinopsis(evento.target.value) } />
                                </label>

                                <label>
                                    Portada:
                                    <input type="file" name="portada" onChange={ evento => setPortada(evento.target.files[0]) } />
                                </label>

                                <input type="submit" value="Crear" />
                            </form>
                        </div>
                    </section>
                </section>
            </>
}