// Archivo: cientifica.js (Código Corregido para Precisión y Grados)

/**
 * Variables de estado para la calculadora científica.
 */
let scientificDisplay = document.getElementById('display-cientifica');
let currentScientificExpression = '0';
let scientificMemory = 0;
let scientificAns = 0;

// =========================================================================
// Funciones de ayuda para manejar grados y precisión
// =========================================================================

// Conversor de Grados a Radianes
const D2R = (degrees) => degrees * (Math.PI / 180);

// Funciones trigonométricas que esperan entrada en GRADOS
const sin_deg = (x) => Math.sin(D2R(x));
const cos_deg = (x) => Math.cos(D2R(x));
const tan_deg = (x) => Math.tan(D2R(x));

// Funciones trigonométricas inversas que devuelven GRADOS
const asin_deg = (x) => Math.asin(x) * (180 / Math.PI);
const acos_deg = (x) => Math.acos(x) * (180 / Math.PI);
const atan_deg = (x) => Math.atan(x) * (180 / Math.PI);

/**
 * Evalúa una expresión matemática y aplica corrección de precisión.
 */
function evaluateExpression(expression) {
    // Definimos las funciones de grado dentro del alcance de la evaluación.
    const func = new Function('sin_deg', 'cos_deg', 'tan_deg', 'asin_deg', 'acos_deg', 'atan_deg', '"use strict";return (' + expression + ')');
    
    // Llamamos a la función con nuestras implementaciones de grado.
    let result = func(sin_deg, cos_deg, tan_deg, asin_deg, acos_deg, atan_deg);
    
    // CORRECCIÓN DE PRECISIÓN: Redondea a 15 decimales y luego convierte a número flotante
    // para manejar los errores de coma flotante de JS.
    return parseFloat(result.toFixed(15));
}
// =========================================================================


/**
 * Actualiza la expresión actual en la pantalla de la calculadora científica.
 */
function updateScientificDisplay() {
    // Reemplaza las nuevas funciones de grado por sus símbolos de usuario
    let displayValue = currentScientificExpression
        .replace(/sin_deg\(/g, 'sin(')
        .replace(/cos_deg\(/g, 'cos(')
        .replace(/tan_deg\(/g, 'tan(')
        .replace(/asin_deg\(/g, 'sin⁻¹(')
        .replace(/acos_deg\(/g, 'cos⁻¹(')
        .replace(/atan_deg\(/g, 'tan⁻¹(')
        // Resto de reemplazos no trigonométricos
        .replace(/\*\*/g, '^')
        .replace(/Math\.log10\(/g, 'log(')
        .replace(/Math\.log\(/g, 'ln(')
        .replace(/Math\.pow\(10,/g, '10^')
        .replace(/Math\.exp\(/g, 'e^')
        .replace(/\*/g, '×')
        .replace(/\//g, '÷')
        .replace(/Math\.PI/g, 'π')
        .replace(/e\+/g, 'E')
        .replace(/E\+/g, 'E')
        .replace(/\*2/g, '²')
        .replace(/Math\.sqrt\(/g, '√(');
    
    scientificDisplay.innerText = (displayValue === '' || displayValue === '0') ? '0' : displayValue;
}

/**
 * Agrega un valor/operación a la expresión actual de la calculadora científica.
 */
function appendValue(calculatorId, value) {
    if (calculatorId !== 'cientifica') return;

    if (currentScientificExpression === '0') {
        currentScientificExpression = '';
    }

    // Usamos las nuevas funciones de grado en la lógica de 'appendValue'
    const funcMappings = {
        'Math.sin(': 'sin_deg(',
        'Math.cos(': 'cos_deg(',
        'Math.tan(': 'tan_deg(',
        'Math.asin(': 'asin_deg(',
        'Math.acos(': 'acos_deg(',
        'Math.atan(': 'atan_deg(',
        // Dejamos las otras funciones como estaban (logaritmos, potencias, etc.)
        'Math.log10(': 'Math.log10(',
        'Math.log(': 'Math.log(',
        'Math.pow(10,': 'Math.pow(10,',
        'Math.exp(': 'Math.exp(',
        'Math.sqrt(': 'Math.sqrt('
    };

    let appended = false;
    // 1. Manejo de funciones con paréntesis
    for (const key in funcMappings) {
        // El HTML usa los valores originales ('Math.sin(')
        if (value === key) { 
            currentScientificExpression += funcMappings[key]; // Insertamos la versión '..._deg('
            appended = true;
            break;
        }
    }
    
    // 2. Manejo del resto de botones
    if (!appended) {
        switch (value) {
            case 'SHIFT':
            case 'ALPHA':
            case 'MODE':
            case 'hyp':
            case 'ENG':
            case 'RCL':
                break;
            case '×':
                currentScientificExpression += '*';
                break;
            case '÷':
                currentScientificExpression += '/';
                break;
            case 'x⁻¹':
                currentScientificExpression = `(1/(${currentScientificExpression}))`;
                break;
            case '**2':
                currentScientificExpression += '**2';
                break;
            case 'Ans':
                currentScientificExpression += scientificAns;
                break;
            case 'M+':
                try {
                    scientificMemory += evaluateExpression(currentScientificExpression);
                    scientificDisplay.innerText = `M=${scientificMemory.toFixed(5)}`;
                    setTimeout(updateScientificDisplay, 1000); 
                } catch (error) {
                    scientificDisplay.innerText = 'Error';
                }
                break;
            case '^':
                currentScientificExpression += '**';
                break;
            case 'π':
                currentScientificExpression += 'Math.PI';
                break;
            default:
                currentScientificExpression += value;
                break;
        }
    }
    
    updateScientificDisplay();
}

/**
 * Limpia la pantalla y reinicia la expresión a '0'.
 */
function clearDisplay(calculatorId) {
    if (calculatorId !== 'cientifica') return;
    currentScientificExpression = '0';
    updateScientificDisplay();
}

/**
 * Borra el último carácter o función de la expresión, incluyendo las nuevas funciones de grado.
 */
function deleteLast(calculatorId) {
    if (calculatorId !== 'cientifica') return;

    // Lógica para borrar los códigos largos (incluyendo las nuevas funciones)
    if (currentScientificExpression.endsWith('sin_deg(') || currentScientificExpression.endsWith('cos_deg(') || currentScientificExpression.endsWith('tan_deg(') || currentScientificExpression.endsWith('asin_deg(') || currentScientificExpression.endsWith('acos_deg(') || currentScientificExpression.endsWith('atan_deg(') ) {
         currentScientificExpression = currentScientificExpression.slice(0, -8);
    } else if (currentScientificExpression.endsWith('Math.log10(') || currentScientificExpression.endsWith('Math.sqrt(') || currentScientificExpression.endsWith('Math.exp(')) {
        currentScientificExpression = currentScientificExpression.slice(0, -10);
    } else if (currentScientificExpression.endsWith('Math.log(') || currentScientificExpression.endsWith('Math.pow(10,') || currentScientificExpression.endsWith('Math.PI')) {
        currentScientificExpression = currentScientificExpression.slice(0, -9);
    } else if (currentScientificExpression.endsWith('**2')) {
        currentScientificExpression = currentScientificExpression.slice(0, -3);
    } else if (currentScientificExpression.endsWith('**')) {
        currentScientificExpression = currentScientificExpression.slice(0, -2);
    } else {
        currentScientificExpression = currentScientificExpression.slice(0, -1);
    }

    if (currentScientificExpression === '') {
        currentScientificExpression = '0';
    }
    updateScientificDisplay();
}

/**
 * Calcula el resultado final, corrige paréntesis faltantes y usa la evaluación precisa.
 */
function calculateResult(calculatorId) {
    if (calculatorId !== 'cientifica') return;

    let finalExpression = currentScientificExpression;
    
    // LÓGICA DE CORRECCIÓN DE PARÉNTESIS FALTANTES
    let openCount = (finalExpression.match(/\(/g) || []).length;
    let closeCount = (finalExpression.match(/\)/g) || []).length;
    
    if (openCount > closeCount) {
        let missingClosures = openCount - closeCount;
        for (let i = 0; i < missingClosures; i++) {
            finalExpression += ')';
        }
    }

    try {
        // Usa la función evaluateExpression() que maneja grados y precisión
        let result = evaluateExpression(finalExpression); 
        
        scientificAns = result;
        currentScientificExpression = String(result);
        updateScientificDisplay();
    } catch (e) {
        scientificDisplay.innerText = 'Error';
        currentScientificExpression = '0';
    }
}