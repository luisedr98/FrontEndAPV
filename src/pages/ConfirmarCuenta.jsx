import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});


  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get(`/veterinarios/confirmar/${id}`);
        setCuentaConfirmada(true);
        setAlerta({
          error: false,
          mensaje: data.message
        });
      } catch (error) {
        setAlerta({
          error: true,
          mensaje: error.response.data.message
        })
      }
      setCargando(false);
    }
    confirmarCuenta();
  },[])

  return (
    <>
      <div>
        <h1 className="text-cyan-600 text-center font-black text-4xl lg:text-6xl md:text-left">
          Confirma tu cuenta y administra <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-xl px-5 py-5 rounded-xl bg-white">
        {!cargando && <Alerta
          alerta={alerta}
        />}
        {cuentaConfirmada && (<Link className="block my-3 text-center text-gray-600" to="/">Iniciar sesión</Link>
        )}

      </div>
    </>
  )
}

export default ConfirmarCuenta