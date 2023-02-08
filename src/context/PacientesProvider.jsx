import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('apv_token');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);

            } catch (err) {
                console.log(err)
            }
        })();
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('apv_token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            //* edita un nuevo paciente
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizados);
                return {
                    message: "Paciente editado correctamente",
                    error: false
                }
            } catch (err) {
                console.log(err);
                return {
                    message : err.response.data.message,
                    error: true
                }
            }

        }
        else {
            //* guarda un nuevo paciente
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, veterinario, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
                return {
                    message: "Paciente añadido correctamente",
                    error: false
                }
            } catch (err) {
                console.log(err);
                return {
                    message : err.response.data.message,
                    error: true
                }
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = async id => {
        try {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
            const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id != id);
            setPacientes(pacientesActualizados)
            return {
                message: data.message,
                error: false
            }
        } catch (err) {
            console.log(err);
            return {
                message: err.response.data.message,
                error : true
            }
        }
    }

return (
    <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}

    >
        {children}
    </PacientesContext.Provider>
)
}

export {
    PacientesProvider
}

export default PacientesContext;