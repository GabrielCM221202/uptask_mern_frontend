import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";


const NuevoPassword = () => {
  const [tokenValido, setTokenValido] = useState(false);
  const [password, setNuevoPassword] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const { token } = useParams();
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          error: true,
          msj: error.response.data.msj,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password < 6) {
      setAlerta({
        error: true,
        msj: "El password debe ser minimo de 6 caracteres",
      });
      return;
    }

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      console.log(data);
      setAlerta({
        error: false,
        msj: data.msj,
      });
      setPasswordModificado(true);
      
    } catch (err) {
      setAlerta({
        msj: err.response.data.msj,
        error: true,
      });
    }
  };
  return (
    <div>
      <h1 className="text-sky-500 font-black text-6xl capitalize">
        reestablece tu password y no pierdas acceso a tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msj && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded p-10"
          onSubmit={handleSubmit}
        >
          {/*Password*/}

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase block text-gray-600 text-xl font-bold"
            >
              Nueva Contraseña
            </label>
            <input
              type="password"
              placeholder="Escribe tu nuevo password"
              name="password"
              id="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setNuevoPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-500 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 cursor-pointer transition-colors"
          />
        </form>
      )}

      {passwordModificado && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm "
        >
          Inicia Sesión
        </Link>
      )}
    </div>
  );
};

export default NuevoPassword;
