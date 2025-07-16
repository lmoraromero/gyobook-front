import Navegacion from "./Navegacion";


export default function Inicio(){
    return <>
                <section className="contenedor">
                    <Navegacion />
                    <section className="contenido">
                        <div className="presentacion">
                        <h1>¡Bienvenidx a Gyobook! 🥟</h1>
                        <p>Aquí encontrarás un espacio para descubrir libros, leer reseñas y, sobretodo, compartir las tuyas con la comunidad 💫</p>
                        </div>
                        <div className="buscar">
                            <form className="form-buscar">
                                <input type="text" placeholder="¿No encuentras lo que buscas? Explora y déjate sorprender ✨" />
                                <input type="submit" value="Buscar" />
                            </form>
                        </div>
                        <div className="galeria">
                            <h3 className="galeria-titulo">¡Descubre las últimas reseñas de nuestros usuarios!</h3>
                            <p>Aquí galería de portadas</p>
                        </div>
                    </section>
                </section>
            </>
}