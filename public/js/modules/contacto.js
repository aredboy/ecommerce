class PageContacto {
    static async init () {
// 1. Initializing variables:

const firstName = document.querySelector('#first-name');
const email = document.querySelector('#email');
const form = document.querySelector('.main-form');

const regExpFirstName = new RegExp(`^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$`);
const regExpEmail = new RegExp(`^[a-zA-Z0-9_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$`);

// 2. Core functions:

function validation(value, regExp) {
    return regExp.test(value)
}

function clearInput(e) {
    if(e.target.value === ''){
        e.target.style.backgroundImage = "none";
        e.target.style.backgroundColor = '#202225';
        e.target.style.color = '#ffffff';
        return true
    } return false
}

function createError (msg) {
    let error = new Error(msg);
    error.name = '';
    error.popup = '';
    return error
}

function trimValue (ev) {
    ev.target.value = ev.target.value.trim();
}

function displayWarningError (ev, err) {
    let divError = document.createElement('div');
        divError.classList.add('error-display__popup');
        divError.innerHTML = err.message;
        ev.target.insertAdjacentElement('afterend', divError);
        setTimeout(() => divError.remove(), 3000);
        return divError
}


function displayCheckOnInput (ev) {
    ev.target.style.background='url(./img/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#2F5767';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = '98% center';
}

function modifyInputBackgroundOnError(e) {
    e.target.style.backgroundColor= '#d63c40';
    e.target.style.backgroundImage = "none";
}

// 3. Adding Events

const falseValidationC = document.querySelectorAll('.input-group-idtype__input').forEach(inputName => {
    inputName.addEventListener('change',  e => {
        idType = e.target;
        idNumber.disabled = false;
        idNumber.value = '';
        idNumber.style.backgroundColor = '#202225';
        idNumber.style.color = '#ffffff';
    })
})
/////////////

const firstNameChangeC = firstName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpFirstName) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Nombre inválido. Ingrese solo letras mayúsc. o minúsc. Ej: Pedro, pedro, Ruben, ruben...');
            displayWarningError(e, error);
    }
})

const emailChange = email.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpEmail) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Email inválido. Ingrese una direccion válida. Ej: matiasalfonso32@hotmail.com...');
            displayWarningError(e, error);
    }
})


const formSubmitC = form.addEventListener('submit', e => {
    const inputs = e.target.querySelectorAll('.input-group__input');
    let errors = false;
        inputs.forEach(input => {
            if (input.style.backgroundColor === 'rgb(214, 60, 64)') {
                errors = true;}
            }
        )
    if (errors) {
        e.preventDefault();
        let error = createError('Por favor, corrija los errores antes de enviar el formulario.');
        alert(error.message);
        }
    }
)

const formResetC = form.addEventListener('reset', e => {
    const inputs = e.target.querySelectorAll('.input-group__input');
        inputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.background = '';  
            }
        )
    }
)

    }
}

export default PageContacto;