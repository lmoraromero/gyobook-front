import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Navegacion from "./Navegacion"

export default function Libros(){

    let navigate = useNavigate()

    let [libros, setLibros] = useState([])

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
                        <button className="addBook" onClick={() => {
                            navigate("/libros/crear")
                        }}>Añadir libro</button>
                        <div className="libros">
                            <ul>
                            {
                                libros.length == 0 ? <li>Actualmente no hay libros en la base de datos :(</li> :
                                libros.map(({id}) => <li key={id}>libro</li>)
                            }
                        </ul>
                        </div>
                    </section>
                </section>
            </>
}