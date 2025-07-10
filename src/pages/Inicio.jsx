import Navegacion from "./Navegacion";


export default function Inicio(){
    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="presentacion">
                        <h1>¡Bienvenide a Gyobook! 🥟</h1>
                        <p>Aquí va una presentación de la web. ¿Qué es? ¿De donde viene la idea?</p>
                        </div>
                        <div className="buscar">
                            <p>Aquí irá un formulario de búsqueda de libros por nombre, autor, género... etc</p>
                        </div>
                        <div className="galeria">
                            <p>Aquí galería de portadas</p>
                        </div>
                    </section>
                </section>
            </>
}