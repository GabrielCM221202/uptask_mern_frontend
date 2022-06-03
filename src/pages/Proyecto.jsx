import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { Link } from "react-router-dom";
import ModalFormularioTarea from "../components/ModalFormularioTarea";
import ModalEliminarTarea from "../components/ModalEliminarTarea";
import Tarea from "../components/Tarea";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalEliminarColaborador from "../components/ModalEliminarColaborador";
import useAdmin from "../hooks/useAdmin";
import io from "socket.io-client";

let socket;
const Proyecto = () => {
  const admin = useAdmin();
  const { id } = useParams();
  const {
    obtenerProyecto,
    proyecto,
    cargando,
    handleModalFormularioTarea,
    alerta,
    submitTareasProyecto,
    eliminarTareaProyecto,
    actualizarTareaProyecto,
    cambiarEstadoTareaProyecto
  } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("abrir proyecto", id);
  }, []);

  useEffect(() => {
    socket.on("tarea agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        submitTareasProyecto(tareaNueva);
      }
    });

    socket.on("tarea eliminada" , tareaEliminada => {
      if(tareaEliminada.proyecto  === proyecto._id){
        eliminarTareaProyecto(tareaEliminada)
      }
    })

    socket.on("tarea actualizada" , tareaActualizada => {
      if(tareaActualizada.proyecto._id  === proyecto._id){
        actualizarTareaProyecto(tareaActualizada)
      }
    })

    socket.on("estado cambiado" , tarea => {
      if(tarea.proyecto._id === proyecto._id){
        cambiarEstadoTareaProyecto(tarea)
      } 
    })
  });

  const { nombre } = proyecto;
  if (cargando) return <p>Cargando...</p>;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl ">{nombre} </h1>
        {admin && (
          <div>
            <Link
              to={`/proyectos/editar/${id}`}
              className="flex items-center gap-2 text-gray-400 hover:text-black cursor-pointer uppercase font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              Editar
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          type="button"
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center
        mt-5 flex gap-2 items-center justify-center"
          onClick={handleModalFormularioTarea}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <p className="font-bold text-xl mt-10">Tareas del Proyecto</p>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyecto.tareas?.length ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center my-5 p-10">
            No Hay Tareas en este Proyecto
          </p>
        )}
      </div>
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Colaboradores</p>
            <Link
              to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
              className="text-gray-400 uppercase font-bold flex items-center gap-2 hover:text-black"
            >
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Añadir
            </Link>
          </div>

          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.colaboradores?.length ? (
              proyecto.colaboradores.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No Hay Colaboradores en este Proyecto
              </p>
            )}
          </div>
        </>
      )}
      <ModalFormularioTarea />

      <ModalEliminarTarea />
      <ModalEliminarColaborador />
    </>
  );
};

export default Proyecto;
