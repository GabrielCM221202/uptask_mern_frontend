import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth"

let socket;
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});
  const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
  const [colaborador, setColaborador] = useState({});
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false);

  const [buscador, setBuscador] = useState(false);
  const {auth} = useAuth()
  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  useEffect(() => {
    const obtenerProyectos = async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.get("/proyectos", config);
        setProyectos(data);
      } catch (error) {
        console.error(error.response);
      } finally {
        setCargando(false);
      }
    };
    obtenerProyectos();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const submitProyecto = async (proyecto) => {
    if (proyecto.id) {
      await editarProyecto(proyecto);
    } else {
      await nuevoProyecto(proyecto);
    }
  };

  const editarProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/proyectos/${proyecto.id}`,
        proyecto,
        config
      );
      console.log(data);

      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);

      mostrarAlerta({
        msj: "Proyecto Actualizado Correctamente",
        error: false,
      });

      setTimeout(() => {
        navigate("/proyectos");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  const nuevoProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      setProyectos([...proyectos, data]);
      mostrarAlerta({
        msj: "Proyecto Creado Correctamente",
        error: false,
      });
      setTimeout(() => {
        navigate("/proyectos");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerProyecto = async (id) => {
    setCargando(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data);
    } catch (error) {
      setAlerta({
        msj: error.response.data.msj,
        error: true,
      });

      navigate("/proyectos");

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProyecto = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);
      console.log(data);
      //Sincronizar el State
      const proyectosActualizados = proyectos.filter(
        (proyectoState) => proyectoState._id !== id
      );
      setProyectos(proyectosActualizados);
      mostrarAlerta({
        msj: data.msj,
        error: false,
      });
      setTimeout(() => {
        navigate("/proyectos");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalFormularioTarea = () => {
    setTarea({});
    setModalFormularioTarea(!modalFormularioTarea);
  };

  const submitTarea = async (tarea) => {
    if (tarea.id) {
      await editarTarea(tarea);
      return;
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);
      // ? Agrega la tarea al State

      setAlerta({});
      setModalFormularioTarea(false);

      //SOCKET IO

      socket.emit("nueva tarea", data);
    } catch (error) {
      console.error(error);
    }
  };

  const editarTarea = async (tarea) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      console.log(data);

      

      setAlerta({});
      setModalFormularioTarea(false);

      //socket io

      socket.emit("actualizar tarea" , data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  const handleModalEliminarTarea = (tarea) => {
    setTarea(tarea);
    setModalEliminarTarea(!modalEliminarTarea);
  };

  const eliminarTarea = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.delete(
        `/tareas/${tarea._id}`,
        config
      );
      
      
      //socket io
      socket.emit("eliminar tarea" , tarea)
      mostrarAlerta({
        msj: data.msj,
        error: false,
      });

     

      setModalEliminarTarea(false);
      setTarea({});
    } catch (error) {
      console.error(error);
    }
  };

  const submitColaborador = async (email) => {
    setCargando(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores`,
        { email },
        config
      );
      setColaborador(data);
      setAlerta({});
    } catch (error) {
      mostrarAlerta({ msj: error.response.data.msj, error: true });
    } finally {
      setCargando(false);
    }
  };

  const agregarColaborador = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      mostrarAlerta({
        msj: data.msj,
        error: false,
      });
      setColaborador({});
    } catch (error) {
      mostrarAlerta({
        msj: error.response.data.msj,
        error: true,
      });
    }
  };

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador);
    setColaborador(colaborador);
  };

  const eliminarColaborador = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id: colaborador._id },
        config
      );
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== colaborador._id
        );
      setProyecto(proyectoActualizado);
      mostrarAlerta({
        msj: data.msj,
        error: false,
      });
      setColaborador({});
      setModalEliminarColaborador(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const completarTarea = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );

      
      setTarea({});
      setAlerta({});

      //socket io 
      socket.emit("cambiar estado" , data)
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuscador = () => {
    setBuscador(!buscador);
  };

  const submitTareasProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
    setProyecto(proyectoActualizado);
  };

  const eliminarTareaProyecto = (tarea) => {
     //Todo actualizar el dom
     const proyectoActualizado = { ...proyecto };
     proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
       (tareaState) => tareaState._id !== tarea._id
     );

     setProyecto(proyectoActualizado);
  }

  const actualizarTareaProyecto = (tarea) => {
    const proyectoActualizado = {...proyecto}
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => 
      tareaState._id === tarea._id ? tarea : tareaState)
    setProyecto(proyectoActualizado)
  }

  const cambiarEstadoTareaProyecto = (tarea) => {
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map(
      (tareaState) => (tareaState._id === tarea._id ? tarea : tareaState)
    );

    setProyecto(proyectoActualizado);
  }

  const cerrarSesionProyectos = ()=>{
    setProyecto({})
    setProyectos([])
    setAlerta({})

  }
  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        mostrarAlerta,
        submitProyecto,
        obtenerProyecto,
        proyecto,
        cargando,
        eliminarProyecto,
        modalFormularioTarea,
        handleModalFormularioTarea,
        submitTarea,
        handleModalEditarTarea,
        tarea,
        handleModalEliminarTarea,
        modalEliminarTarea,
        eliminarTarea,
        submitColaborador,
        colaborador,
        agregarColaborador,
        modalEliminarColaborador,
        handleModalEliminarColaborador,
        eliminarColaborador,
        completarTarea,
        handleBuscador,
        buscador,
        submitTareasProyecto,
        eliminarTareaProyecto,
        actualizarTareaProyecto,
        cambiarEstadoTareaProyecto,
        cerrarSesionProyectos
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };

export default ProyectosContext;
