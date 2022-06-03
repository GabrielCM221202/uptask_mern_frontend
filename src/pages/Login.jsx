import {useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
const Login = () => {
  //states
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [alerta , setAlerta] = useState({});
  const navigate = useNavigate();
  
  //useAuth
  const {setAuth} = useAuth()

  const handleSubmit = async e => {
    e.preventDefault();
    if([password, email].includes('')){
      setAlerta({
        error:true,
        msj:"Todos los campos son obligatorios"
      })
      return;
    }

    //?Una vez validado autenticamos el usuario

    try {
      const {data} = await clienteAxios.post('/usuarios/login', {
        email,
        password
      })
      setAlerta({})

      localStorage.setItem('token' , data.token)

      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msj:error.response.data.msj,
        error:true
      })
    }


  }

  return (
    <div>
      <h1 className="text-sky-500 font-black text-6xl capitalize">
        Inicia Sesión y Administra tus{" "}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {alerta.msj && <Alerta alerta={alerta}/>}
      <form className="my-10 bg-white shadow rounded p-10 " onSubmit={handleSubmit}>
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-500 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:bg-sky-700 cursor-pointer transition-colors"
        />
      </form>

      {/* Barra de navegación */}

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/registrar"
          className="block text-center my-5 text-slate-500 uppercase text-sm "
        >
          ¿No Tienes una Cuenta? , Registrate
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

export default Login;
