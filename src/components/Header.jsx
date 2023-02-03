import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {

  const {cerrarSesion} = useAuth();

  return (
    <header className="bg-cyan-600 py-7 px-3 md:py-10 lg:px-5">
      <div className="container mx-auto md:flex justify-between items-center">
        <h1 className="font-bold text-2xl text-cyan-100 text-center md:text-left ">Administrador de pacientes de {" "}
          <span className="text-white font-bold">Veterinaria</span>
        </h1>
        <nav className="flex flex-col items-center gap-3 lg:gap-5 md:flex-row mt-5 md:mt-0">
          <Link to="/admin" className="font-bold text-cyan-100 text-sm hover:text-white uppercase">Inicio</Link>
          <Link to="/perfil" className="font-bold text-cyan-100 text-sm hover:text-white uppercase">Perfil</Link>
          <button
          type="button"
          className="font-bold text-cyan-100 hover:text-white text-sm uppercase"
          onClick={cerrarSesion}
          >Cerrar sesión</button>
        
        </nav>
        
      </div>
    </header>
  )
}

export default Header