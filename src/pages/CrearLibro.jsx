import { useNavigate} from "react-router-dom"
import { useState, useContext } from "react"
import Navegacion from "./Navegacion"
import Contexto from "../Contexto"

export default function CrearLibro(){

    let {token} = useContext(Contexto)
    let navigate = useNavigate()

    let [mensaje, setMensaje] = useState("")
    let [titulo, setTitulo] = useState("")
    let [autor, setAutor] = useState("")
    let [genero, setGenero] = useState("")
    let [fecha, setFecha] = useState("")
    let [paginas, setPaginas] = useState("")
    let [sinopsis, setSinopsis] = useState("")
    let [portada, setPortada] = useState(null)

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

                                //FormData

                                let datos = new FormData()
                                datos.append("titulo", titulo)
                                datos.append("autor", autor)
                                datos.append("genero", genero)
                                datos.append("fecha_publicacion", fecha)
                                datos.append("paginas", paginas)
                                datos.append("sinopsis", sinopsis)
                                datos.append("portada", portada)

                                //fetch
                                fetch("http://localhost:4000/libro/nuevo", {
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
                                            navigate(`/reviews/${id}`)
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