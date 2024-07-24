// Array para simular la base de datos de números de proyecto
let numerosProyectos = []; 

function Validaciones(id) {
    const input = document.getElementById(id);
    const value = input.value;
    
    switch(id) {
        case 'NumProyecto':
            validarNumeroProyecto(value, input);
            break;
        case 'DescripcionProy':
            validarDescripcion(value, input);
            break;
        case 'FechInicProy':
            validarFecha(value, input);
            break;
        case 'FechFinProy':
            validarFecha(value, input);
            break;
        case 'CostoProy':
            validarCosto(value, input);
            break;
        case 'CargaDocAutor':
            validarDocumento(input);
            break;
    }
}

function setBorder(input, color) {
    input.style.borderColor = color;
    input.style.borderWidth = '6px';  
    input.style.borderStyle = 'solid'; 
}

function validarNumeroProyecto(value, input) {
    const regex = /^[A-Z]{3}-\d{5}$/;
    //SE PONDRA EN ROJO SI EL NUMERO DE PROYECTO ESTA DUPLICADO, ES DECIR QUE YA ESTA REGISTRADO
    if (!regex.test(value)) {
        setBorder(input, 'red');
        return;
    }
    //SE PONDRA TIPO ROSADO SI EL NUMERO DE PROYECTO ES DUPLICADO, SI YA HAY UNO CON ESO NUMERO
    if (numerosProyectos.includes(value)) {
        setBorder(input, 'fuchsia');
    } else {
    //SE PONDRA EN VERDE SI EL NUMERO DE PROYECTO ES CORRECTO Y TIENE LOS 9 CARACTERES
        setBorder(input, 'green');
        numerosProyectos.push(value);
    }
}

function validarDescripcion(value, input) {
    if (value.length > 100) {
        setBorder(input, 'red');
    } else {
        setBorder(input, 'initial');
    }
}

function validarFecha(value, input) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) {
        setBorder(input, 'red');
    } else {
        setBorder(input, 'initial');
    }
}

function validarCosto(value, input) {
    const regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(value)) {
        setBorder(input, 'red');
    } else {
        setBorder(input, 'initial');
    }
}

function validarDocumento(input) {
    const file = input.files[0];
    if (!file) {
        setBorder(input, 'red');
        return;
    }
    if (file.type !== 'application/pdf') {
        setBorder(input, 'red');
        return;
    }
    setBorder(input, 'initial');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('pdfPreview');
        if (!preview) {
            const newPreview = document.createElement('iframe');
            newPreview.id = 'pdfPreview';
            newPreview.style.width = '100%';
            newPreview.style.height = '500px';
            document.body.appendChild(newPreview);
        }
        document.getElementById('pdfPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Función para asegurar que no se pueda enviar el formulario si hay errores
document.querySelector('form').addEventListener('submit', function(e) {
    const inputs = document.querySelectorAll('input');
    let valid = true;
    inputs.forEach(input => {
        if (input.style.borderColor === 'red' || input.style.borderColor === 'fuchsia') {
            valid = false;
        }
    });
    if (!valid) {
        e.preventDefault();
        alert('Por favor, corrija los errores antes de enviar.');
    }
});
