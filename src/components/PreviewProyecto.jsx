import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;
  return (
    <div className="border-b p-5 flex justify-between flex-col md:flex-row">
      <div className="flex items-center gap-2 ">
        <p className="flex-1">
          {nombre}
          <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
        </p>

        {auth._id !== creador && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Colaborador
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold flex items-center gap-2"
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
