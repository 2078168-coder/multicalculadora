/* ===================================================
   Calculadora 19: Área de Figuras
   (ID HTML: area_figuras)
   =================================================== */

/**
 * IDs HTML leídos de tu HTML:
 * - select Figura: 'tipo-figura-area'
 * - input Dimensión 1: 'dim1-area'
 * - input Dimensión 2: 'dim2-area'
 * - display: 'display-area_figuras'
 * - resultado: 'resultado-area_figuras'
 * - botón Limpiar: onclick="clearDisplay('area_figuras')" 
 */

function calcularArea() {
    // 1. Leer los valores del HTML
    const figura = document.getElementById('tipo-figura-area').value;
    const dim1 = parseFloat(document.getElementById('dim1-area').value);
    const dim2 = parseFloat(document.getElementById('dim2-area').value); 
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-area_figuras');
    const resultadoDiv = document.getElementById('resultado-area_figuras');
    
    // 3. Validar datos básicos (Dimensión 1 es siempre obligatoria y debe ser positiva)
    if (isNaN(dim1) || dim1 <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un valor positivo para la Dimensión 1.';
        return;
    }

    let area = 0;
    let formula = '';

    // 4. Calcular el Área según la figura
    switch (figura) {
        case 'cuadrado':
            // Área = Lado * Lado
            area = dim1 * dim1;
            formula = `Lado × Lado = ${dim1} × ${dim1}`;
            break;
            
        case 'rectangulo':
            // Área = Base * Altura (Requiere Dimensión 2)
            if (isNaN(dim2) || dim2 <= 0) {
                display.innerText = 'Error';
                resultadoDiv.innerHTML = '⚠️ El Rectángulo requiere Altura (Dimensión 2).';
                return;
            }
            area = dim1 * dim2;
            formula = `Base × Altura = ${dim1} × ${dim2}`;
            break;

        case 'triangulo':
            // Área = (Base * Altura) / 2 (Requiere Dimensión 2)
            if (isNaN(dim2) || dim2 <= 0) {
                display.innerText = 'Error';
                resultadoDiv.innerHTML = '⚠️ El Triángulo requiere Altura (Dimensión 2).';
                return;
            }
            area = (dim1 * dim2) / 2;
            formula = `(Base × Altura) / 2 = (${dim1} × ${dim2}) / 2`;
            break;
            
        case 'circulo':
            // Área = π * radio²
            area = Math.PI * dim1 * dim1;
            formula = `π × Radio² = ${Math.PI.toFixed(4)} × ${dim1}²`;
            break;
            
        default:
            display.innerText = '0';
            resultadoDiv.innerHTML = 'Selecciona una figura.';
            return;
    }

    // 5. Mostrar el resultado
    display.innerText = area.toFixed(2);
    resultadoDiv.innerHTML = `Figura: <b>${figura.toUpperCase()}</b>
    <br>Fórmula: ${formula}
    <br>Resultado: <b>${area.toFixed(2)} cm²</b>`;
}



/* ===================================================
   Calculadora 20: Perímetro de Figuras
   (ID HTML: perimetro_figuras)
   =================================================== */

/**
 * IDs HTML leídos de tu HTML:
 * - select Figura: 'tipo-figura-perimetro'
 * - input Dimensión 1: 'dim1-perimetro'
 * - input Dimensión 2: 'dim2-perimetro'
 * - display: 'display-perimetro_figuras'
 * - resultado: 'resultado-perimetro_figuras'
 * - botón Limpiar: onclick="clearDisplay('perimetro_figuras')" 
 */

function calcularPerimetro() {
    // 1. Leer los valores del HTML
    const figura = document.getElementById('tipo-figura-perimetro').value;
    const dim1 = parseFloat(document.getElementById('dim1-perimetro').value);
    const dim2 = parseFloat(document.getElementById('dim2-perimetro').value); 
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-perimetro_figuras');
    const resultadoDiv = document.getElementById('resultado-perimetro_figuras');
    
    // 3. Validar datos básicos (Dimensión 1 es siempre obligatoria y debe ser positiva)
    if (isNaN(dim1) || dim1 <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un valor positivo para la Dimensión 1.';
        return;
    }

    let perimetro = 0;
    let formula = '';

    // 4. Calcular el Perímetro según la figura
    switch (figura) {
        case 'cuadrado':
            // Perímetro = 4 * Lado
            perimetro = 4 * dim1;
            formula = `4 × Lado = 4 × ${dim1}`;
            break;
            
        case 'rectangulo':
            // Perímetro = 2 * (Base + Altura) (Requiere Dimensión 2)
            if (isNaN(dim2) || dim2 <= 0) {
                display.innerText = 'Error';
                resultadoDiv.innerHTML = '⚠️ El Rectángulo requiere Altura (Dimensión 2).';
                return;
            }
            perimetro = 2 * (dim1 + dim2);
            formula = `2 × (Base + Altura) = 2 × (${dim1} + ${dim2})`;
            break;

        case 'triangulo':
             // Simplificación: Asumiremos un triángulo equilátero para usar solo Dim1
             // NOTA: Para un cálculo más completo, necesitarías 3 inputs o lógica para triángulo isósceles/escaleno.
            
            // Asumiendo un Triángulo Equilátero (3 lados iguales)
            perimetro = 3 * dim1;
            formula = `3 × Lado = 3 × ${dim1} (Asumiendo equilátero)`;
            
            // Si quieres que Dim2 sea obligatorio, usa esto:
            // if (isNaN(dim2) || dim2 <= 0) {
            //     display.innerText = 'Error';
            //     resultadoDiv.innerHTML = '⚠️ El Triángulo requiere la longitud de todos sus lados (Base y Altura no son suficientes para perímetro).';
            //     return;
            // }
            // Para simplificar, mantendremos el equilátero, usando Dim1 como el lado.
            break;
            
        case 'circulo':
            // Perímetro = 2 * π * radio (Circunferencia)
            perimetro = 2 * Math.PI * dim1;
            formula = `2 × π × Radio = 2 × ${Math.PI.toFixed(4)} × ${dim1}`;
            break;
            
        default:
            display.innerText = '0';
            resultadoDiv.innerHTML = 'Selecciona una figura.';
            return;
    }

    // 5. Mostrar el resultado
    display.innerText = perimetro.toFixed(2);
    resultadoDiv.innerHTML = `Figura: <b>${figura.toUpperCase()}</b>
    <br>Fórmula: ${formula}
    <br>Resultado: <b>${perimetro.toFixed(2)} cm</b>`;
}

/* ===================================================
   Calculadora 21: Financiera Básica (Interés Simple)
   (ID HTML: financiera_basica)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Capital Inicial: 'input-finanzas-capital'
 * - input Tasa Anual (%): 'input-finanzas-tasa'
 * - input Tiempo (años): 'input-finanzas-tiempo'
 * - display: 'display-financiera_basica'
 * - resultado: 'resultado-financiera_basica'
 * - botón Calcular: onclick="calcularInteresSimple()"
 * - botón Limpiar: onclick="limpiarFinanzas()" <-- ¡Función de limpieza propia!
 */

function calcularInteresSimple() {
    // 1. Leer los valores del HTML
    const capital = parseFloat(document.getElementById('input-finanzas-capital').value);
    const tasa = parseFloat(document.getElementById('input-finanzas-tasa').value);
    const tiempo = parseFloat(document.getElementById('input-finanzas-tiempo').value);
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-financiera_basica');
    const resultadoDiv = document.getElementById('resultado-financiera_basica');
    
    // 3. Validar datos
    if (isNaN(capital) || isNaN(tasa) || isNaN(tiempo) || capital <= 0 || tasa <= 0 || tiempo <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce capital, tasa (%) y tiempo (años) válidos.';
        return;
    }

    // 4. Calcular el Interés Simple (I = C * r * t)
    // Se divide la tasa por 100 para usarla en forma decimal.
    const interes = capital * (tasa / 100) * tiempo;

    // 5. Calcular el Monto Final (Capital + Interés)
    const montoFinal = capital + interes;

    // 6. Mostrar el resultado
    display.innerText = interes.toFixed(2);
    resultadoDiv.innerHTML = `Interés Ganado (I): <b>$${interes.toFixed(2)}</b>
    <br>Monto Final (M): <b>$${montoFinal.toFixed(2)}</b>
    <br><small>Tasa usada: ${tasa}% anual</small>`;
}

/**
 * Función de limpieza específica para la calculadora Financiera.
 * Se llama con onclick="limpiarFinanzas()"
 */
function limpiarFinanzas() {
    // Borra los inputs
    document.getElementById('input-finanzas-capital').value = '';
    document.getElementById('input-finanzas-tasa').value = '';
    document.getElementById('input-finanzas-tiempo').value = '';

    // Resetea los displays
    document.getElementById('display-financiera_basica').innerText = '0';
    document.getElementById('resultado-financiera_basica').innerHTML = '';
}


/* ===================================================
   Calculadora 22: Probabilidad Básica
   (ID HTML: probabilidad_basica)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input Casos Favorables: 'input-prob-favorables'
 * - input Casos Totales: 'input-prob-totales'
 * - display: 'display-probabilidad_basica'
 * - resultado: 'resultado-probabilidad_basica'
 * - botón Calcular: onclick="calcularProbabilidadBasica()"
 * - botón Limpiar: onclick="limpiarProbabilidadBasica()" <-- Función de limpieza propia
 */

function calcularProbabilidadBasica() {
    // 1. Leer los valores del HTML
    const favorables = parseInt(document.getElementById('input-prob-favorables').value, 10);
    const totales = parseInt(document.getElementById('input-prob-totales').value, 10);
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-probabilidad_basica');
    const resultadoDiv = document.getElementById('resultado-probabilidad_basica');
    
    // 3. Validar datos
    if (isNaN(favorables) || isNaN(totales) || totales <= 0 || favorables < 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce números enteros positivos. Casos Totales > 0.';
        return;
    }
    
    // 4. Validar la lógica
    if (favorables > totales) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Los Casos Favorables no pueden ser mayores que los Casos Totales.';
        return;
    }

    // 5. Calcular la Probabilidad (P = F / T)
    const probabilidadDecimal = favorables / totales;
    const probabilidadPorcentaje = probabilidadDecimal * 100;

    // 6. Mostrar el resultado
    display.innerText = probabilidadPorcentaje.toFixed(2) + "%";
    resultadoDiv.innerHTML = `Probabilidad (P): <b>${probabilidadDecimal.toFixed(4)}</b> (decimal)
    <br>Probabilidad (%): <b>${probabilidadPorcentaje.toFixed(2)}%</b>
    <br><small>Fórmula: ${favorables} / ${totales}</small>`;
}

/**
 * Función de limpieza específica para la calculadora de Probabilidad Básica.
 * Se llama con onclick="limpiarProbabilidadBasica()"
 */
function limpiarProbabilidadBasica() {
    // Borra los inputs
    document.getElementById('input-prob-favorables').value = '';
    document.getElementById('input-prob-totales').value = '';

    // Resetea los displays
    document.getElementById('display-probabilidad_basica').innerText = '0';
    document.getElementById('resultado-probabilidad_basica').innerHTML = '';
}


/* ===================================================
   Calculadora 23: Probabilidad Avanzada (Permutaciones)
   (ID HTML: probabilidad_avanzada)
   =================================================== */

/**
 * IDs HTML esperados:
 * - input n (Total de elementos): 'input-perm-n'
 * - input k (Elementos a ordenar): 'input-perm-k'
 * - display: 'display-probabilidad_avanzada'
 * - resultado: 'resultado-probabilidad_avanzada'
 * - botón Calcular: onclick="calcularPermutacion()"
 * - botón Limpiar: onclick="limpiarPermutacion()" <-- Función de limpieza propia
 */

// Función auxiliar para calcular el factorial (n!)
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
        // Límite de seguridad para evitar números demasiado grandes en JS (9007199254740991)
        if (resultado > 1e18) { 
            console.warn("Factorial excede el límite de precisión seguro de JS.");
            return Infinity; // Devuelve infinito si es demasiado grande
        }
    }
    return resultado;
}

function calcularPermutacion() {
    // 1. Leer los valores del HTML
    const n = parseInt(document.getElementById('input-perm-n').value, 10);
    const k = parseInt(document.getElementById('input-perm-k').value, 10);
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-probabilidad_avanzada');
    const resultadoDiv = document.getElementById('resultado-probabilidad_avanzada');
    
    // 3. Validar datos
    if (isNaN(n) || isNaN(k) || n < 0 || k < 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce números enteros no negativos.';
        return;
    }
    
    // 4. Validar la lógica
    if (k > n) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ **k** (Elementos a ordenar) no puede ser mayor que **n** (Total de elementos).';
        return;
    }

    // 5. Calcular la Permutación P(n, k) = n! / (n - k)!
    const numerador = factorial(n);
    const denominador = factorial(n - k);
    
    const permutacion = numerador / denominador;

    // 6. Mostrar el resultado
    if (permutacion === Infinity) {
        display.innerText = '¡Demasiado grande!';
        resultadoDiv.innerHTML = 'El resultado excede el límite de cálculo seguro de JavaScript.';
    } else {
        display.innerText = permutacion.toLocaleString('es-ES'); // Formato de número local
        resultadoDiv.innerHTML = `Fórmula: P(${n}, ${k}) = n! / (n - k)!
        <br>Formas de ordenar: <b>${permutacion.toLocaleString('es-ES')}</b>`;
    }
}

/**
 * Función de limpieza específica para la calculadora de Permutación.
 * Se llama con onclick="limpiarPermutacion()"
 */
function limpiarPermutacion() {
    // Borra los inputs
    document.getElementById('input-perm-n').value = '';
    document.getElementById('input-perm-k').value = '';

    // Resetea los displays
    document.getElementById('display-probabilidad_avanzada').innerText = '0';
    document.getElementById('resultado-probabilidad_avanzada').innerHTML = '';
}
/* ===================================================
   Calculadora 24: Volumen de Sólidos
   (ID HTML: volumen_solidos)
   =================================================== */

function calcularVolumen() {
    // 1. Leer los valores del HTML
    const figura = document.getElementById('select-volumen-figura').value;
    const param1 = parseFloat(document.getElementById('input-volumen-param1').value);
    const param2 = parseFloat(document.getElementById('input-volumen-param2').value); 
    
    // 2. Apuntar a los displays de resultado
    const display = document.getElementById('display-volumen_solidos');
    const resultadoDiv = document.getElementById('resultado-volumen_solidos');
    
    // 3. Validar datos básicos
    if (isNaN(param1) || param1 <= 0) {
        display.innerText = 'Error';
        resultadoDiv.innerHTML = '⚠️ Introduce un valor positivo para la dimensión principal (Lado/Radio).';
        return;
    }

    let volumen = 0;
    let formula = '';

    // 4. Calcular el Volumen según la figura
    switch (figura) {
        case 'cubo':
            // Volumen = Lado³
            volumen = param1 * param1 * param1;
            formula = `Lado³ = ${param1}³`;
            break;
            
        case 'esfera':
            // Volumen = (4/3) * π * radio³
            volumen = (4 / 3) * Math.PI * param1 * param1 * param1;
            formula = `(4/3) \\times \\pi \\times \\text{Radio}^3`;
            break;
            
        case 'cilindro':
            if (isNaN(param2) || param2 <= 0) {
                display.innerText = 'Error';
                resultadoDiv.innerHTML = '⚠️ El cilindro requiere Radio (Dim. 1) y Altura (Dim. 2).';
                return;
            }
            // Volumen = π * radio² * altura
            volumen = Math.PI * param1 * param1 * param2;
            formula = `\\pi \\times \\text{Radio}^2 \\times \\text{Altura}`;
            break;
            
        default:
            display.innerText = '0';
            resultadoDiv.innerHTML = 'Selecciona una figura.';
            return;
    }

    // 5. Mostrar el resultado
    display.innerText = volumen.toFixed(2);
    // Para mostrar la fórmula de manera limpia
    let formulaDisplay = formula.replace('\\pi', Math.PI.toFixed(4)).replace('\\times', '×').replace('\\text{Radio}', param1).replace('\\text{Altura}', param2 || '').replace(/\\/g, '');
    formulaDisplay = formulaDisplay.replace(/\^/g, '<sup>').replace('³', '<sup>3</sup>').replace('²', '<sup>2</sup>');

    resultadoDiv.innerHTML = `Figura: <b>${figura.toUpperCase()}</b>
    <br>Fórmula: ${formulaDisplay}
    <br>Resultado: <b>${volumen.toFixed(2)} u³</b>`;
}

/**
 * Función de limpieza específica para la calculadora de Volumen.
 * Esta función limpia los inputs y los displays, pero NO toca la selección del menú.
 */
function limpiarVolumen() {
    // 1. Borra ambos inputs
    document.getElementById('input-volumen-param1').value = '';
    document.getElementById('input-volumen-param2').value = '';
    
    // 2. Resetea los displays
    document.getElementById('display-volumen_solidos').innerText = '0';
    document.getElementById('resultado-volumen_solidos').innerHTML = '';
}