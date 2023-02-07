import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"


function Listado() {
  const {pacientes} = usePacientes();
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="text-center font-bold text-2xl">Listado de Pacientes</h2>
          <p className="text-center font-bold my-2">Administra tus{" "}<span className="text-cyan-600">Citas y Pacientes</span></p>
          {
            pacientes.map(paciente => 
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            )
          }
        </>
      ) : (
        <>
          <h2 className="text-center font-bold text-3xl">No hay pacientes</h2>
          <p className="text-center font-bold my-2">Agrega y administra{" "}<span className="text-cyan-600">Citas y Pacientes</span></p>
        </>
      )}
    </>
  )
}

export default Listado