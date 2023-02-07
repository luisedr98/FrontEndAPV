import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";
import Swal from 'sweetalert2'


function Formulario() {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({});
    const [id, setId] = useState(null);
    
    const {guardarPaciente, paciente} = usePacientes();
    
    useEffect(()=>{
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente["fecha"].substring(0,10));
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                error: true,
                mensaje : "Todos los campos son obligatorios"
            }) 
            return;
        }

        await guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        
        setAlerta({});

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha guardado correctamente',
            showConfirmButton: true
          })

        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId(null);
    }

    const {mensaje} = alerta;

    return (
        <>
            <h2 className="text-center font-bold text-2xl">Administrador de Pacientes</h2>
          <p className="text-center font-bold my-2">Agrega{" "}<span className="text-cyan-600">Citas y Pacientes</span></p>
            <form className="my-5 bg-white p-5 shadow-md rounded-md"
            onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="text-gray-500 font-bold uppercase text-sm"
                        htmlFor="nombre"
                    >Nombre de la mascota</label>
                    <input type="text"
                        id="nombre"
                        className="border w-full p-2 mt-2 bg-gray-50 rounded-md"
                        placeholder="Nombre de la mascota"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-500 font-bold uppercase text-sm"
                        htmlFor="propietario"
                    >Nombre del propietario</label>
                    <input type="text"
                        id="propietario"
                        className="border w-full p-2 mt-2 bg-gray-50 rounded-md"
                        placeholder="Nombre del propietario"
                        value={propietario}
                        onChange={e=>setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-500 font-bold uppercase text-sm"
                        htmlFor="email"
                    >Correo del propietario</label>
                    <input type="email"
                        id="email"
                        className="border w-full p-2 mt-2 bg-gray-50 rounded-md"
                        placeholder="Email del propietario"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="text-gray-500 font-bold uppercase text-sm"
                        htmlFor="fecha"
                    >Fecha de alta</label>
                    <input type="date"
                        id="fecha"
                        className="border w-full p-2 mt-2 bg-gray-50 rounded-md"
                        min="2023-01-01"
                        value={fecha}
                        onChange={e=>setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-2">
                    <label className="text-gray-500 font-bold uppercase text-sm"
                        htmlFor="Sintomas"
                    >Sintomas</label>
                    <textarea
                      id="Sintomas"
                      className="border w-full p-2 mt-2 bg-gray-50 rounded-md"
                      placeholder="Describe los sintomas"
                      value={sintomas}
                      onChange={e=>setSintomas(e.target.value)}
                    />
                </div>
                {mensaje && <Alerta alerta={alerta}/>}

                <input
                    type="submit"
                    value={id ? 'Editar paciente' : 'Añadir Paciente'}
                    className="w-full bg-cyan-600 py-2 font-bold uppercase text-white rounded-md mt-2 hover:cursor-pointer
                    hover:bg-cyan-800 lg:w-1/2 lg:block mx-auto"
                />


            </form>
        </>
    )
}

export default Formulario