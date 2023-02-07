import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"

import Header from "../components/Header"
import Footer from "../components/Footer"


function AdminLayout() {
    const {auth, cargando} = useAuth();

    if(cargando) return 'Loading';
    
  return (
    <>
        <Header />
        
          {auth?._id ? (
            <main className="container mx-auto my-5 px-5">
              <Outlet/>
            </main>
          ): <Navigate to='/' />} 
       
        <Footer/>
        
    </>
  )
}

export default AdminLayout