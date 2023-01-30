import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      //* validacion - verificar que todos los campos esten llenos
      console.log('Todos los campos son obligatorios');
      setAlerta({ mensaje: 'Todos los campos son obligatorios', error: true });
      return;
    }

    if (password !== repetirPassword) {
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


    //* pasando la validacion se velve un objeto vacio
    setAlerta({});

    try {
      await clienteAxios.post('/veterinarios/', { nombre, email, password });
      setAlerta({ mensaje: "Registrado correctamente", error: false });
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
    } catch (err) {
      setAlerta({ mensaje: err.response.data.message, error: true });
    }
  }

  const { mensaje } = alerta;

  return (
    <>
      <div>
        <h1 className="text-cyan-600 text-center font-black text-4xl lg:text-6xl md:text-left">
          Crea tú cuenta y Administrar <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-xl px-5 py-5 rounded-xl bg-white">
        {mensaje && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Nombre</label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Email</label>
            <input
              type="email"
              placeholder="Tu correo"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Contraseña</label>
            <input
              type="password"
              placeholder="Tu Contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Repetir Contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="registrarse"
            className="w-full bg-cyan-600 py-3 px-10 font-bold uppercase text-white rounded-xl mt-3 hover:cursor-pointer
              hover:bg-cyan-800 lg:w-1/2 lg:block mx-auto"
          />

        </form>
        <nav className="my-3 lg:flex justify-between">
          <Link className="block my-3 text-center text-gray-600" to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
          <Link className="block my-3 text-center text-gray-600" to="/olvide-password">¿Olvide mi contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar