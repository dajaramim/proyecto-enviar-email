document.addEventListener('DOMContentLoaded', function () {//esto se ejecuta una vez que el html ha sido cargado en su totalidad

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        // reiniciar el objeto email
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    })

    function validar(e) {
        
        //trim() elimina espacios en blanco de un string
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail()
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail()
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar valores a objeto email
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // Comprobar el objeto de email
        comprobarEmail()
    }

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);


        // Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center') //clase de taildwind para agregar un color de fondo

        // Inyectar el error al formulario 
        referencia.appendChild(error) //appendChild coloca a los elementos al final

    }
    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) { //como no existia una alerta, devuelve un null, pero la siguiente vez detectará alerta y la eliminará pero en ese momento ya habrán 2, por lo que solo eliminará una
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; //expresión regular, lo que hace es buscar un patrón en una cadena de texto o serie de números
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        //console.log(Object.values(email).includes(''));este código convierte al objeto en un array y si incluye uno vacío, retornará true
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        } 
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
});