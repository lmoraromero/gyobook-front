/*
Componente Error404.jsx

Muestra una página de error 404 cuando el usuario navega a una ruta inexistente.
Incluye un enlace para volver a la página principal (Inicio.jsx)

*/

import { Link } from "react-router-dom"
import "./Error404.css"

export default function Error404(){
    return <>
                <section className="contenedor-error">
                    <h1>404</h1>
                    <h2>¡Ups! Parece que la página que buscas se ha perdido :(</h2>
                    <img src="/error.gif" alt="Error 404" />
                    <p>
                        <Link to="/">Esta ruta no lleva a ningún lado, mejor regresa al inicio y sigue leyendo</Link>
                    </p>
                </section>
            </>
}