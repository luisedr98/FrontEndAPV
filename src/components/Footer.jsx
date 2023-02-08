import MyFooter from "./MyFooter"

function Footer() {
  return (
    <footer>
        <p className="text-center uppercase font-bold mt-10">APV - Administrador de paciente de{' '}
        <span className="text-cyan-600">veterinaria</span></p>
        <MyFooter />
    </footer>
  )
}

export default Footer