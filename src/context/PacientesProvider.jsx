import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

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
    }, [])

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
            } catch (err) {
                console.log(err);
            }

        }
        else {
            //* guarda un nuevo paciente
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                const { createdAt, updatedAt, veterinario, __v, ...pacienteAlmacenado } = data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    const eliminarPaciente = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿No se puede revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#0891b2',
            confirmButtonText: 'Si, ¡Eliminar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('apv_token');
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data, status } = await clienteAxios.delete(`/pacientes/${id}`, config)
                    if (status === 200) {
                        Swal.fire(
                            '¡Eliminado!',
                            `${data.message}`,
                            'success'
                        )
                        const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id != id);
                        setPacientes(pacientesActualizados)
                    }
                } catch (err) {
                    console.log(err)
                    Swal.fire(
                        '¡Error!',
                        `No se logró eliminar`,
                        'error'
                    )
                }

            }
        })
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