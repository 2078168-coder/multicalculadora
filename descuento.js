/* ===================================================
   Calculadora 07: Precio con Descuento
   (ID HTML: precio_descuento)
   =================================================== */

/**
 * Calcula el precio final después de un descuento.
 */
function calcularPrecioDescuento() {
    // 1. Lee los valores de los inputs
    const precio = parseFloat(document.getElementById('precio-original-desc').value);
    const porcentaje = parseFloat(document.getElementById('porcentaje-desc').value);
    
    // 2. Apunta a los displays de resultado
    const display = document.getElementById('display-precio_descuento');
    const resultadoDiv = document.getElementById('resultado-precio_descuento');

    // 3. Valida los datos
    if (isNaN(precio) || isNaN(porcentaje)) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcula el descuento
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;

    // 5. Muestra los resultados
    display.innerText = precioFinal.toFixed(2);
    resultadoDiv.innerHTML = `Precio Final: <b>$${precioFinal.toFixed(2)}</b><br>Ahorras: $${descuento.toFixed(2)}`;
}

/**
 * Limpia los campos de la calculadora de descuento.
 */
function limpiarPrecioDescuento() {
    document.getElementById('precio-original-desc').value = '';
    document.getElementById('porcentaje-desc').value = '';
    document.getElementById('display-precio_descuento').innerText = '0';
    document.getElementById('resultado-precio_descuento').innerHTML = '';
}



/* ===================================================
   Calculadora 8: Conversor de Longitud
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-longitud'
 * - select 'De': 'select-unidad-origen'
 * - select 'A': 'select-unidad-destino'
 * - display: 'display-conversor_longitud'
 * - resultado: 'resultado-conversor_longitud'
 * - botón Calcular: onclick="convertirLongitud()"
 * - botón Limpiar: onclick="clearDisplay('conversor_longitud')" 
 */

// Factores de conversión (Base: Metros)
const factoresLongitud = {
    'm': 1,
    'km': 1000,
    'cm': 0.01,
    'mm': 0.001,
    'ft': 0.3048,   // Pies
    'in': 0.0254,   // Pulgadas
    'mi': 1609.34  // Milla (por si la añaden)
};

function convertirLongitud() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-longitud').value);
    const de = document.getElementById('select-unidad-origen').value;
    const a = document.getElementById('select-unidad-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_longitud');
    const resultadoDiv = document.getElementById('resultado-conversor_longitud');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresLongitud[de] || !factoresLongitud[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnMetros = valor * factoresLongitud[de];
    const resultado = valorEnMetros / factoresLongitud[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(6);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}

/* ===================================================
   Calculadora 9: Conversor de Peso (CORREGIDO)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-peso'
 * - select 'De': 'select-peso-origen'
 * - select 'A': 'select-peso-destino'
 * - display: 'display-conversor_peso'
 * - resultado: 'resultado-conversor_peso'
 * - botón Calcular: onclick="convertirPeso()"
 * - botón Limpiar: onclick="clearDisplay('conversor_peso')" 
 */

// Factores de conversión (Base: Gramos)
const factoresPeso = {
    'g': 1,
    'kg': 1000,
    'lb': 453.59237, // <-- ¡FACTOR CORREGIDO! (Estándar internacional)
    'oz': 28.3495
};

function convertirPeso() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-peso').value);
    const de = document.getElementById('select-peso-origen').value;
    const a = document.getElementById('select-peso-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_peso');
    const resultadoDiv = document.getElementById('resultado-conversor_peso');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresPeso[de] || !factoresPeso[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnGramos = valor * factoresPeso[de];
    const resultado = valorEnGramos / factoresPeso[a];

    // 5. Mostrar el resultado
    // Con 70kg a lb, esto dará 154.323709
    display.innerText = resultado.toFixed(6); 
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}

/* ===================================================
   Calculadora 10: Conversor de Volumen
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-volumen'
 * - select 'De': 'select-volumen-origen'
 * - select 'A': 'select-volumen-destino'
 * - display: 'display-conversor_volumen'
 * - resultado: 'resultado-conversor_volumen'
 * - botón Calcular: onclick="convertirVolumen()"
 * - botón Limpiar: onclick="clearDisplay('conversor_volumen')" 
 */

// Factores de conversión (Base: Litros)
// Coincide con tu HTML: l, ml, gal, cup
const factoresVolumen = {
    'l': 1,
    'ml': 0.001,
    'gal': 3.78541,  // Galón USA
    'cup': 0.236588  // Taza USA
};

function convertirVolumen() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-volumen').value);
    const de = document.getElementById('select-volumen-origen').value;
    const a = document.getElementById('select-volumen-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_volumen');
    const resultadoDiv = document.getElementById('resultado-conversor_volumen');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresVolumen[de] || !factoresVolumen[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnLitros = valor * factoresVolumen[de];
    const resultado = valorEnLitros / factoresVolumen[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(6);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}

/* ===================================================
   Calculadora 11: Conversor de Temperatura
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-temperatura'
 * - select 'De': 'select-temperatura-origen'
 * - select 'A': 'select-temperatura-destino'
 * - display: 'display-conversor_temperatura'
 * - resultado: 'resultado-conversor_temperatura'
 * - botón Calcular: onclick="convertirTemperatura()"
 * - botón Limpiar: onclick="clearDisplay('conversor_temperatura')" 
 */

// NOTA: Esta calculadora usa fórmulas, no factores de conversión.

function convertirTemperatura() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-temperatura').value);
    const de = document.getElementById('select-temperatura-origen').value;
    const a = document.getElementById('select-temperatura-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_temperatura');
    const resultadoDiv = document.getElementById('resultado-conversor_temperatura');

    // 3. Validar
    if (isNaN(valor)) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un número.';
        return;
    }

    // 4. Calcular la conversión (fórmulas)
    let resultado;

    if (de === a) {
        resultado = valor;
    } else if (de === 'C') { // De Celsius a...
        if (a === 'F') { 
            resultado = (valor * 9/5) + 32; 
        } else if (a === 'K') { 
            resultado = valor + 273.15; 
        }
    } else if (de === 'F') { // De Fahrenheit a...
        if (a === 'C') { 
            resultado = (valor - 32) * 5/9; 
        } else if (a === 'K') { 
            resultado = (valor - 32) * 5/9 + 273.15; 
        }
    } else if (de === 'K') { // De Kelvin a...
        if (a === 'C') { 
            resultado = valor - 273.15; 
        } else if (a === 'F') { 
            resultado = (valor - 273.15) * 9/5 + 32; 
        }
    }

    // 5. Mostrar el resultado
    // La temperatura usualmente usa 2 decimales
    display.innerText = resultado.toFixed(2);
    resultadoDiv.innerHTML = `${valor} °${de} = <b>${resultado.toFixed(2)} °${a}</b>`;
}
/* ===================================================
   Calculadora 12: Conversor de Velocidad (Corregido)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-velocidad'
 * - select 'De': 'select-velocidad-origen'
 * - select 'A': 'select-velocidad-destino'
 * - display: 'display-conversor_velocidad'
 * - resultado: 'resultado-conversor_velocidad'
 * - botón Calcular: onclick="convertirVelocidad()"
 * - botón Limpiar: onclick="clearDisplay('conversor_velocidad')" 
 */

// Factores de conversión (Base: m/s - Metros por segundo)
const factoresVelocidad = {
    'm/s': 1,
    'km/h': (1000/3600), // <-- ¡FACTOR CORREGIDO! (Fracción exacta)
    'mi/h': 0.44704,     // Millas por hora
    'ft/s': 0.3048      // Pies por segundo
};

function convertirVelocidad() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-velocidad').value);
    const de = document.getElementById('select-velocidad-origen').value;
    const a = document.getElementById('select-velocidad-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_velocidad');
    const resultadoDiv = document.getElementById('resultado-conversor_velocidad');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresVelocidad[de] || !factoresVelocidad[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnMs = valor * factoresVelocidad[de];
    const resultado = valorEnMs / factoresVelocidad[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(6);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}

/**
 * NOTA: El botón "C" (onclick="clearDisplay('conversor_velocidad')")
 * debe usar la función 'clearDisplay()' de tu archivo JS principal.
 * Este archivo no la incluye.
 */