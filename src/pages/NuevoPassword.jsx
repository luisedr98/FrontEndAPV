import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { Link } from "react-router-dom";

function NuevoPassword() {
    const { token } = useParams();

    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [cambioPassword, setCambioPassword] = useState(false);
    const [cargado, setCargado] = useState(false);
    const [password, setPassword] = useState('');
    const [nuevoPassword, setNuevoPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        if ([password, nuevoPassword].includes('')) {
            setAlerta({
                error: true,
                mensaje: "Todos los campos son obligatorios"
            })
            return;
        }

        if (password !== nuevoPassword) {
            //* validacion para que las contraseña sean iguales
            console.log('Las contraseñas no coinciden');
            setAlerta({ mensaje: 'Las contraseñas no coinciden', error: true });
            return
        }

        if (password.length < 6) {
            //* validacion para que la contraseña tenga al menos 6 caracteres
            console.log('La contraseña debe tener al menos 6 caracteres');
            setAlerta({ mensaje: 'La contraseña debe tener al menos 6 caracteres', error: true });
            return;
        }

        try{
            const {data} = await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password})
            setAlerta({
                error: false,
                mensaje : data.message
            })
            setCambioPassword(true);
            setPassword('');
            setNuevoPassword('');
        }catch(error){
            setAlerta({
                error: true,
                mensaje : error.response.data.message
            })
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await clienteAxios.get(
                    `/veterinarios/olvide-password/${token}`
                );
                setAlerta({
                    error: false,
                    mensaje: 'Ingrese la nueva contraseña',
                });
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    error: true,
                    mensaje: 'Error al cambiar la contraseña',
                });
            }
            setCargado(true);
        })();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-cyan-600 text-center font-black text-5xl lg:text-6xl md:text-left">
                    Reestablece tu contraseña y no pierdas a{" "}
                    <span className="text-black">Tus pacientes</span>
                </h1>
            </div>
            <div className="mt-12 md:mt-5 shadow-xl px-5 py-5 rounded-xl bg-white">
                {cargado && <Alerta alerta={alerta} />}
                {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="text-gray-600 font-bold uppercase text-xl">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Tu nueva contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label className="text-gray-600 font-bold uppercase text-xl">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                placeholder="Confirmar tu nueva contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={nuevoPassword}
                onChange={e => setNuevoPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Guardar contraseña"
              className="w-full bg-cyan-600 py-3 px-10 font-bold uppercase text-white rounded-xl mt-3 hover:cursor-pointer
                    hover:bg-cyan-800 lg:w-2/3 lg:block mx-auto"
            />
          </form>  
        )}
        {
            cambioPassword && 
            <nav>
            <Link className="block my-3 text-center text-gray-600" to="/">Iniciar sesión</Link>
            </nav>
        }
                

            </div>
        </>
    );
}

export default NuevoPassword;
