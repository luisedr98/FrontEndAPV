import React from "react";

const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesión y administrar tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
        <form action="">
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Email</label>
            <input 
              type="email" 
              placeholder="Correo Electrónico"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label className="text-gray-600 font-bold uppercase text-xl">Contraseña</label>
              <input 
                type="password" 
                placeholder="Contraseña"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              />
          </div>
            <input
              type="submit"
              value="iniciar sesión"
              className="w-full bg-indigo-600 py-3 px-10 font-bold uppercase text-white rounded-xl mt-3 hover:cursor-pointer
              hover:bg-indigo-800 md:w-auto" 
            
            />
        </form>
      </div>
    </>
  );
};

export default Login;
