// 1. Initializing variables:
class PageAlta {

firstName = document.querySelector('#first-name');
brand = document.querySelector('#brand');
category = document.querySelector('#category')
price = document.querySelector('#price');
stock = document.querySelector('#stock');
ageFrom = document.querySelector('#age-from');
ageTo = document.querySelector('#age-to');
form = document.querySelector('.main-form');
ageType = '';


regExpFirstName = new RegExp(`^([0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\a-zA-ZÁÉÍÓÚÑÜáéíóúñü][0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\A-ZÁÉÍÓÚÑÜa-záéíóúñü]{1,40})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,40}$)?$`);
regExpBrand = new RegExp(`^([0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\a-zA-ZÁÉÍÓÚÑÜáéíóúñü][0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\A-ZÁÉÍÓÚÑÜa-záéíóúñü]{1,40})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,40}$)?$`);
regExpCategory = new RegExp(`^([0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\a-zA-ZÁÉÍÓÚÑÜáéíóúñü][0-9\'\\-\\_\\.\\,\\ \/\\"\\'\\¨\A-ZÁÉÍÓÚÑÜa-záéíóúñü]{1,40})(\\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,40}$)?$`);
regExpPrice = new RegExp(`^\[0-9]+(,?)(\[0-9]{1,2})?$`);
regExpStock = new RegExp(`^[0-9]{1,7}$`);
regExpAgeFromM = new RegExp(`^([0-9]|[1-2][0-9])$`);
regExpAgeFromY = new RegExp(`^([0-9]|[1-1][0-8])$`);
regExpAgeToM = new RegExp(`^([0-9]|[1-3][0-9])$`);
regExpAgeToY = new RegExp(`^(0?[1-9]|[0-9][0-9]|[1][0-9][0-9]|200)$`);



// 2. Core functions:

validation(value, regExp) {
    return regExp.test(value)
}

clearInput(e) {
    if(e.target.value === ''){
        e.target.style.backgroundImage = "none";
        e.target.style.backgroundColor = '#202225';
        e.target.style.color = '#ffffff';
        return true
    } return false
}

createError (msg) {
    let error = new Error(msg);
    error.name = '';
    error.popup = '';
    return error
}

trimValue (ev) {
    ev.target.value = ev.target.value.trim();
}

displayWarningError (ev, err) {
    let divError = document.createElement('div');
    divError.classList.add('error-display__popup');
    divError.innerHTML = err.message;
    ev.target.insertAdjacentElement('afterend', divError);
    setTimeout(() => divError.remove(), 5000);
    return divError
}


displayCheckOnInput (ev) {
    ev.target.style.background='url(./img/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#2F5767';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = '98% center';
}


modifyInputBackgroundOnError(e) {
    e.target.style.backgroundColor= '#d63c40';
    e.target.style.backgroundImage = "none";
}


// 3. Adding Events

falseValidation = document.querySelectorAll('.input-group__input-agetype').forEach(inputAge => {
    inputAge.addEventListener('change',  e => {
        ageType = e.target;
        ageFrom.disabled = false;
        ageTo.disabled = false;
        ageFrom.value = '';
        ageTo.value = '';
        ageFrom.style.backgroundColor = '#A0C5D3';
        ageTo.style.backgroundColor = '#A0C5D3';
        ageFrom.style.color = '#ffffff';
        ageTo.style.color = '#ffffff';
        
    })
})

/////////////



firstNameChange = firstName.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpFirstName) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Nombre inválido. Ingrese letras, números o ".",  ",",  "¨¨",  " ",  "/",  "-",  "_", en hasta 30 caracteres');
            displayWarningError(e, error);
        }
})

brandChange = brand.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpBrand) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Marca inválida. Ingrese letras, números o ".",  ",",  "¨¨",  " ",  "/",  "-",  "_", en hasta 40 caracteres');
            displayWarningError(e, error);
        }
    })
    
    categoryChange = category.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpCategory) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError(
            'Categoría inválida. Ingrese letras, números o ".",  ",",  "¨¨",  " ",  "/",  "-",  "_", en hasta 50 caracteres');
            displayWarningError(e, error);
        }
    })
    
    priceChange = price.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpPrice || (e.target.value === ''))){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Precio inválido. Ingrese un precio válido. Ej: 1234, 478, 459,99...');
        displayWarningError(e, error);
    }
})

stockChange = stock.addEventListener('change', e =>{
    if(clearInput(e)){return}
    trimValue(e);
    if(validation(e.target.value, regExpStock || (e.target.value === ''))){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError ('Ingrese un número positivo o cero, sin decimales. Ej: 12, 478, 45999...');
        displayWarningError(e, error);
    }
})

ageFromFormula = ageFrom.addEventListener('change', e => {
    if(clearInput(e)){return}
    trimValue(e);
    let validated;
    if(ageType.value === 'years'){
        validated = validation(e.target.value, regExpAgeFromY);
    } else {
        validated = validation(e.target.value, regExpAgeFromM);
    };
    
    if(validated){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError (`Ingrese la edad desde la que recomienda el producto.`);
        displayWarningError(e, error);
    }
})

ageToFormula = ageTo.addEventListener('change', e => {
    if(clearInput(e)){return}
    trimValue(e);
    let validated;
    if(ageType.value === 'years'){
        validated = validation(e.target.value, regExpAgeToY);
    } else {
        validated = validation(e.target.value, regExpAgeToM);
    };
    
    if(validated){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError (`Ingrese la edad hasta la que se recomienda el producto. Hasta 39 meses o 200 años.`);
        displayWarningError(e, error);
    }
})

formSubmit = form.addEventListener('submit', e => {
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

formReset = form.addEventListener('reset', e => {
    const inputs = e.target.querySelectorAll('.input-group__input');
        inputs.forEach(input => {
            input.style.backgroundColor = '';
            input.style.background = '';  
            }
        )
    const inputsNumber = e.target.querySelectorAll('.input-group__input-numeric');
        inputsNumber.forEach(input => {
            input.style.backgroundColor = '';
            input.style.background = '';  
            }
        )
    }      
)
}

export default PageAlta;