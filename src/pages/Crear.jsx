import { useNavigate} from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Navegacion from "./Navegacion"

export default function Crear(){

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="ficha">
                            <h2 className="titulo-ficha">Crear ficha del libro</h2>
                            <form className="form-ficha">
                                <label>
                                    Título:
                                    <input type="text" name="titulo" />
                                </label>

                                <label>
                                    Autor:
                                    <input type="text" name="autor" />
                                </label>

                                <label>
                                    Género:
                                    <input type="text" name="genero" />
                                </label>

                                <label>
                                    Fecha de publicacion:
                                    <input type="text" name="fecha_publicacion" />
                                </label>

                                <label>
                                    Número de páginas:
                                    <input type="text" name="paginas" />
                                </label>

                                <label>
                                    Sinopsis:
                                    <textarea name="sinopsis" rows="5" />
                                </label>

                                <label>
                                    Portada:
                                    <input type="file" name="portada" />
                                </label>

                                <input type="submit" value="Crear" />
                            </form>
                        </div>
                    </section>
                </section>
            </>
}