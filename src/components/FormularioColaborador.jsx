import React, { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta , submitColaborador} = useProyectos();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      mostrarAlerta({
        error: true,
        msj: "El correo es obligatorio",
      });

      return;
    }

    //Una vez validado
    submitColaborador(email)
  };

  return (
    <form
      className="bg-white px-5 py-10 md:w-1/2 rounded-lg shadow w-full"
      onSubmit={handleSubmit}
    >
      {alerta.msj && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm capitalize"
          htmlFor="email"
        >
          Email del nuevo Colaborador
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email colaborador"
        />
      </div>
      <input
        type="submit"
        value={"Buscar Colaborador"}
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white font-bold uppercase cursor-pointer transition-colors rounded text-sm"
      />
    </form>
  );
};

export default FormularioColaborador;
