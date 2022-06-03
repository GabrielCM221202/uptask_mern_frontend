import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({
        error: true,
        msj: "El correo es obligatorio",
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });

      setAlerta({
        error: false,
        msj: data.msj,
      });
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true,
      });
    }
  };
  return (
    <div>
      <h1 className="text-sky-500 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {alerta.msj && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded p-10 "
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase block text-gray-600 text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de Registro"
            name="email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-500 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 cursor-pointer transition-colors"
        />
      </form>

      {/* Barra de navegación */}

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm "
        >
          ¿Ya Tienes una Cuenta? , Inicia Sesión
        </Link>

        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm "
        >
          ¿No Tienes una Cuenta? , Registrate
        </Link>
      </nav>
    </div>
  );
};

export default OlvidePassword;
