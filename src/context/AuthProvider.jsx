import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        (async()=>{
            const token = localStorage.getItem('apv_token');
            if(!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        })();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token');
        setAuth({});
    }

    const editarPerfil = async datos => {
        try{
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
            setAuth(data);
            return{
                error: false,
                message: "Perfil modificado"
            }
        
        }catch(err){
            return {
                error: true,
                message: err.response.data.message
            }
        }
    }

    const CambiarPassword = async(datos) =>{
        try{
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);
            return {
                message: data.message,
                error: false
            }
        }catch(err){
            return{
                message: err.response.data.message,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
        value={{
            auth,
            setAuth,
            cargando,
            cerrarSesion,
            editarPerfil,
            CambiarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext