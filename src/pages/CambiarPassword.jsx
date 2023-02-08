
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

import { useState } from "react";

import { swAlert, swResponse } from "../helpers/SweetAlert";

function CambiarPassword() {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        pass_nuevo : '',
        pass_actual : '',
    })
    const {CambiarPassword} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if(Object.values(password).some(pwd => pwd === '')){
            setAlerta({
                mensaje: 'Todos los campos son obligatorios',
                error: true,    
            });
            return
        }

        if(password.pass_nuevo.length < 6){
            setAlerta({
                mensaje: 'La contraseña debe tener 6 caracteres mínimo',
                error: true,    
            });
            return
        }

        const {isConfirmed} = await swAlert();
        if(isConfirmed){
           const {message, error} = await CambiarPassword(password);
           swResponse(message, error);
           setAlerta({});
        }

        setPassword({
            pass_actual : '',
            pass_nuevo : ''
        })
    }

    const { mensaje } = alerta;

  return (
    <>
        <AdminNav />
        <h2 className="font-bold text-center text-xl mt-3">Cambiar contraseña</h2>
        <p className="text-center font-bold mt-2 mb-5">Modifica tu {" "} <span className="text-cyan-600">Password Aquí</span> </p>
        <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-lg p-5 rounded">
                    {mensaje && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="pass_actual" className="text-gray-600 uppercase font-bold">contraseña actual</label>
                            <input type="password"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="pass_actual"
                                id="pass_actual"
                                value={password.pass_actual}
                                placeholder="Escribe tu contraseña actual"
                                onChange={e=>{
                                    setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value   
                                    })
                                }}
                                
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="pass_nuevo" className="text-gray-600 uppercase font-bold">contraseña nuevo</label>
                            <input type="password"
                                className="w-full p-2 border bg-gray-50 rounded-xl mt-2"
                                name="pass_nuevo"
                                id="pass_nuevo"
                                placeholder="Escribe tu nueva contraseña"
                                value={password.pass_nuevo}
                                onChange={e=>{
                                    setPassword({
                                        ...password,
                                        [e.target.name] : e.target.value 
                                    })
                                }}
                                
                            />
                        </div>
                        
                        
                        <input type="submit"
                            value="Cambiar contraseña"
                            className="w-full text-center mt-3 uppercase text-white bg-cyan-600 p-2 font-bold rounded-xl hover:bg-cyan-800
                        hover:cursor-pointer"
                        />
                    </form>
                </div>
            </div>
        
    </>
  )
}

export default CambiarPassword