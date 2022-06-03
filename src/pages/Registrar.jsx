import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from "axios";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        error: true,
        msj: "Todos los campos son obligatorios",
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        error: true,
        msj: "Las contraseñas son diferentes",
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        error: true,
        msj: "El password es demasiado corto, agrega minimo 6 caracteres",
      });
      return;
    }
    setAlerta({});

    //? Crear el usuario en la API

    try {
      const { data } = await clienteAxios.post('/usuarios',
        {
          nombre,
          email,
          password,
        }
      );

      setAlerta({
        error: false,
        msj: data.msj,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      const { data } = error.response;
      setAlerta({
        error: true,
        msj: data.msj,
      });
    }
  };

  return (
    <div>
      <h1 className="text-sky-500 font-black text-6xl capitalize">
        Crea tu cuenta y Administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msj && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded p-10"
        onSubmit={handleSubmit}
      >
        {/* Nombre */}
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase block text-gray-600 text-xl font-bold"
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Tu nombre"
            name="nombre"
            id="nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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

        {/*Password*/}

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase block text-gray-600 text-xl font-bold"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingrese una Contraseña"
            name="password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Repetir Password*/}

        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase block text-gray-600 text-xl font-bold"
          >
            Repetir Contraseña
          </label>
          <input
            type="password"
            placeholder="Repetir Contraseña"
            name="password2"
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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
          to="/olvide-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm "
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </div>
  );
};

export default Registrar;
