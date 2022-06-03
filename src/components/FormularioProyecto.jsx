import React, { useEffect } from "react";
import { useState } from "react";
import Alerta from "./Alerta";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
const FormularioProyecto = () => {
  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");
  const { alerta, mostrarAlerta, submitProyecto, proyecto } = useProyectos();

  const params = useParams();

  useEffect(() => {
    if(params.id && proyecto.nombre){
      console.log('Editando')
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
      setCliente(proyecto.cliente)
    }
  },[params])

  const handleSubmit = async(e) => {
    e.preventDefault();
    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
      mostrarAlerta({
        error: true,
        msj: "Todos los campos son obligatorios",
      });
      return;
    }
    //?pasar los datos

    await submitProyecto({id,nombre, descripcion, fechaEntrega, cliente})
    setId(null)
    setNombre('');
    setDescripcion('');
    setFechaEntrega('');
    setCliente('');
  }

  
  return (
    <>
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
        >
        {alerta.msj && <Alerta alerta={alerta} />}
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="text-gray-700 uppercase font-bold text-sm "
          >
            Nombre del Proyecto
          </label>

          <input
            type="text"
            name="nombre"
            id="nombre"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
            placeholder="Nombre del Proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="text-gray-700 uppercase font-bold text-sm "
          >
            Descripcion del Proyecto
          </label>

          <textarea
            name="descripcion"
            id="descripcion"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
            placeholder="Descripcion del Proyecto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="fechaEntrega"
            className="text-gray-700 uppercase font-bold text-sm "
          >
            Fecha de Entrega
          </label>

          <input
            type="date"
            name="fechaEntrega"
            id="fechaEntrega"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="cliente"
            className="text-gray-700 uppercase font-bold text-sm "
          >
            Cliente
          </label>

          <input
            type="text"
            name="cliente"
            id="cliente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 ronded-md"
            placeholder="Cliente del Proyecto"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={id ? "Guardar Cambios" : "Crear Proyecto"}
          className="bg-sky-500 w-full p-3 uppercase font-bold text-white rounded hover:cursor-pointer hover:bg-sky-700 transition-colors text-center"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
