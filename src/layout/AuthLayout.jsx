import {Outlet} from "react-router-dom"
import MyFooter from "../components/MyFooter"

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto px-5 mt-12 md:grid grid-cols-2 gap-8 items-center">
          <Outlet />
        </main>
        <footer className="my-10">
          <MyFooter/>
        </footer>
        
    </>
  )
}

export default AuthLayout