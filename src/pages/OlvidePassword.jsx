import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlerta({
        mensaje: "El campo email es obligatorio",
        error: true,
      })
      return;
    }
    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
      setAlerta({ error: false, mensaje: data.message });
      setEmail('');
    } catch (err) {
      setAlerta({ error: true, mensaje: err.response.data.message });
    }


  }

  const { mensaje } = alerta;

  return (
    <>
      <div>
        <h1 className="text-cyan-600 text-center font-black text-5xl lg:text-6xl md:text-left">
          Reestablece tu contraseña y no pierdas a <span className="text-black">Tus pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-xl px-5 py-5 rounded-xl bg-white">
        {mensaje && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Email</label>
            <input
              type="email"
              placeholder="Correo Electrónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className="w-full bg-cyan-600 py-3 px-10 font-bold uppercase text-white rounded-xl mt-3 hover:cursor-pointer
              hover:bg-cyan-800 lg:w-2/3 lg:block mx-auto"
          />
        </form>
        <nav className="my-3 lg:flex justify-between">
        <Link className="block my-3 text-center text-gray-600" to="/">¿Ya tienes cuenta? Iniciar sesión</Link>
        <Link className="block my-3 text-center text-gray-600" to="/registrar">¿No tienes cuenta? Registrarse</Link>
      </nav>
      </div>
      
    </>
  )
}

export default OlvidePassword