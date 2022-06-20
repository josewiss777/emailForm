//Register variables and selectors
const btnSend = document.querySelector('#btnSend')
const email = document.querySelector('#email')
const subject = document.querySelector('#subject')
const message = document.querySelector('#message')
const textError = document.querySelector('#textError')
const btnReset = document.querySelector('#btnReset')
const divForm = document.querySelector('#divForm')
const spinner = document.querySelector('#spinner');
const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//Register events
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', startApp)
    //blur valida los campos en tiempo real, al dar click fuera del form
    email.addEventListener('blur', validateForm);
    subject.addEventListener('blur', validateForm);
    message.addEventListener('blur', validateForm);
    btnReset.addEventListener('click', resetForm);
    divForm.addEventListener('submit', sendEmail)
}

//Register functiones 
function startApp() {
    btnSend.disabled = true;
    btnSend.classList.add('opacity');
}

function validateForm(e) {
    //e.target para acceder a lo que se dió click .value lo que escribe y .length la cantidad de caracteres
    if(e.target.value.length > 0){
        e.target.classList.remove('borderError');
        e.target.classList.add('borderValid');
        const pError = document.querySelector('.error');
        if (pError) {
            pError.remove();
        }   
    } else {  
        e.target.classList.remove('borderValid');
        e.target.classList.add('borderError');
        showError("Completa todos los campos");
    }
    //Validar campo email con una expresion regular
    if (e.target.type === 'email') {
        if ( regularExpression.test( e.target.value )) {
            const pError = document.querySelector('.error');
            if (pError) {
                pError.remove();
            } 
            e.target.classList.remove('borderError');
            e.target.classList.add('borderValid');
        }else {
            e.target.classList.remove('borderValid');
            e.target.classList.add('borderError');
            showError("e-mail no válido");
        }
    }
    //Validar que esten completos todos los campos
    if ( regularExpression.test( email.value ) && subject.value !== '' && message.value !== '') {
        btnSend.disabled = false;
        btnSend.classList.add('pointer');
        btnSend.classList.remove('opacity');
    } else{
        btnSend.disabled = true;
        btnSend.classList.add('opacity');
    }
}

function showError(message) {
    const messageError = document.createElement('p');
    messageError.textContent = message;
    messageError.classList.add('error')
    //Verificar si ya existe un mensaje de error en el DOM para no repetirlos
    const errores = document.querySelectorAll('.error')
    if( errores.length === 0 ) {
        textError.appendChild( messageError )
    }
}

function sendEmail(e) {
    e.preventDefault()
    startApp();
    const sent = document.createElement('p');
    sent.textContent = 'e-mail enviado correctamente';
    sent.classList.add('sentP')
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none';
        textError.appendChild( sent )
        setTimeout(() => {
            sent.remove()
            divForm.reset()
        }, 2000)
    }, 2000)
}

function resetForm() {
    divForm.reset(); 
    startApp();
}