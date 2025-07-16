import { Navigate} from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Navegacion from "./Navegacion"

export default function Libros(){

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        
                    </section>
                </section>
            </>
}