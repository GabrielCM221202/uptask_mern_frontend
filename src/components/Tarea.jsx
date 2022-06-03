import React from "react";
import formatearFecha from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
  const admin = useAdmin();
  const { nombre, descripcion, prioridad, fechaEntrega, _id, estado } = tarea;
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm capitalize">
          Entrega: {formatearFecha(fechaEntrega)}
        </p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
        {estado && <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completado por: {tarea.completado.nombre}</p>}
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        {admin && (
          <button
            className="bg-indigo-700 px-4 py-3 rounded-lg text-sm text-white font-bold uppercase"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}
        {/* MARCAR COMO COMPLETA E INCOMPLETA */}

        <button 
        onClick={() => completarTarea(_id)}
        className={`${estado ? 'bg-sky-500' : 'bg-slate-500'} px-4 py-3 rounded-lg text-sm text-white font-bold uppercase`}>
          {estado ? 'Completa' : 'Incompleta'}
          
        </button>


        {admin && (
          <button
            className="bg-red-600 px-4 py-3 rounded-lg text-sm text-white font-bold uppercase"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
