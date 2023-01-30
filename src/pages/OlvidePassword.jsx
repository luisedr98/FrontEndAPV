import { Link } from "react-router-dom"

const OlvidePassword = () => {
  return (
    <>
      <div>
        <h1 className="text-cyan-600 text-center font-black text-5xl lg:text-6xl md:text-left">
          Reestablece tu contraseña y no pierdas a <span className="text-black">Tus pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-5 shadow-xl px-5 pt-5 rounded-xl bg-white">
        <form action="">
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Email</label>
            <input 
              type="email" 
              placeholder="Correo Electrónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <input
              type="submit"
              value="Enviar instrucciones"
              className="w-full bg-cyan-600 py-3 px-10 font-bold uppercase text-white rounded-xl mt-3 hover:cursor-pointer
              hover:bg-cyan-800 lg:w-2/3 lg:block mx-auto" 
            />
        </form>
        <nav className="my-5 lg:flex justify-between">
          <Link className="block my-3 text-center text-gray-600" to="/">¿Ya tienes cuenta? Iniciar sesión</Link>
          <Link className="block my-3 text-center text-gray-600" to="/registrar">¿No tienes cuenta? Registrarse</Link>
        </nav>
        </div>
    </>
  )
}

export default OlvidePassword