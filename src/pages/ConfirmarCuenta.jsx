import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const ConfirmarCuenta = () => {
  //States
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios.get(url);
        setAlerta({
          error: false,
          msj: data.msj,
        });

        setCuentaConfirmada(true);
      } catch (er) {
        setAlerta({
          error: true,
          msj: er.response.data.msj,
        });
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <div>
      <h1 className="text-sky-500 font-black text-6xl capitalize">
        confirma tu cuenta y comienza a crear tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {alerta.msj && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link
            to="/"
            className="block text-center my-5 text-slate-500 uppercase text-sm "
          >
             Inicia Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
