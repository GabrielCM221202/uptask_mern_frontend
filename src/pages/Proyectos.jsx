import React, { useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import PreviewProyecto from "../components/PreviewProyecto";
import Alerta from "../components/Alerta";


const Proyectos = () => {

  
  const { proyectos, alerta } = useProyectos();
  

  return (
    <div>
      <h1 className="text-4xl font-black">Proyectos</h1>
      {alerta.msj && <Alerta alerta={alerta} />}
      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ? (
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto = {proyecto}
            />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase">
            No hay proyectos
          </p>
        )}
      </div>
    </div>
  );
};

export default Proyectos;
