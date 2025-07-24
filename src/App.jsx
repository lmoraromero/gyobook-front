import { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Contexto from "./Contexto"
import "./style.css"

//Importar las páginas para el router
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Perfil from "./pages/Perfil"
import Libros from "./pages/Libros"
import CrearLibro from "./pages/CrearLibro"
import Reviews from "./pages/Reviews"
import ReviewsLibro from "./pages/ReviewsLibro"
import ReviewsCrear from './pages/ReviewsCrear'
import Error404 from "./pages/Error404"

const router = createBrowserRouter([
  {
    path : "/",
    element : <Inicio />
  },
  {
    path : "/login",
    element : <Login />,
  },
  {
    path : "/registro",
    element : <Registro />,
  },
  {
    path : "/perfil",
    element : <Perfil />,
  },
  {
    path : "/libros",
    element : <Libros />,
  },
  {
    path : "/libros/crear",
    element : <CrearLibro />,
  },
  {
    path : "/reviews",
    element : <Reviews />,
  },
  { 
    path: "/reviews/:id_libro", 
    element: <ReviewsLibro /> 
  },
  { 
    path: "/reviews/crear/:id_libro", 
    element: <ReviewsCrear /> 
  },
  {
    path : "*",
    element : <Error404 />,
  }
])

export default function App() {

  let [token, setToken] = useState("")
  let [usuario, setUsuario] = useState(null)
  let [libros, setLibros] = useState([])
  let [hasLibros, setHasLibros] = useState(false)

  //Cargar el token y usuario desde localstorage

  useEffect(() => {
    let tokenGuardado = localStorage.getItem("token")
    let usuarioGuardado = localStorage.getItem("usuario")

    if(tokenGuardado) setToken(tokenGuardado)
    if(usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado))
  }, [])


  return <Contexto.Provider value={{token, setToken, usuario, setUsuario, libros, setLibros, hasLibros, setHasLibros}}>
            <RouterProvider router={router} />
          </Contexto.Provider>
}

