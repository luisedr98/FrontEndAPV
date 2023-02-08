import { useEffect, useState } from "react";

import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";

import useAuth from "../hooks/useAuth"

import { swAlert, swResponse} from "../helpers/sweetMethods"

function EditarPerfil() {
    const { auth, editarPerfil } = useAuth();

    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async e => {
        e.preventDefault();
        const { nombre, email } = perfil;
        if ([nombre, email].includes('')) {
            setAlerta({
                mensaje: "El campo nombre e email son obligatorios",
                error: true
            })
            return
        }

        const {isConfirmed} = await swAlert()
        if(isConfirmed){
            const {error, message} = await editarPerfil(perfil);
            swResponse(message, error);
            setAlerta({})
        }
        
    }


    useEffect(() => {
        setPerfil(auth)
    }, [auth]);

    const { mensaje } = alerta;

    return (
        <>
            <AdminNav />
            <h2 className="font-bold text-center text-xl mt-3">Editar Perfil</h2>
            <p className="text-center font-bold mt-2 mb-5">Modifica tu {" "} <span className="text-cyan-600">Información Aquí</span> </p>
            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-lg p-5 rounded">
                    {mensaje && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="nombre" className="text-gray-600 uppercase font-bold">Nombre</label>
                            <input type="text"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="nombre"
                                id="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="web" className="text-gray-600 uppercase font-bold">Sitio web</label>
                            <input type="text"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="web"
                                id="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="telefono" className="text-gray-600 uppercase font-bold">telefono</label>
                            <input type="text"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="telefono"
                                id="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="email" className="text-gray-600 uppercase font-bold">email</label>
                            <input type="text"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="email"
                                id="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>
                        <input type="submit"
                            value="Guardar cambios"
                            className="w-full text-center mt-3 uppercase text-white bg-cyan-600 p-2 font-bold rounded-xl hover:bg-cyan-800
                        hover:cursor-pointer"
                        />
                    </form>
                </div>
            </div>

        </>
    )
}

export default EditarPerfil