import React from 'react'
import {Link} from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Busqueda from './Busqueda';
import useAuth from '../hooks/useAuth';
const Header = () => {
    const {handleBuscador, cerrarSesionProyectos} = useProyectos();
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () =>{ 
        cerrarSesionProyectos();
        cerrarSesionAuth();
        localStorage.removeItem('token');
    }
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between md:flex-row flex flex-col'>
            <h2 className='text-4xl text-sky-500 font-black text-center mb-5 md:mb-0'>UpTask</h2>
            <button
                type='button'
                className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font bold'
                onClick={handleBuscador}
            >
                Buscar Proyectos
            </button>
            <div className='flex items-center gap-4'>
                <Link to={'/proyectos'} 
                    className="font-bold uppercase"
                >Proyectos</Link>

                <button
                    type='button'
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font bold'
                    onClick={handleCerrarSesion}
                >
                    Cerrar Sesión
                </button>

                <Busqueda/>
            </div>

            
        </div>

    </header>
  )
}

export default Header