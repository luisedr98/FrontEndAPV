import React from 'react'

function Alerta({alerta}) {
  return (
    <div className={`${(alerta.error) ? "bg-red-50 text-red-600" : "bg-green-100 text-green-600"} font-bold text-center uppercase py-3 rounded-xl`}>
        {alerta.mensaje}
    </div>
  )
}

export default Alerta