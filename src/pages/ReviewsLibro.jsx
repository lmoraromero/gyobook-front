import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import Navegacion from "./Navegacion"

export default function ReviewsLibro(){

    let {id_libro} = useParams();

    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <h1>Página del libro con id {id_libro}</h1>
                    </section>
                </section>
            </>
}