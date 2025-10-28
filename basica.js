/* ===================================================
   Calculadora 1: Calculadora Básica
   (Usa sus propias funciones, NO las genéricas)
   =================================================== */

// --- Variables de estado (Memoria de la calculadora) ---
let currentInput = '0';      // Lo que se ve en el display
let firstOperand = null;   // El primer número guardado
let operator = null;       // El '+', '-', '*', '/' guardado
let shouldResetDisplay = false; // Para limpiar el display después de un operador

/**
 * Se llama al presionar un NÚMERO (0-9) o el PUNTO (.)
 */
function appendToDisplay(value) {
    const display = document.getElementById('display-basica');

    // Si se acaba de presionar un operador o '=', limpia el display
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    // Evita '000' o múltiples '.'
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else if (value === '.' && currentInput.includes('.')) {
        return; // No hacer nada si ya hay un punto
    } else {
        currentInput += value;
    }

    display.innerText = currentInput;
}

/**
 * Se llama al presionar un OPERADOR (+, -, *, /)
 */
function chooseOperator(op) {
    // Si ya hay una operación pendiente, calcúlala primero
    if (firstOperand !== null && operator !== null) {
        calculateResult();
    }

    // Guarda el estado actual
    firstOperand = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true; // Prepara para el siguiente número
}

/**
 * Se llama al presionar el botón de IGUAL (=)
 */
function calculateResult() {
    if (firstOperand === null || operator === null || shouldResetDisplay) {
        return; // No hacer nada si falta algo
    }

    const secondOperand = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+': result = firstOperand + secondOperand; break;
        case '-': result = firstOperand - secondOperand; break;
        case '*': result = firstOperand * secondOperand; break;
        case '/':
            if (secondOperand === 0) {
                alert("Error: División por cero");
                clearBasicCalculator(); // Limpia en caso de error
                return;
            }
            result = firstOperand / secondOperand;
            break;
    }

    // Muestra el resultado y resetea para la siguiente operación
    document.getElementById('display-basica').innerText = result.toString();
    currentInput = result.toString();
    firstOperand = null;
    operator = null;
    shouldResetDisplay = true;
}

/**
 * Se llama al presionar el botón 'C' (Limpiar)
 * ESTA ES LA FUNCIÓN DE LIMPIEZA ESPECIAL
 */
function clearBasicCalculator() {
    // Resetea todas las variables de memoria
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;

    // Limpia el display
    document.getElementById('display-basica').innerText = '0';
}