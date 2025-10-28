let currentBaseProg = 'DEC'; // Estado actual: HEX, DEC, OCT, BIN
let currentNumberProg = 0; // Valor decimal actual de la pantalla
let pendingOperationProg = null;
let firstOperandProg = null;
let waitingForNewInputProg = true;

/**
 * Establece la base de numeración y actualiza la interfaz.
 * @param {string} base - La nueva base ('HEX', 'DEC', 'OCT', 'BIN').
 */
function setBaseProg(base) {
    if (base === currentBaseProg) return;

    currentBaseProg = base;

    // 1. Actualizar el estado de los botones de base
    document.querySelectorAll('#programadora .mode-btn').forEach(btn => {
        btn.classList.remove('active-base');
    });
    document.querySelector(`#programadora .mode-btn[onclick*="'${base}'"]`).classList.add('active-base');

    // 2. Habilitar/Deshabilitar botones de dígitos
    updateDigitButtons();

    // 3. Convertir y actualizar todos los displays
    updateAllBaseDisplays(currentNumberProg);
}

/**
 * Habilita o deshabilita los botones de A-F y 2-9 según la base.
 */
function updateDigitButtons() {
    const isHex = currentBaseProg === 'HEX';
    const isDec = currentBaseProg === 'DEC';
    const isOct = currentBaseProg === 'OCT';

    // Botones A-F (solo HEX)
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(letter => {
        const btn = document.getElementById('btn' + letter);
        if (btn) btn.disabled = !isHex;
    });

    // Botones 8 y 9 (no en OCT ni BIN)
    ['8', '9'].forEach(digit => {
        const btn = document.querySelector(`#programadora button[onclick*="'${digit}'"]`);
        if (btn) btn.disabled = (!isHex && !isDec);
    });

    // Botones 2-7 (no en BIN)
    ['2', '3', '4', '5', '6', '7'].forEach(digit => {
        const btn = document.querySelector(`#programadora button[onclick*="'${digit}'"]`);
        if (btn) btn.disabled = !isHex && !isDec && !isOct;
    });

    // Botones '0' y '1' siempre habilitados.
}


/**
 * Agrega un valor (dígito o letra) a la pantalla de la calculadora programadora.
 * @param {string} value - El dígito o letra a agregar.
 */
function appendValueProg(value) {
    const display = document.getElementById('display-programadora');
    let currentValue = display.innerText;

    if (waitingForNewInputProg || currentValue === '0') {
        currentValue = value;
        waitingForNewInputProg = false;
    } else {
        currentValue += value;
    }

    display.innerText = currentValue;
    currentNumberProg = parseInput(currentValue, currentBaseProg); // Actualiza el valor decimal
    updateAllBaseDisplays(currentNumberProg);
}

/**
 * Realiza una operación binaria o unaria (NOT).
 * @param {string} operator - El operador lógico o aritmético.
 */
function operateProg(operator) {
    const currentValue = currentNumberProg;

    if (operator === '~') {
        // Operador unario: Bitwise NOT
        currentNumberProg = ~currentValue;
        updateAllBaseDisplays(currentNumberProg);
        waitingForNewInputProg = true;
        return;
    }

    if (firstOperandProg === null) {
        firstOperandProg = currentValue;
    } else if (pendingOperationProg) {
        // Si ya hay una operación pendiente, calculamos el resultado intermedio.
        firstOperandProg = performCalculation(firstOperandProg, pendingOperationProg, currentValue);
        updateAllBaseDisplays(firstOperandProg);
    }

    pendingOperationProg = operator;
    waitingForNewInputProg = true;
}

/**
 * Ejecuta el cálculo final.
 */
function calculateProg() {
    if (pendingOperationProg === null || firstOperandProg === null) {
        return;
    }

    const secondOperand = currentNumberProg;
    currentNumberProg = performCalculation(firstOperandProg, pendingOperationProg, secondOperand);

    // Actualiza la pantalla y los displays de base
    updateDisplayProg(currentNumberProg);
    updateAllBaseDisplays(currentNumberProg);

    // Reinicia el estado para la siguiente operación
    firstOperandProg = null;
    pendingOperationProg = null;
    waitingForNewInputProg = true;
}

/**
 * Realiza la operación matemática o lógica.
 * @param {number} num1 - Primer operando (en decimal).
 * @param {string} operator - El operador.
 * @param {number} num2 - Segundo operando (en decimal).
 * @returns {number} - El resultado de la operación (en decimal).
 */
function performCalculation(num1, operator, num2) {
    // Usamos Math.trunc para asegurar que las operaciones se comporten como enteros de 32 bits.
    num1 = Math.trunc(num1);
    num2 = Math.trunc(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            // División entera
            return Math.trunc(num1 / num2);
        case '&': // AND
            return num1 & num2;
        case '|': // OR
            return num1 | num2;
        case '^': // XOR
            return num1 ^ num2;
        case '<<': // Left Shift
            return num1 << num2;
        case '>>': // Right Shift
            // Shift a la derecha con signo (para números negativos)
            return num1 >> num2;
        default:
            return num2;
    }
}

/**
 * Analiza la cadena de entrada en la base actual y devuelve el valor decimal.
 * @param {string} inputStr - La cadena de entrada.
 * @param {string} base - La base de la cadena ('HEX', 'DEC', 'OCT', 'BIN').
 * @returns {number} - El valor decimal.
 */
function parseInput(inputStr, base) {
    let radix;
    switch (base) {
        case 'HEX':
            radix = 16;
            break;
        case 'OCT':
            radix = 8;
            break;
        case 'BIN':
            radix = 2;
            break;
        case 'DEC':
        default:
            radix = 10;
    }
    // parseInt devuelve un entero basado en la base (radix)
    return parseInt(inputStr, radix) || 0;
}

/**
 * Actualiza el display principal con el número formateado en la base actual.
 * @param {number} num - El valor decimal a mostrar.
 */
function updateDisplayProg(num) {
    const display = document.getElementById('display-programadora');
    let str;

    // Convertir el número (entero de 32 bits) a la base actual
    switch (currentBaseProg) {
        case 'HEX':
            str = num.toString(16).toUpperCase();
            break;
        case 'OCT':
            str = num.toString(8);
            break;
        case 'BIN':
            str = num.toString(2);
            break;
        case 'DEC':
        default:
            str = num.toString(10);
    }
    display.innerText = str;
}

/**
 * Actualiza los displays de las diferentes bases (HEX, DEC, OCT, BIN).
 * @param {number} num - El número decimal actual.
 */
function updateAllBaseDisplays(num) {
    // Math.trunc para tratar como enteros de 32 bits (comportamiento de calculadora programadora)
    const integerNum = Math.trunc(num);

    document.getElementById('hex-val-prog').innerText = 'HEX: ' + integerNum.toString(16).toUpperCase();
    document.getElementById('dec-val-prog').innerText = 'DEC: ' + integerNum.toString(10);
    document.getElementById('oct-val-prog').innerText = 'OCT: ' + integerNum.toString(8);
    // Para binario, aseguramos un ancho de bits (p.ej., 32 bits) para NOT, si es necesario,
    // pero para simple visualización solo mostramos la cadena binaria.
    document.getElementById('bin-val-prog').innerText = 'BIN: ' + integerNum.toString(2);

    // También actualizamos el display principal en la base activa
    updateDisplayProg(integerNum);
    currentNumberProg = integerNum;
}

/**
 * Limpia la pantalla principal y reinicia el estado.
 */
function clearDisplayProg() {
    document.getElementById('display-programadora').innerText = '0';
    currentNumberProg = 0;
    firstOperandProg = null;
    pendingOperationProg = null;
    waitingForNewInputProg = true;
    updateAllBaseDisplays(0);
}

/**
 * Elimina el último carácter del display principal.
 */
function backspaceProg() {
    const display = document.getElementById('display-programadora');
    let currentValue = display.innerText;

    if (waitingForNewInputProg) {
        // Si estamos esperando nueva entrada, DEL actúa como CLR
        clearDisplayProg();
        return;
    }

    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
        waitingForNewInputProg = true; // Reinicia si queda solo '0'
    }

    display.innerText = currentValue;
    currentNumberProg = parseInput(currentValue, currentBaseProg);
    updateAllBaseDisplays(currentNumberProg);
}

// Inicializar la calculadora programadora al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Aseguramos que el estado inicial sea Decimal y se muestre correctamente
    setBaseProg('DEC');
    updateAllBaseDisplays(0);
    // Hacemos que la pantalla de la programadora no sea editable por texto
    // para forzar la entrada a través de botones y mantener la base de datos controlada.
    document.getElementById('display-programadora').setAttribute('contenteditable','false');
});