// Función para capitalizar la primera letra de cada palabra
function capitalizarTexto(texto) {
    return texto.split(' ').map(palabra => 
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    ).join(' ');
}

// Validar la fecha seleccionada
function validarFecha() {
    const fechaInput = document.getElementById('fecha');
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fechaInput.value);
    if (fechaSeleccionada < fechaActual) {
        fechaInput.setCustomValidity('La fecha debe ser hoy o en el futuro.');
        fechaInput.reportValidity();
    } else {
        fechaInput.setCustomValidity('');
    }
}

// Mostrar u ocultar campos según checkbox
function toggleEntrada() {
    const entradaDetails = document.getElementById('entradaDetails');
    entradaDetails.classList.toggle('hidden', !document.getElementById('entrada').checked);
}

function togglePlato() {
    const segundoPlatoDetails = document.getElementById('segundoPlatoDetails');
    segundoPlatoDetails.classList.toggle('hidden', !document.getElementById('segundoPlato').checked);
}

function togglePostre() {
    const postreDetails = document.getElementById('postreDetails');
    postreDetails.classList.toggle('hidden', !document.getElementById('postre').checked);
}

function toggleBrindis() {
    const brindisDetails = document.getElementById('brindisDetails');
    brindisDetails.classList.toggle('hidden', !document.getElementById('brindis').checked);
}

function toggleCantidad(id) {
    const cantidadDetails = document.getElementById(id);
    cantidadDetails.classList.toggle('hidden', !document.getElementById(id.replace('Cantidad', '')).checked);
}

function toggleMozos() {
    const mozosDetails = document.getElementById('mozosDetails');
    mozosDetails.classList.toggle('hidden', !document.getElementById('mozos').checked);
}

// Generar campos de bocaditos dinámicamente
function generarCamposBocaditos() {
    const cantidad = document.getElementById('cantidadTiposBocaditos').value;
    const bocaditosGroup = document.getElementById('bocaditosGroup');
    bocaditosGroup.innerHTML = ''; // Limpiar campos existentes

    for (let i = 0; i < cantidad; i++) {
        // Crear un grupo para cada tipo de bocadito
        const bocaditoDiv = document.createElement('div');
        bocaditoDiv.className = 'bocadito';

        // Campo para la cantidad de bocaditos
        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.className = 'form-control';
        cantidadInput.placeholder = `Cantidad de Bocadito ${i + 1}`;
        cantidadInput.min = 1;

        // Campo para el nombre del bocadito
        const nombreInput = document.createElement('input');
        nombreInput.type = 'text';
        nombreInput.className = 'form-control';
        nombreInput.placeholder = `Nombre del Bocadito ${i + 1}`;

        // Agregar los campos al div de bocaditos
        bocaditoDiv.appendChild(cantidadInput);
        bocaditoDiv.appendChild(nombreInput);
        bocaditosGroup.appendChild(bocaditoDiv);
    }
}

// Calcular el precio total
function calcularTotal() {
    const personas = parseInt(document.getElementById('personas').value) || 0;
    const precioPorPersona = parseFloat(document.getElementById('precioPorPersona').value) || 0;
    const total = personas * precioPorPersona;
    document.getElementById('precioTotal').value = total.toFixed(2);
}

// Generar la cotización y mostrar vista previa
function generarCotizacion() {
    const nombre = capitalizarTexto(document.getElementById('nombre').value);
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const lugar = capitalizarTexto(document.getElementById('lugar').value);
    const personas = document.getElementById('personas').value;
    const precioPorPersona = parseFloat(document.getElementById('precioPorPersona').value) || 0;
    const precioTotal = personas * precioPorPersona;
    const adelanto = (precioTotal * 0.6).toFixed(2); // 60% del total
    const restante = (precioTotal * 0.4).toFixed(2); // 40% del total

    let cotizacionTexto = `${nombre}, aquí te presentamos la cotización:\n\n`;
    cotizacionTexto += `📅 Fecha del evento: ${fecha}\n`;
    cotizacionTexto += `⏰ Hora del evento: ${hora}\n`;
    cotizacionTexto += `📍 Lugar del evento: ${lugar}\n`;
    cotizacionTexto += `Servicios solicitados:\n`;

    if (document.getElementById('entrada').checked) {
        const nombreEntrada = capitalizarTexto(document.getElementById('nombreEntrada').value) || "No especificado";
        cotizacionTexto += `- Entrada: ${nombreEntrada}\n`;
    }
    if (document.getElementById('segundoPlato').checked) {
        const nombreSegundoPlato = capitalizarTexto(document.getElementById('nombreSegundoPlato').value) || "No especificado";
        cotizacionTexto += `- Segundo Plato: ${nombreSegundoPlato}\n`;
    }
    if (document.getElementById('postre').checked) {
        const nombrePostre = capitalizarTexto(document.getElementById('nombrePostre').value) || "No especificado";
        cotizacionTexto += `- Postre: ${nombrePostre}\n`;
    }
    if (document.getElementById('brindis').checked) {
        const nombreBrindis = capitalizarTexto(document.getElementById('nombreBrindis').value) || "No especificado";
        cotizacionTexto += `- Brindis: ${nombreBrindis}\n`;
    }

    // Detalles de bocaditos
    const bocaditosInputs = document.querySelectorAll('#bocaditosGroup input[type="text"]');
    const bocaditosCantidades = document.querySelectorAll('#bocaditosGroup input[type="number"]');
    if (bocaditosInputs.length > 0) {
        cotizacionTexto += "Bocaditos:\n";
        bocaditosInputs.forEach((input, index) => {
            const cantidad = bocaditosCantidades[index].value || "No especificada";
            cotizacionTexto += `  - Bocadito ${index + 1}: ${capitalizarTexto(input.value || "No especificado")}, Cantidad: ${cantidad}\n`;
        });
    }

    // Detalles de vajilla
    if (document.getElementById('copas').checked) {
        const cantidadCopas = document.getElementById('copasCantidad').querySelector('input[type="number"]').value || "No especificado";
        cotizacionTexto += `- Copas: ${cantidadCopas}\n`;
    }
    if (document.getElementById('vasos').checked) {
        const cantidadVasos = document.getElementById('vasosCantidad').querySelector('input[type="number"]').value || "No especificado";
        cotizacionTexto += `- Vasos: ${cantidadVasos}\n`;
    }

    cotizacionTexto += `\nNúmero de personas: ${personas}\n`;
    cotizacionTexto += `💲 Precio por persona: S/${precioPorPersona.toFixed(2)}\n`;
    cotizacionTexto += `💰 Costo total de inversión: S/${precioTotal.toFixed(2)}\n`;
    cotizacionTexto += `💵 Para asegurar su fecha especial, le invitamos a realizar un adelanto del 60%: S/${adelanto}\n`;
    cotizacionTexto += `🔔 El restante (S/${restante}) se podrá cancelar el día del evento.\n`;
    cotizacionTexto += `🌟 Estamos emocionados de ser parte de su celebración y queremos hacer de su evento un momento inolvidable. ¡Contáctenos y reserve su fecha ahora mismo! 💖\n`;

    const preview = document.getElementById('cotizacionTexto');
    preview.textContent = cotizacionTexto;
    document.getElementById('preview').classList.remove('hidden');
}

// Copiar cotización al portapapeles
function copiarCotizacion() {
    const cotizacionTexto = document.getElementById('cotizacionTexto').textContent;
    navigator.clipboard.writeText(cotizacionTexto).then(() => {
        alert('Cotización copiada al portapapeles.');
    }, (err) => {
        console.error('Error al copiar la cotización: ', err);
    });
}
