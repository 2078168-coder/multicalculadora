/* ===================================================
   Calculadora 13: Conversor de Presión (Actualizado)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-presion'
 * - select 'De': 'select-presion-origen'
 * - select 'A': 'select-presion-destino'
 * - display: 'display-conversor_presion'
 * - resultado: 'resultado-conversor_presion'
 * - botón Calcular: onclick="convertirPresion()"
 * - botón Limpiar: onclick="clearDisplay('conversor_presion')" 
 */

// Factores de conversión (Base: Pascal - Pa)
// Unidades: Pa, kPa, bar, atm, mmHg, psi
const factoresPresion = {
    'Pa': 1,
    'kPa': 1000,       // <-- Agregado
    'bar': 100000,
    'atm': 101325,
    'mmHg': 133.322,   // Milímetros de mercurio
    'psi': 6894.76    // Libras por pulgada cuadrada
};

function convertirPresion() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-presion').value);
    const de = document.getElementById('select-presion-origen').value;
    const a = document.getElementById('select-presion-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_presion');
    const resultadoDiv = document.getElementById('resultado-conversor_presion');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresPresion[de] || !factoresPresion[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnPascales = valor * factoresPresion[de];
    const resultado = valorEnPascales / factoresPresion[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(6);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}

/* ===================================================
   Calculadora 14: Conversor de Energía
   (ID HTML: conversor_energia)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input: 'input-energia'
 * - select 'De': 'select-energia-origen'
 * - select 'A': 'select-energia-destino'
 * - display: 'display-conversor_energia'
 * - resultado: 'resultado-conversor_energia'
 * - botón Calcular: onclick="convertirEnergia()"
 * - botón Limpiar: onclick="clearDisplay('conversor_energia')" 
 */

// Factores de conversión (Base: Joules - J)
const factoresEnergia = {
    'J': 1,
    'kJ': 1000,
    'kcal': 4184,      // Kilocaloría (Caloría alimenticia)
    'cal': 4.184,      // Caloría (física/química)
    'Wh': 3600         // Watt-hora
};

function convertirEnergia() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-energia').value);
    const de = document.getElementById('select-energia-origen').value;
    const a = document.getElementById('select-energia-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_energia');
    const resultadoDiv = document.getElementById('resultado-conversor_energia');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresEnergia[de] || !factoresEnergia[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnJoules = valor * factoresEnergia[de];
    const resultado = valorEnJoules / factoresEnergia[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(6);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(6)} ${a}</b>`;
}



/* ===================================================
   Calculadora 15: Conversor de Moneda (VERSIÓN DEMO)
   =================================================== */

/**
 * ¡¡¡ ADVERTENCIA !!!
 * Los valores en 'factoresMoneda' SON FALSOS (excepto SVC).
 * Son solo para demostración.
 */

// Factores de conversión FALSOS (Base: Dólar USD)
// ¡LISTA ACTUALIZADA CON 11 MONEDAS!
const factoresMoneda = {
    'USD': 1,      // Dólar Estadounidense (Base)
    'EUR': 0.92,   // Euro
    'MXN': 18.50,  // Peso Mexicano
    'ARS': 890.0,  // Peso Argentino
    'COP': 3900.0, // Peso Colombiano
    
    // --- Monedas Nuevas ---
    'SVC': 8.75,   // Colón Salvadoreño (Valor histórico)
    'JPY': 150.0,  // Yen Japonés
    'GBP': 0.80,   // Libra Esterlina
    'CAD': 1.35,   // Dólar Canadiense
    'GTQ': 7.80,   // Quetzal Guatemalteco
    'BRL': 5.20    // Real Brasileño
};

function convertirMoneda() {
    // 1. Leer los valores del HTML
    const valor = parseFloat(document.getElementById('input-moneda').value);
    const de = document.getElementById('select-moneda-origen').value;
    const a = document.getElementById('select-moneda-destino').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-conversor_moneda');
    const resultadoDiv = document.getElementById('resultado-conversor_moneda');

    // 3. Validar los datos
    if (isNaN(valor) || !factoresMoneda[de] || !factoresMoneda[a]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Datos inválidos.';
        return;
    }

    // 4. Calcular la conversión
    const valorEnUSD = valor / factoresMoneda[de];
    const resultado = valorEnUSD * factoresMoneda[a];

    // 5. Mostrar el resultado
    display.innerText = resultado.toFixed(2);
    resultadoDiv.innerHTML = `${valor} ${de} = <b>${resultado.toFixed(2)} ${a}</b>`;
}



/* ===================================================
   Calculadora 16: Índice de Masa Corporal (IMC)
   (ID HTML: imc)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Altura (cm): 'input-imc-altura'
 * - input Peso (kg): 'input-imc-peso'
 * - display: 'display-imc'
 * - resultado: 'resultado-imc'
 * - botón Calcular: onclick="calcularIMC()"
 * - botón Limpiar: onclick="limpiarIMC()"  <-- ¡Función de limpieza propia!
 */

function calcularIMC() {
    // 1. Leer los valores del HTML
    const alturaCm = parseFloat(document.getElementById('input-imc-altura').value);
    const pesoKg = parseFloat(document.getElementById('input-imc-peso').value);

    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-imc');
    const resultadoDiv = document.getElementById('resultado-imc');

    // 3. Validar los datos
    if (isNaN(alturaCm) || isNaN(pesoKg) || alturaCm <= 0 || pesoKg <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce peso y altura válidos.';
        return;
    }

    // 4. Calcular el IMC
    // La fórmula requiere altura en METROS (altura * altura)
    const alturaM = alturaCm / 100;
    const imc = pesoKg / (alturaM * alturaM);

    // 5. Interpretar el resultado
    let categoria = '';
    if (imc < 18.5) {
        categoria = 'Bajo peso';
    } else if (imc >= 18.5 && imc <= 24.9) {
        categoria = 'Peso normal';
    } else if (imc >= 25 && imc <= 29.9) {
        categoria = 'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.9) {
        categoria = 'Obesidad Grado I';
    } else if (imc >= 35 && imc <= 39.9) {
        categoria = 'Obesidad Grado II';
    } else { // imc >= 40
        categoria = 'Obesidad Grado III';
    }

    // 6. Mostrar el resultado
    display.innerText = imc.toFixed(1); // El IMC se suele mostrar con 1 decimal
    resultadoDiv.innerHTML = `Tu IMC es <b>${imc.toFixed(1)}</b>.<br>Clasificación: <b>${categoria}</b>`;
}

/**
 * Función de limpieza específica para la calculadora IMC.
 * Se llama con onclick="limpiarIMC()"
 */
function limpiarIMC() {
    // Borra ambos inputs
    document.getElementById('input-imc-altura').value = '';
    document.getElementById('input-imc-peso').value = '';
    
    // Resetea los displays
    document.getElementById('display-imc').innerText = '0';
    document.getElementById('resultado-imc').innerHTML = '';
}



/* ===================================================
   Calculadora 17: Agua Diaria Recomendada
   (ID HTML: agua_diaria)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Peso (kg): 'input-agua-peso'
 * - select Actividad: 'select-agua-actividad'
 * - display: 'display-agua_diaria'
 * - resultado: 'resultado-agua_diaria'
 * - botón Calcular: onclick="calcularAguaDiaria()"
 * - botón Limpiar: onclick="limpiarAgua()"  <-- ¡Función de limpieza propia!
 */

// Factores (ml de agua por kg de peso corporal)
const factoresAgua = {
    'sedentario': 30, // Poca o nula actividad
    'ligera': 35,     // Actividad ligera (ej. caminar)
    'moderada': 40,   // Actividad moderada (ej. 3-5 días/sem ejercicio)
    'intensa': 45     // Actividad intensa (ej. ejercicio diario)
};

function calcularAguaDiaria() {
    // 1. Leer los valores del HTML
    const pesoKg = parseFloat(document.getElementById('input-agua-peso').value);
    const actividad = document.getElementById('select-agua-actividad').value;

    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-agua_diaria');
    const resultadoDiv = document.getElementById('resultado-agua_diaria');

    // 3. Validar los datos
    if (isNaN(pesoKg) || pesoKg <= 0 || !factoresAgua[actividad]) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un peso válido y nivel de actividad.';
        return;
    }

    // 4. Calcular el agua (en ml)
    const aguaMl = pesoKg * factoresAgua[actividad];
    
    // 5. Convertir a Litros
    const aguaLitros = aguaMl / 1000;

    // 6. Mostrar el resultado
    display.innerText = aguaLitros.toFixed(2) + " L";
    resultadoDiv.innerHTML = `Recomendación diaria: <b>${aguaLitros.toFixed(2)} litros</b>.
    <br><small>Nota: Esta es una estimación. Las necesidades individuales pueden variar.</small>`;
}

/**
 * Función de limpieza específica para la calculadora de Agua.
 * Se llama con onclick="limpiarAgua()"
 */
function limpiarAgua() {
    // Borra el input
    document.getElementById('input-agua-peso').value = '';
    
    // Resetea el select (opcional, pero recomendado)
    document.getElementById('select-agua-actividad').value = 'ligera'; // Asume 'ligera' como default

    // Resetea los displays
    document.getElementById('display-agua_diaria').innerText = '0';
    document.getElementById('resultado-agua_diaria').innerHTML = '';
}


/* ===================================================
   Calculadora 18: Calorías Diarias Recomendadas
   (ID HTML: calorias_diarias)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Peso (kg): 'input-calorias-peso'
 * - input Altura (cm): 'input-calorias-altura'
 * - input Edad: 'input-calorias-edad'
 * - select Género: 'select-calorias-genero'
 * - select Actividad: 'select-calorias-actividad'
 * - display: 'display-calorias_diarias'
 * - resultado: 'resultado-calorias_diarias'
 * - botón Calcular: onclick="calcularCaloriasDiarias()"
 * - botón Limpiar: onclick="limpiarCalorias()"  <-- ¡Función de limpieza propia!
 */

// Factores de actividad para multiplicar por el BMR (Metabolismo Basal)
const factoresActividadCalorias = {
    'sedentario': 1.2,    // Poco o nada de ejercicio
    'ligero': 1.375,      // Ejercicio ligero (1-3 días/sem)
    'moderado': 1.55,     // Ejercicio moderado (3-5 días/sem)
    'activo': 1.725,      // Ejercicio fuerte (6-7 días/sem)
    'muy_activo': 1.9    // Ejercicio muy fuerte o trabajo físico
};

function calcularCaloriasDiarias() {
    // 1. Leer TODOS los valores del HTML
    const peso = parseFloat(document.getElementById('input-calorias-peso').value);
    const altura = parseFloat(document.getElementById('input-calorias-altura').value);
    const edad = parseInt(document.getElementById('input-calorias-edad').value, 10);
    const genero = document.getElementById('select-calorias-genero').value;
    const actividad = document.getElementById('select-calorias-actividad').value;

    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-calorias_diarias');
    const resultadoDiv = document.getElementById('resultado-calorias_diarias');

    // 3. Validar los datos
    if (isNaN(peso) || isNaN(altura) || isNaN(edad) || !genero || !factoresActividadCalorias[actividad] || peso <= 0 || altura <= 0 || edad <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Faltan datos o son inválidos.';
        return;
    }

    // 4. Calcular el BMR (Metabolismo Basal) - Fórmula Mifflin-St Jeor
    let bmr;
    if (genero === 'mujer') {
        // BMR Mujeres = (10 * peso en kg) + (6.25 * altura en cm) - (5 * edad en años) - 161
        bmr = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    } else { // 'hombre'
        // BMR Hombres = (10 * peso en kg) + (6.25 * altura en cm) - (5 * edad en años) + 5
        bmr = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    }

    // 5. Calcular TDEE (Calorías Totales)
    // TDEE = BMR * Factor de Actividad
    const tdee = bmr * factoresActividadCalorias[actividad];

    // 6. Mostrar el resultado
    display.innerText = tdee.toFixed(0) + " kcal";
    resultadoDiv.innerHTML = `Metabolismo Basal (Reposo): <b>${bmr.toFixed(0)} kcal</b>
    <br>Calorías diarias (Mantener peso): <b>${tdee.toFixed(0)} kcal</b>`;
}

/**
 * Función de limpieza específica para la calculadora de Calorías.
 * Se llama con onclick="limpiarCalorias()"
 */
function limpiarCalorias() {
    // Borra todos los inputs
    document.getElementById('input-calorias-peso').value = '';
    document.getElementById('input-calorias-altura').value = '';
    document.getElementById('input-calorias-edad').value = '';
    
    // Resetea los selects (opcional)
    document.getElementById('select-calorias-genero').value = 'mujer'; // Asume 'mujer' como default
    document.getElementById('select-calorias-actividad').value = 'sedentario'; // Asume 'sedentario' como default

    // Resetea los displays
    document.getElementById('display-calorias_diarias').innerText = '0';
    document.getElementById('resultado-calorias_diarias').innerHTML = '';
}