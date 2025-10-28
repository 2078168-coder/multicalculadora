/* ===================================================
   Calculadora 25: Funciones Trig. Básicas
   (ID HTML: funciones_trigonom)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Ángulo: 'input-trig-angulo'
 * - select Unidad: 'select-trig-unidad' (grados, radianes)
 * - display: 'display-funciones_trigonom'
 * - resultado: 'resultado-funciones_trigonom'
 * - botón Calcular: onclick="calcularTrigonometria()"
 * - botón Limpiar: onclick="limpiarTrigonometria()"
 */

// Función auxiliar: convierte grados a radianes
function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

function calcularTrigonometria() {
    // 1. Leer los valores del HTML
    const anguloInput = parseFloat(document.getElementById('input-trig-angulo').value);
    const unidad = document.getElementById('select-trig-unidad').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-funciones_trigonom');
    const resultadoDiv = document.getElementById('resultado-funciones_trigonom');
    
    // 3. Validar datos
    if (isNaN(anguloInput)) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un valor numérico para el ángulo.';
        return;
    }

    let anguloRadianes = 0;
    
    // 4. Convertir a radianes si la unidad es 'grados'
    if (unidad === 'grados') {
        anguloRadianes = gradosARadianes(anguloInput);
    } else {
        // Si la unidad es 'radianes', se usa el valor directamente
        anguloRadianes = anguloInput;
    }

    // 5. Calcular las funciones trigonométricas
    // Se usa toFixed(6) para una precisión razonable
    const seno = Math.sin(anguloRadianes).toFixed(6);
    const coseno = Math.cos(anguloRadianes).toFixed(6);
    const tangente = Math.tan(anguloRadianes).toFixed(6);

    // 6. Mostrar el resultado
    
    // Mostramos el Seno en el display principal
    display.innerText = seno;
    
    // Mostrar todos los resultados detallados
    resultadoDiv.innerHTML = `
        Ángulo: <b>${anguloInput} ${unidad.toUpperCase()}</b>
        <hr>
        Seno (${unidad.toUpperCase()}): <b>${seno}</b>
        <br>Coseno (${unidad.toUpperCase()}): <b>${coseno}</b>
        <br>Tangente (${unidad.toUpperCase()}): <b>${tangente}</b>
    `;
}

/**
 * Función de limpieza específica para la calculadora Trigonométrica.
 * Se llama con onclick="limpiarTrigonometria()"
 */
function limpiarTrigonometria() {
    // Borra el input
    document.getElementById('input-trig-angulo').value = '';

    // Resetea los displays
    document.getElementById('display-funciones_trigonom').innerText = '0';
    document.getElementById('resultado-funciones_trigonom').innerHTML = '';
}



/* ===================================================
   Calculadora 26: Funciones Trig. Inversas
   (ID HTML: funciones_trig_inversas)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Valor Decimal: 'input-trig-valor'
 * - display: 'display-funciones_trig_inversas'
 * - resultado: 'resultado-funciones_trig_inversas'
 * - botón Calcular: onclick="calcularTrigonometriaInversa()"
 * - botón Limpiar: onclick="limpiarTrigonometriaInversa()"
 */

// Función auxiliar: convierte radianes a grados
function radianesAGrados(radianes) {
    return radianes * (180 / Math.PI);
}

function calcularTrigonometriaInversa() {
    // 1. Leer el valor decimal del HTML
    const valor = parseFloat(document.getElementById('input-trig-valor').value);
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-funciones_trig_inversas');
    const resultadoDiv = document.getElementById('resultado-funciones_trig_inversas');
    
    // 3. Validar datos
    if (isNaN(valor)) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un valor numérico.';
        return;
    }

    // 4. Validar rango (El Arcoseno y Arcocoseno solo aceptan valores entre -1 y 1)
    if (valor < -1 || valor > 1) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Para Arcoseno y Arcocoseno, el valor debe estar entre -1 y 1.';
        return;
    }
    
    // 5. Calcular las funciones trigonométricas inversas (resultados en RADIANES)
    const asinRad = Math.asin(valor);
    const acosRad = Math.acos(valor);
    const atanRad = Math.atan(valor);

    // 6. Convertir los resultados a GRADOS
    const asinGrados = radianesAGrados(asinRad);
    const acosGrados = radianesAGrados(acosRad);
    const atanGrados = radianesAGrados(atanRad);

    // 7. Mostrar el resultado (usamos toFixed(4) para precisión)
    
    // Mostramos el Arcoseno en el display principal (en grados)
    display.innerText = asinGrados.toFixed(2) + "°";
    
    // Mostrar todos los resultados detallados
    resultadoDiv.innerHTML = `
        Valor de entrada (x): <b>${valor}</b>
        <hr>
        
        **Arcoseno (asin):**
        <br>Grados: <b>${asinGrados.toFixed(4)}°</b>
        <br>Radianes: ${asinRad.toFixed(4)} rad
        <hr>
        
        **Arcocoseno (acos):**
        <br>Grados: <b>${acosGrados.toFixed(4)}°</b>
        <br>Radianes: ${acosRad.toFixed(4)} rad
        <hr>

        **Arcotangente (atan):**
        <br>Grados: <b>${atanGrados.toFixed(4)}°</b>
        <br>Radianes: ${atanRad.toFixed(4)} rad
    `;
}

/**
 * Función de limpieza específica.
 * Se llama con onclick="limpiarTrigonometriaInversa()"
 */
function limpiarTrigonometriaInversa() {
    // Borra el input
    document.getElementById('input-trig-valor').value = '';

    // Resetea los displays
    document.getElementById('display-funciones_trig_inversas').innerText = '0';
    document.getElementById('resultado-funciones_trig_inversas').innerHTML = '';
}



/* ===================================================
   Calculadora 27: Días entre Fechas
   (ID HTML: dias_entre_fechas)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Fecha 1: 'input-fecha1'
 * - input Fecha 2: 'input-fecha2'
 * - display: 'display-dias_entre_fechas'
 * - resultado: 'resultado-dias_entre_fechas'
 * - botón Calcular: onclick="calcularDiasEntreFechas()"
 * - botón Limpiar: onclick="limpiarDiasEntreFechas()"
 */

function calcularDiasEntreFechas() {
    // 1. Leer los valores del HTML (formato YYYY-MM-DD)
    const fecha1Str = document.getElementById('input-fecha1').value;
    const fecha2Str = document.getElementById('input-fecha2').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-dias_entre_fechas');
    const resultadoDiv = document.getElementById('resultado-dias_entre_fechas');

    // 3. Validar que las fechas no estén vacías
    if (!fecha1Str || !fecha2Str) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Por favor, introduce ambas fechas.';
        return;
    }

    // 4. Convertir las cadenas de fecha a objetos Date
    // getTime() devuelve los milisegundos desde 1970/01/01
    const fecha1 = new Date(fecha1Str).getTime();
    const fecha2 = new Date(fecha2Str).getTime();
    
    // 5. Validar que las fechas sean válidas (NaN si la cadena no es una fecha real)
    if (isNaN(fecha1) || isNaN(fecha2)) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Formato de fecha inválido. Usa AAAA-MM-DD.';
        return;
    }

    // 6. Calcular la diferencia en milisegundos
    // Usamos Math.abs() para obtener siempre un resultado positivo, sin importar el orden
    const diferenciaMilisegundos = Math.abs(fecha2 - fecha1);
    
    // 7. Convertir milisegundos a días
    // 1 día = 1000 ms * 60 s/min * 60 min/hr * 24 hr/día
    const milisegundosPorDia = 1000 * 60 * 60 * 24;
    const diferenciaDias = Math.floor(diferenciaMilisegundos / milisegundosPorDia);

    // 8. Mostrar el resultado
    display.innerText = diferenciaDias.toLocaleString('es-ES');
    resultadoDiv.innerHTML = `Fechas ingresadas: <b>${fecha1Str}</b> y <b>${fecha2Str}</b>
    <br>Diferencia: <b>${diferenciaDias.toLocaleString('es-ES')} días</b>`;
}

/**
 * Función de limpieza específica.
 * Se llama con onclick="limpiarDiasEntreFechas()"
 */
function limpiarDiasEntreFechas() {
    // Borra los inputs de fecha
    document.getElementById('input-fecha1').value = '';
    document.getElementById('input-fecha2').value = '';

    // Resetea los displays
    document.getElementById('display-dias_entre_fechas').innerText = '0';
    document.getElementById('resultado-dias_entre_fechas').innerHTML = '';
}



/* ===================================================
   Calculadora 28: Edad / Cronología
   (ID HTML: edad_cronologia)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Fecha Nacimiento: 'input-fecha-nacimiento'
 * - input Fecha Comparación: 'input-fecha-comparacion' (Por defecto es hoy)
 * - display: 'display-edad_cronologia'
 * - resultado: 'resultado-edad_cronologia'
 * - botón Calcular: onclick="calcularEdad()"
 * - botón Limpiar: onclick="limpiarEdadCronologia()"
 */

function calcularEdad() {
    // 1. Leer los valores del HTML
    const nacimientoStr = document.getElementById('input-fecha-nacimiento').value;
    let comparacionStr = document.getElementById('input-fecha-comparacion').value;
    
    // Si la fecha de comparación está vacía, usamos la fecha actual en formato YYYY-MM-DD
    if (!comparacionStr) {
        comparacionStr = new Date().toISOString().slice(0, 10);
    }
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-edad_cronologia');
    const resultadoDiv = document.getElementById('resultado-edad_cronologia');

    // 3. Validar que la fecha de nacimiento no esté vacía
    if (!nacimientoStr) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Por favor, introduce la fecha de nacimiento.';
        return;
    }

    // Convertir a objetos Date (usando T00:00:00 para minimizar errores de zona horaria)
    const fechaNac = new Date(nacimientoStr + 'T00:00:00');
    const fechaComp = new Date(comparacionStr + 'T00:00:00');
    
    // 4. Validar fechas
    if (isNaN(fechaNac.getTime()) || isNaN(fechaComp.getTime())) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Formato de fecha inválido.';
        return;
    }
    
    // 5. Cálculo de la diferencia exacta en Años, Meses y Días
    
    // Inicializar variables
    let anos = fechaComp.getFullYear() - fechaNac.getFullYear();
    let meses = fechaComp.getMonth() - fechaNac.getMonth();
    let dias = fechaComp.getDate() - fechaNac.getDate();
    
    // Ajustar días y meses
    if (dias < 0) {
        meses--;
        // Días en el mes ANTERIOR a la fecha de comparación
        // El día 0 del mes actual es el último día del mes anterior.
        const diasMesAnterior = new Date(fechaComp.getFullYear(), fechaComp.getMonth(), 0).getDate();
        dias += diasMesAnterior;
    }
    if (meses < 0) {
        anos--;
        meses += 12;
    }
    
    // 6. Mostrar el resultado
    
    // Mostrar la edad en años completos en el display principal
    display.innerText = `${anos} años`;
    
    // Mostrar el tiempo exacto transcurrido
    resultadoDiv.innerHTML = `Fecha Nacimiento: <b>${nacimientoStr}</b>
    <br>Fecha Comparación: <b>${comparacionStr}</b>
    <hr>
    Edad Completa: <b>${anos} años</b>
    <br>Tiempo Exacto: <b>${anos} Años, ${meses} Meses, ${dias} Días</b>
    <br><small>El cálculo exacto ignora husos horarios.</small>`;
}

/**
 * Función de limpieza específica.
 * Se llama con onclick="limpiarEdadCronologia()"
 */
function limpiarEdadCronologia() {
    // Borra los inputs de fecha
    document.getElementById('input-fecha-nacimiento').value = '';
    document.getElementById('input-fecha-comparacion').value = '';

    // Resetea los displays
    document.getElementById('display-edad_cronologia').innerText = '0';
    document.getElementById('resultado-edad_cronologia').innerHTML = '';
}


/* ===================================================
   Calculadora 29: Calculadora de Nutrición (TDEE)
   (ID HTML: calculadora_nutricion)
   =================================================== */

function calcularTDEE() {
    // 1. Leer los valores del HTML
    const peso = parseFloat(document.getElementById('input-nutri-peso').value);
    const altura = parseFloat(document.getElementById('input-nutri-altura').value);
    const edad = parseFloat(document.getElementById('input-nutri-edad').value);
    const genero = document.getElementById('select-nutri-genero').value;
    const actividad = document.getElementById('select-nutri-actividad').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-calculadora_nutricion');
    const resultadoDiv = document.getElementById('resultado-calculadora_nutricion');

    // 3. Validar datos
    if (isNaN(peso) || isNaN(altura) || isNaN(edad) || peso <= 0 || altura <= 0 || edad <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce Peso, Altura y Edad válidos y positivos.';
        return;
    }

    // 4. Calcular TMB (Tasa Metabólica Basal) - Fórmula de Mifflin-St Jeor
    let tmb = 0;
    
    if (genero === 'mujer') {
        // TMB (mujer) = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) - 161
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    } else {
        // TMB (hombre) = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) + 5
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    }

    // 5. Determinar el Factor de Actividad (PAL)
    let factorActividad = 1.2; // Sedentario por defecto
    switch (actividad) {
        case 'ligera': factorActividad = 1.375; break;
        case 'moderada': factorActividad = 1.55; break;
        case 'alta': factorActividad = 1.725; break;
        case 'extrema': factorActividad = 1.9; break;
    }
    
    // 6. Calcular TDEE (Gasto Energético Total Diario)
    const tdee = tmb * factorActividad;

    // 7. Mostrar el resultado
    // CLAVE: toLocaleString('es-ES') para formato español (punto de miles, coma decimal)
    const tmbFormato = tmb.toLocaleString('es-ES', { maximumFractionDigits: 0 });
    const tdeeFormato = tdee.toLocaleString('es-ES', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    
    display.innerText = `${tdeeFormato} kcal`;
    
    resultadoDiv.innerHTML = `
        TMB (Tasa Metabólica Basal): <b>${tmbFormato} kcal</b>
        <br>Factor de Actividad: ${factorActividad}
        <hr>
        TDEE (Gasto Diario Total): <b>${tdeeFormato} kcal/día</b>
        <br><small>Fórmula Mifflin-St Jeor</small>
    `;
}

/**
 * Función de limpieza específica.
 */
function limpiarNutricion() {
    // Borra los inputs
    document.getElementById('input-nutri-peso').value = '';
    document.getElementById('input-nutri-altura').value = '';
    document.getElementById('input-nutri-edad').value = '';
    
    // Resetea los displays
    document.getElementById('display-calculadora_nutricion').innerText = '0';
    document.getElementById('resultado-calculadora_nutricion').innerHTML = '';
}
/* ===================================================
   Calculadora 30: Operaciones con Matrices
   (ID HTML: operaciones_matrices)
   
   NOTA: Se ha cambiado la salida para usar <pre> en lugar de <table>
   para asegurar que el formato de matriz 2x2 se muestre correctamente.
   =================================================== */

// Array de IDs para facilitar la lectura y limpieza de la matriz 2x2
const matrixIDs = ['11', '12', '21', '22'];

/**
 * Lee los 4 valores de una matriz (A o B) y valida que sean números.
 * @param {string} prefix - 'a' para Matriz A, 'b' para Matriz B.
 * @returns {number[] | null} Array de 4 números o null si hay un error.
 */
function leerMatriz(prefix) {
    const matriz = [];
    let isValid = true;
    for (const idSuffix of matrixIDs) {
        const value = document.getElementById(prefix + idSuffix).value;
        const num = parseFloat(value);
        if (isNaN(num)) {
            isValid = false;
            break;
        }
        matriz.push(num);
    }
    return isValid ? matriz : null;
}

function calcularMatrices() {
    // 1. Leer los valores del HTML
    const matrizA = leerMatriz('a');
    const matrizB = leerMatriz('b');
    const operacion = document.getElementById('select-matriz-operacion').value;
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-operaciones_matrices');
    const resultadoDiv = document.getElementById('resultado-operaciones_matrices');

    // 3. Validar datos
    if (!matrizA || !matrizB) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce números válidos en todas las celdas de ambas matrices 2x2.';
        return;
    }

    // 4. Realizar la operación (Suma o Resta)
    const resultado = [];
    let simbolo = operacion === 'suma' ? '+' : '-';
    
    for (let i = 0; i < matrizA.length; i++) {
        if (operacion === 'suma') {
            resultado.push(matrizA[i] + matrizB[i]);
        } else { // resta
            resultado.push(matrizA[i] - matrizB[i]);
        }
    }

    // 5. Formatear la matriz resultado para mostrar
    // Forzamos 2 decimales y formato español (coma decimal) para el resultado.
    const formatter = (num) => num.toLocaleString('es-ES', { 
        maximumFractionDigits: 2,
        minimumFractionDigits: 2 
    });

    const r11 = formatter(resultado[0]);
    const r12 = formatter(resultado[1]);
    const r21 = formatter(resultado[2]);
    const r22 = formatter(resultado[3]);

    // CLAVE DE ARREGLO: Usamos la etiqueta <pre> (texto preformateado)
    // junto con corchetes y saltos de línea (\n) para asegurar la estructura visual.
    const resultadoTexto = `
        <pre style="text-align: center; font-size: 1.2em; border: 1px solid #ccc; padding: 10px; margin: 10px auto; width: fit-content;">
[ ${r11}  ${r12} ]
[ ${r21}  ${r22} ]
        </pre>
    `;

    // 6. Mostrar el resultado
    display.innerText = `Resultado ${simbolo}`;
    resultadoDiv.innerHTML = `
        Operación: <b>Matriz A ${simbolo} Matriz B</b>
        <hr>
        Matriz Resultado 2x2:
        ${resultadoTexto}
    `;
}

/**
 * Función de limpieza específica.
 */
function limpiarMatrices() {
    for (const idSuffix of matrixIDs) {
        document.getElementById('a' + idSuffix).value = '';
        document.getElementById('b' + idSuffix).value = '';
    }
    document.getElementById('select-matriz-operacion').value = 'suma';
    document.getElementById('display-operaciones_matrices').innerText = '0';
    document.getElementById('resultado-operaciones_matrices').innerHTML = '';
}