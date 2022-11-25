const FORM = document.getElementById('formulario-perfil')
let primerNombre = document.getElementById('p-nombre');
let segundoNombre = document.getElementById('s-nombre');
let primerApellido = document.getElementById('p-apellido');
let segundoApellido = document.getElementById('s-apellido');
let myEmail = document.getElementById('email');
let telefono = document.getElementById('telefono')
let myImgPerfil = document.getElementById('my-img-perfil');

myEmail.value = localStorage.getItem('usuario');

document.addEventListener('DOMContentLoaded', ()=>{
    
   
    let objeto = "";
    objeto = JSON.parse(localStorage.getItem('datosUsuario'));
    primerNombre.value = objeto.nombre;
    primerApellido.value = objeto.apellido;
    segundoNombre.value = objeto.secNombre;
    segundoApellido.value = objeto.secApellido;
    myEmail.value = objeto.email;
    telefono.value = objeto.tel;
   

   
})

FORM.addEventListener('submit', (e)=> {
    if(!FORM.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
    }

    FORM.classList.add('was-validated');

    let objetoUsuario = {
        "nombre": primerNombre.value,
        "apellido": primerApellido.value,
        "secNombre": segundoNombre.value,
        "secApellido": segundoApellido.value,
        "email": myEmail.value,
        "tel": telefono.value
    }
    guardarDatosEnStorage(objetoUsuario)
  
})

console.log(FORM)



function guardarDatosEnStorage(datos){
   localStorage.setItem('datosUsuario',  JSON.stringify(datos));
}

