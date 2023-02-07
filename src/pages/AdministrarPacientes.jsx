import { useState } from "react"
import Formulario from "../components/Formulario"
import Listado from "../components/Listado"


function AdministrarPacientes() {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className= "flex flex-col md:flex-row gap md:gap-8">
      <div className="md:w-1/2 lg:w-2/5">
        <button 
        className="w-full mb-5 bg-cyan-600 py-3 font-bold uppercase text-white rounded-md mt-3 hover:cursor-pointer
                      hover:bg-cyan-800 md:hidden"
        onClick={()=>setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
        <div className={`${mostrarFormulario ? "block" : "hidden"} md:block `}>
          <Formulario/>
        </div>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <Listado/>
      </div>
    </div>
  )
}

export default AdministrarPacientes