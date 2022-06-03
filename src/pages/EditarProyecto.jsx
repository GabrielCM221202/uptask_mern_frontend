import { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {
  const { id } = useParams();
  const { proyecto, cargando, obtenerProyecto , eliminarProyecto} = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  const { nombre } = proyecto;
  if (cargando) return "Cargando...";

  const handleEliminar = () => {
      if(!confirm('¿ Deseas Eliminar este proyecto ? ')){
        return;
      }

     eliminarProyecto(id) 
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">Editar Proyecto : {nombre}</h1>
        <div>
          <button onClick={handleEliminar} className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer uppercase font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </button>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto />
      </div>
    </>
  );
};

export default EditarProyecto;
