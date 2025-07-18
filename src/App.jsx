import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Contexto from "./Contexto"
import "./style.css"

//Importar las páginas para el router
import Inicio from "./pages/Inicio"
import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Perfil from "./pages/Perfil"
import Libros from "./pages/Libros"
import Crear from "./pages/Crear"
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
    element : <Crear />,
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
    path: "/reviews/crear", 
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

  return <Contexto.Provider value={{token, setToken, usuario, setUsuario}}>
            <RouterProvider router={router} />
          </Contexto.Provider>
}

