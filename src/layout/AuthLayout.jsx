import {Outlet} from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto px-5 mt-12 md:grid grid-cols-2 gap-8 items-center">
          <Outlet />
        </main>
        
    </>
  )
}

export default AuthLayout