import Swal from 'sweetalert2'


const swAlert = () => Swal.fire({
        title: 'Estas seguro de realizar esta acción',
        text: "No se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, realizar!',
        cancelButtonText : "Cancelar"
      });


const swResponse = (message, error) => 
   Swal.fire(
        !error ? "Realizado con éxito" : "Error",
        message,
        !error ? 'success' : 'error')

export {
    swAlert,
    swResponse
}
    