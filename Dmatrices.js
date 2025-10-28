/* ============================================================
   Dmatrices.js - Calculadora 31: Determinante de Matrices
   Versión corregida para tu HTML actual (2x2 y 3x3)
   ============================================================ */

// Función para mostrar inputs según tamaño seleccionado
// Mostrar inputs según tamaño seleccionado (2x2 o 3x3)
function mostrarInputsDeterminante() {
    const size = document.getElementById('select-det-size').value;
    const container = document.getElementById('det-inputs-container');

    // Limpiar contenedor
    container.innerHTML = '';

    // Estilo compacto para los inputs
    const inputStyle = 'width:50px; height:28px; font-size:16px; text-align:center; margin:2px;';

    if (size === '2x2') {
        container.innerHTML = `
            <h4 style="margin-bottom:5px;">Matriz 2x2</h4>
            <table class="matrix-input-table">
                <tr>
                    <td><input type="number" id="a11" placeholder="a11" style="${inputStyle}"></td>
                    <td><input type="number" id="a12" placeholder="a12" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="a21" placeholder="a21" style="${inputStyle}"></td>
                    <td><input type="number" id="a22" placeholder="a22" style="${inputStyle}"></td>
                </tr>
            </table>
        `;
    } else if (size === '3x3') {
        container.innerHTML = `
            <h4 style="margin-bottom:5px;">Matriz 3x3</h4>
            <table class="matrix-input-table">
                <tr>
                    <td><input type="number" id="a11" placeholder="a11" style="${inputStyle}"></td>
                    <td><input type="number" id="a12" placeholder="a12" style="${inputStyle}"></td>
                    <td><input type="number" id="a13" placeholder="a13" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="a21" placeholder="a21" style="${inputStyle}"></td>
                    <td><input type="number" id="a22" placeholder="a22" style="${inputStyle}"></td>
                    <td><input type="number" id="a23" placeholder="a23" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="a31" placeholder="a31" style="${inputStyle}"></td>
                    <td><input type="number" id="a32" placeholder="a32" style="${inputStyle}"></td>
                    <td><input type="number" id="a33" placeholder="a33" style="${inputStyle}"></td>
                </tr>
            </table>
        `;
    }
}

// Limpiar inputs y resultado
function limpiarDeterminante() {
    const container = document.getElementById('det-inputs-container');
    const inputs = container.querySelectorAll('input');
    inputs.forEach(inp => inp.value = '');
    document.getElementById('resultado-determinante_matrices').innerHTML = '';
}

// Calcular determinante
function calcularDeterminante() {
    const container = document.getElementById('det-inputs-container');
    const size = document.getElementById('select-det-size').value;
    const resultado = document.getElementById('resultado-determinante_matrices');

    // Leer todos los inputs dentro del contenedor
    const inputs = container.querySelectorAll('input');
    const values = [];
    inputs.forEach(inp => {
        values.push(parseFloat(inp.value) || 0); // si está vacío, tomar 0
    });

    let det = 0;

    if (size === '2x2') {
        const [a11, a12, a21, a22] = values;
        det = a11*a22 - a12*a21;
    } else if (size === '3x3') {
        const [a11, a12, a13, a21, a22, a23, a31, a32, a33] = values;
        det = a11*(a22*a33 - a23*a32) - a12*(a21*a33 - a23*a31) + a13*(a21*a32 - a22*a31);
    }

    resultado.innerHTML = `<strong>Determinante: ${det}</strong>`;
}

// Inicializar al cargar la página y ajustar estilos de la base, display y select
window.addEventListener('load', () => {
    mostrarInputsDeterminante();

    // Contenedor principal
    const calc = document.getElementById('determinante_matrices');
    calc.style.width = '320px';
    calc.style.padding = '15px';
    calc.style.border = '1px solid #ccc';
    calc.style.borderRadius = '8px';
    calc.style.backgroundColor = '#f5f5f5';
    calc.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)';
    calc.style.fontFamily = 'Arial, sans-serif';

    // Display
    const display = document.getElementById('display-determinante_matrices');
    display.style.fontSize = '20px';
    display.style.height = '40px';
    display.style.lineHeight = '40px';
    display.style.padding = '0 10px';
    display.style.border = '1px solid #ccc';
    display.style.borderRadius = '5px';
    display.style.backgroundColor = '#fff';
    display.style.width = '100%';
    display.style.boxSizing = 'border-box';
    display.style.marginBottom = '10px';

    // Select (desplegable)
    const select = document.getElementById('select-det-size');
    select.style.fontSize = '16px';
    select.style.padding = '5px 10px';
    select.style.borderRadius = '5px';
    select.style.border = '1px solid #888';
    select.style.backgroundColor = '#fff';
    select.style.marginBottom = '10px';
    select.style.cursor = 'pointer';
    select.style.width = '100px';

    // Botones
    const botones = calc.querySelectorAll('button');
    botones.forEach(btn => {
        btn.style.padding = '5px 10px';
        btn.style.fontSize = '16px';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.border = '1px solid #888';
        btn.style.backgroundColor = '#e0e0e0';
        btn.style.flex = '1 1 45%';
        btn.style.boxSizing = 'border-box';
        btn.style.minWidth = '60px';
        btn.style.margin = '3px';
    });

    // Asegurar que los botones no se salgan del contenedor
    const botonesDiv = calc.querySelector('.buttons');
    botonesDiv.style.display = 'flex';
    botonesDiv.style.flexWrap = 'wrap';
    botonesDiv.style.justifyContent = 'center';
    botonesDiv.style.gap = '5px';
});


/* ============================================================
   Dmatrices.js - Calculadora 32: Inversa de Matrices
   Compatible con tu HTML actual (2x2 y 3x3)
   ============================================================ */

// Función para mostrar inputs según tamaño seleccionado
// Mostrar inputs según tamaño seleccionado (2x2 o 3x3)
function mostrarInputsInversa() {
    const size = document.getElementById('select-inv-size').value;
    const container = document.getElementById('inv-inputs-container');

    // Limpiar contenedor
    container.innerHTML = '';

    // Estilo compacto para los inputs
    const inputStyle = 'width:50px; height:28px; font-size:16px; text-align:center; margin:2px;';

    if (size === '2x2') {
        container.innerHTML = `
            <h4 style="margin-bottom:5px;">Matriz 2x2</h4>
            <table class="matrix-input-table">
                <tr>
                    <td><input type="number" id="b11" placeholder="b11" style="${inputStyle}"></td>
                    <td><input type="number" id="b12" placeholder="b12" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="b21" placeholder="b21" style="${inputStyle}"></td>
                    <td><input type="number" id="b22" placeholder="b22" style="${inputStyle}"></td>
                </tr>
            </table>
        `;
    } else if (size === '3x3') {
        container.innerHTML = `
            <h4 style="margin-bottom:5px;">Matriz 3x3</h4>
            <table class="matrix-input-table">
                <tr>
                    <td><input type="number" id="b11" placeholder="b11" style="${inputStyle}"></td>
                    <td><input type="number" id="b12" placeholder="b12" style="${inputStyle}"></td>
                    <td><input type="number" id="b13" placeholder="b13" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="b21" placeholder="b21" style="${inputStyle}"></td>
                    <td><input type="number" id="b22" placeholder="b22" style="${inputStyle}"></td>
                    <td><input type="number" id="b23" placeholder="b23" style="${inputStyle}"></td>
                </tr>
                <tr>
                    <td><input type="number" id="b31" placeholder="b31" style="${inputStyle}"></td>
                    <td><input type="number" id="b32" placeholder="b32" style="${inputStyle}"></td>
                    <td><input type="number" id="b33" placeholder="b33" style="${inputStyle}"></td>
                </tr>
            </table>
        `;
    }
}

// Limpiar inputs y resultado
function limpiarInversa() {
    const container = document.getElementById('inv-inputs-container');
    const inputs = container.querySelectorAll('input');
    inputs.forEach(inp => inp.value = '');
    document.getElementById('resultado-inversa_matrices').innerHTML = '';
}

// Calcular inversa
function calcularInversa() {
    const container = document.getElementById('inv-inputs-container');
    const size = document.getElementById('select-inv-size').value;
    const resultado = document.getElementById('resultado-inversa_matrices');

    const inputs = container.querySelectorAll('input');
    const values = [];
    inputs.forEach(inp => values.push(parseFloat(inp.value) || 0));

    let inv = null;

    if (size === '2x2') {
        const [b11,b12,b21,b22] = values;
        const det = b11*b22 - b12*b21;
        if (det === 0) {
            resultado.innerHTML = "<strong>La matriz no tiene inversa (det=0)</strong>";
            return;
        }
        inv = [
            [ b22/det, -b12/det],
            [-b21/det,  b11/det]
        ];
    } else if (size === '3x3') {
        const [b11,b12,b13,b21,b22,b23,b31,b32,b33] = values;
        const det = b11*(b22*b33 - b23*b32) - b12*(b21*b33 - b23*b31) + b13*(b21*b32 - b22*b31);
        if (det === 0) {
            resultado.innerHTML = "<strong>La matriz no tiene inversa (det=0)</strong>";
            return;
        }
        inv = [
            [
                (b22*b33 - b23*b32)/det,
                -(b12*b33 - b13*b32)/det,
                (b12*b23 - b13*b22)/det
            ],
            [
                -(b21*b33 - b23*b31)/det,
                (b11*b33 - b13*b31)/det,
                -(b11*b23 - b13*b21)/det
            ],
            [
                (b21*b32 - b22*b31)/det,
                -(b11*b32 - b12*b31)/det,
                (b11*b22 - b12*b21)/det
            ]
        ];
    }

    // Mostrar resultado
    if (inv) {
        let html = "<strong>Inversa:</strong><br><table class='matrix-result'>";
        inv.forEach(row => {
            html += "<tr>";
            row.forEach(val => html += `<td>${val.toFixed(4)}</td>`);
            html += "</tr>";
        });
        html += "</table>";
        resultado.innerHTML = html;
    }
}

// Inicializar al cargar la página y ajustar estilos
window.addEventListener('load', () => {
    mostrarInputsInversa();

    // Contenedor principal
    const calc = document.getElementById('inversa_matrices');
    calc.style.width = '320px';
    calc.style.padding = '15px';
    calc.style.border = '1px solid #ccc';
    calc.style.borderRadius = '8px';
    calc.style.backgroundColor = '#f5f5f5';
    calc.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.1)';
    calc.style.fontFamily = 'Arial, sans-serif';

    // Display (resultado)
    const resultado = document.getElementById('resultado-inversa_matrices');
    resultado.style.fontSize = '18px';
    resultado.style.padding = '5px 10px';
    resultado.style.backgroundColor = '#fff';
    resultado.style.border = '1px solid #ccc';
    resultado.style.borderRadius = '5px';
    resultado.style.width = '100%';
    resultado.style.boxSizing = 'border-box';
    resultado.style.marginBottom = '10px';

    // Select (desplegable)
    const select = document.getElementById('select-inv-size');
    select.style.fontSize = '16px';
    select.style.padding = '5px 10px';
    select.style.borderRadius = '5px';
    select.style.border = '1px solid #888';
    select.style.backgroundColor = '#fff';
    select.style.marginBottom = '10px';
    select.style.cursor = 'pointer';
    select.style.width = '100px';

    // Botones
    const botones = calc.querySelectorAll('button');
    botones.forEach(btn => {
        btn.style.padding = '5px 10px';
        btn.style.fontSize = '16px';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.border = '1px solid #888';
        btn.style.backgroundColor = '#e0e0e0';
        btn.style.flex = '1 1 45%';
        btn.style.boxSizing = 'border-box';
        btn.style.minWidth = '60px';
        btn.style.margin = '3px';
    });

    // Contenedor de botones
    const botonesDiv = calc.querySelector('.buttons');
    botonesDiv.style.display = 'flex';
    botonesDiv.style.flexWrap = 'wrap';
    botonesDiv.style.justifyContent = 'center';
    botonesDiv.style.gap = '5px';
});



// ============================================================
// CALCULADORA 33: ROI
// ============================================================
/* =========================
   1️⃣ Estilos CSS dinámicos
========================= */
const style = document.createElement('style');
style.textContent = `
.calculator {
    width: 350px;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 8px;
    background-color: #f5f5f5;
}
.display {
    font-size: 18px;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}
.buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
input[type=number] {
    width: 100px;
    padding: 3px;
    margin: 2px;
}
.botones-base button {
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #888;
    background-color: #e0e0e0;
    margin-right: 5px;
}
.resultado {
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
}
`;
document.head.appendChild(style);

/* =========================
   2️⃣ Limpiar inputs y resultados
========================= */
function limpiarROI() {
    document.getElementById('inversion').value = '';
    document.getElementById('ganancia').value = '';
    document.getElementById('resultado-roi').innerText = '';
    document.getElementById('display-roi').innerText = '0';
}

/* =========================
   3️⃣ Calcular ROI
========================= */
function calcularROI() {
    const inversion = Number(document.getElementById('inversion').value);
    const ganancia = Number(document.getElementById('ganancia').value);

    if (isNaN(inversion) || isNaN(ganancia)) {
        alert('Todos los campos deben tener un número válido.');
        return;
    }
    if (inversion === 0) {
        alert('La inversión inicial no puede ser 0.');
        return;
    }

    const roi = (ganancia / inversion) * 100;

    document.getElementById('resultado-roi').innerText = `ROI = ${roi.toFixed(2)}%`;
    document.getElementById('display-roi').innerText = `ROI=${roi.toFixed(2)}%`;
}

/* =========================
   4️⃣ Inicializar
========================= */
window.addEventListener('load', () => {
    document.getElementById('btn-calcular-roi').addEventListener('click', calcularROI);
    document.getElementById('btn-limpiar-roi').addEventListener('click', limpiarROI);
});





// =====================
// Calculadora 34: Desviación Estándar / Varianza (Precisión Numéricamente Estable)
// =====================

/**
 * Función principal (Controlador de la UI)
 * Se encarga de leer el DOM, validar la entrada y mostrar el resultado.
 */
function calcularDesviacion() {
    const datosInput = document.getElementById('datos-desviacion').value.trim();
    if (!datosInput) {
        alert("Por favor ingresa los datos.");
        return;
    }

    // 1. Limpiar y parsear la entrada
    const datos = datosInput.split(',')
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x) && isFinite(x)); // Asegurarse de que sean números finitos

    if (datos.length === 0) {
        alert("No se encontraron datos numéricos válidos.");
        return;
    }

    const tipo = document.getElementById('tipoCalculo-desviacion').value;
    const resultadoEl = document.getElementById('resultado-desviacion');

    // 2. Calcular todas las estadísticas base de forma estable
    //    Esta función es el núcleo de la mejora.
    const stats = calcularEstadisticasEstables(datos);

    let valorResultado;
    let etiqueta = "";

    // 3. Decidir qué mostrar basado en la selección del usuario
    switch (tipo) {
        case 'poblacional':
            etiqueta = "Desviación Estándar Poblacional";
            valorResultado = Math.sqrt(stats.popVariance);
            break;

        case 'muestral':
            if (stats.count < 2) {
                alert("Se requiere al menos 2 datos para el cálculo muestral.");
                return;
            }
            etiqueta = "Desviación Estándar Muestral";
            valorResultado = Math.sqrt(stats.sampleVariance);
            break;

        case 'varianza':
            // NOTA: Tu HTML original no permite elegir entre varianza poblacional o muestral.
            // El código original calculaba la poblacional.
            // Para ser más completo, mostramos ambas.
            const vPop = formatResultado(stats.popVariance);
            const vMuestra = formatResultado(stats.sampleVariance);
            
            resultadoEl.innerHTML = `Varianza Poblacional: <strong>${vPop}</strong><br>Varianza Muestral: <strong>${vMuestra}</strong>`;
            return; // Salimos temprano ya que el formato es especial

        default:
             alert("Tipo de cálculo no reconocido.");
             return;
    }
    
    // 4. Mostrar el resultado formateado
    resultadoEl.innerHTML = `${etiqueta}: <strong>${formatResultado(valorResultado)}</strong>`;
}

// =====================
// Funciones de Cálculo (Lógica Pura)
// =====================

/**
 * Calcula estadísticas clave usando el algoritmo en línea de Welford.
 * Este método es numéricamente estable y mucho más robusto que el método
 * de dos pasadas (calcular media, luego sumar cuadrados de diferencias),
 * que es vulnerable a errores de precisión ("cancelación catastrófica").
 * Resuelve los casos "difíciles" de forma eficiente.
 *
 * @param {number[]} datos - El array de números.
 * @returns {object} Un objeto con { count, mean, popVariance, sampleVariance }.
 */
function calcularEstadisticasEstables(datos) {
    let count = 0;
    let mean = 0;
    let M2 = 0; // Suma de los cuadrados de las diferencias con la media actual

    for (const x of datos) {
        count++;
        let delta = x - mean;
        mean += delta / count;
        let delta2 = x - mean; // Usar la *nueva* media actualizada
        M2 += delta * delta2;
    }

    if (count === 0) {
        return { count: 0, mean: NaN, popVariance: NaN, sampleVariance: NaN };
    }

    const popVariance = M2 / count; // Varianza poblacional (dividir por N)
    const sampleVariance = (count > 1) ? (M2 / (count - 1)) : NaN; // Varianza muestral (dividir por N-1)

    return {
        count: count,
        mean: mean,
        popVariance: popVariance,
        sampleVariance: sampleVariance,
    };
}

// =====================
// Funciones Auxiliares
// =====================

/**
 * Formatea un número para mostrar en la UI, manejando casos indefinidos.
 * @param {number} num - El número a formatear.
 * @param {number} [decimales=4] - El número de decimales a mostrar.
 * @returns {string} El número formateado como string.
 */
function formatResultado(num, decimales = 4) {
     if (isNaN(num) || !isFinite(num)) {
         return "Indefinido"; // Ocurre p.ej. en varianza muestral con n=1
     }
     // Usamos toFixed para redondear, pero convertimos de nuevo a número
     // para eliminar ceros decimales innecesarios si los hubiera,
     // aunque para .toFixed() esto no es estrictamente necesario, es buena práctica.
     // Para este caso, toFixed es suficiente y más simple.
     return num.toFixed(decimales);
}


/**
 * Limpia los campos de entrada y resultado.
 */
function limpiarDesviacion() {
    document.getElementById('datos-desviacion').value = '';
    document.getElementById('resultado-desviacion').innerHTML = '';
}

// Se eliminaron las funciones anteriores (media, varianza, desviacionPoblacional, etc.)
// porque `calcularEstadisticasEstables` las reemplaza a todas de una
// manera más eficiente y numéricamente estable.



// ==============================
// Calculadora 35: Regresión Lineal
// ==============================

function calcularRegresionLineal() {
    const input = document.getElementById("datos-regresion").value.trim();
    if (!input) {
        alert("Por favor, ingresa los pares de datos.");
        return;
    }

    try {
        // Parsear datos: "1,2; 2,3; 3,5"
        const pares = input.split(";").map(par => par.trim()).filter(p => p);
        const x = [], y = [];

        pares.forEach(par => {
            const [xVal, yVal] = par.split(",").map(Number);
            if (isNaN(xVal) || isNaN(yVal)) throw new Error("Formato inválido en los datos.");
            x.push(xVal);
            y.push(yVal);
        });

        if (x.length < 2) {
            alert("Se necesitan al menos dos puntos para calcular una regresión lineal.");
            return;
        }

        // Calcular promedios
        const n = x.length;
        const meanX = x.reduce((a, b) => a + b, 0) / n;
        const meanY = y.reduce((a, b) => a + b, 0) / n;

        // Calcular pendiente (m) e intersección (b)
        let num = 0, den = 0;
        for (let i = 0; i < n; i++) {
            num += (x[i] - meanX) * (y[i] - meanY);
            den += (x[i] - meanX) ** 2;
        }
        const m = num / den;
        const b = meanY - m * meanX;

        // Calcular correlación r
        let sumXY = 0, sumX2 = 0, sumY2 = 0;
        for (let i = 0; i < n; i++) {
            sumXY += (x[i] - meanX) * (y[i] - meanY);
            sumX2 += (x[i] - meanX) ** 2;
            sumY2 += (y[i] - meanY) ** 2;
        }
        const r = sumXY / Math.sqrt(sumX2 * sumY2);

        // Mostrar resultados
        document.getElementById("resultado-regresion").innerHTML = `
            <strong>Ecuación de la recta:</strong> y = ${m.toFixed(4)}x + ${b.toFixed(4)}<br>
            <strong>Pendiente (m):</strong> ${m.toFixed(4)}<br>
            <strong>Intersección (b):</strong> ${b.toFixed(4)}<br>
            <strong>Coeficiente de correlación (r):</strong> ${r.toFixed(4)}
        `;
    } catch (err) {
        alert("Error: " + err.message);
    }
}

function limpiarRegresion() {
    document.getElementById("datos-regresion").value = "";
    document.getElementById("resultado-regresion").innerHTML = "";
}
