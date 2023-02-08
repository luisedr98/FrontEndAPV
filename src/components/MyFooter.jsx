

function MyFooter() {

  return (
    <>
    <div className="flex flex-col items-center gap-3 md:flex-row justify-center my-3">
          <div className="bg-cyan-600 rounded-md hover:bg-cyan-800">
              <a href="https://github.com/luisedr98" className="flex items-center justify-center uppercase font-bold text-white px-2 w-40">
                <img  src="/github.svg"/> {' '}github
              </a>
          </div>
          <div className="bg-cyan-600 rounded-md hover:bg-cyan-800">
              <a href="https://www.linkedin.com/in/luis-dominguez-82210024a/" className="flex items-center justify-center uppercase font-bold text-white px-2 w-40">
                <img src="/linkedin.svg"/>{' '}linkendin
              </a>
          </div>
        </div>
        <p className="pb-3 text-xs text-gray-500 font-bold text-center">Proyecto realizado por{""} <span className="text-black">Luis Dominguez</span></p>
    </>
  )
}

export default MyFooter