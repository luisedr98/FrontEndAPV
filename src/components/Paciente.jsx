import usePacientes from "../hooks/usePacientes";
import { swAlert, swResponse} from "../helpers/sweetMethods"

function Paciente({paciente}) {
    const {_id, nombre, email, propietario, fecha, sintomas} = paciente;

    const {setEdicion, eliminarPaciente} = usePacientes();

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha.substring(0,10));
        return new Intl.DateTimeFormat('es-US', {timeZone : "UTC", dateStyle : 'long'}).format(nuevaFecha);
    }

    const handleEliminar = async(e) => {
        console.log('ingresando')
        e.preventDefault();
        const {isConfirmed} = await swAlert();
        if(isConfirmed){
            const {error, message} = await eliminarPaciente(_id);
            swResponse(message, error);
        }
    }
    
  return (
    <>
    <div className='my-5 bg-white rounded p-5 shadow'>
        <p className='uppercase text-cyan-700 font-bold my-1'>Nombre:{" "}
        <span className='normal-case text-black font-normal'>{nombre}</span></p>
        <p className='uppercase text-cyan-700 font-bold my-1'>email del propietario:{" "}
        <span className='normal-case text-black font-normal'>{email}</span></p>
        <p className='uppercase text-cyan-700 font-bold my-1'>propietario:{" "}
        <span className='normal-case text-black font-normal'>{propietario}</span></p>
        <p className='uppercase text-cyan-700 font-bold my-1'>fecha de alta:{" "}
        <span className='normal-case text-black font-normal'>{formatearFecha(fecha)}</span></p>
        <p className='uppercase text-cyan-700 font-bold my-1'>Sintomas:{" "}
        <span className='normal-case text-black font-normal'>{sintomas}</span></p>
        <div className="my-3 md:flex justify-between">
            <button
                type='button' 
                className='w-full my-2 md:w-fit md:my-0 py-2 px-10 bg-cyan-600 uppercase text-white font-bold rounded hover:bg-cyan-700'
                onClick={()=>setEdicion(paciente)}>
                Editar</button>
            <button
                type='button' 
                className='w-full my-2 md:w-fit md:my-0 py-2 px-10 bg-red-600 uppercase text-white font-bold rounded hover:bg-red-700'
                onClick={handleEliminar}
                >
                Eliminar</button>
        </div>
    </div>
    </>
  )
}

export default Paciente