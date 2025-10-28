
// ============================================================
// CALCULADORA 36. Molaridad y Concentración Química
// ============================================================
function mostrarCamposMolaridad() {
  const tipo = document.getElementById("tipoCalculo-molaridad").value;
  const inputs = document.getElementById("inputs-molaridad");
  const display = document.getElementById("display-molaridad");
  
  if (tipo === "molaridad") {
    inputs.innerHTML = `
      <label>Masa del soluto (g):</label>
      <input type="number" id="masa-mol" placeholder="Ej. 58.44" step="any">
      <label>Masa molar (g/mol):</label>
      <input type="number" id="mm-mol" placeholder="Ej. 58.44 (NaCl)" step="any">
      <label>Volumen de la disolución (L):</label>
      <input type="number" id="volumen-mol" placeholder="Ej. 1" step="any">
    `;
    display.textContent = "Cálculo de Molaridad (M = moles/L)";
  } else if (tipo === "masa") {
    inputs.innerHTML = `
      <label>Molaridad (M):</label>
      <input type="number" id="molaridad-mol" placeholder="Ej. 1" step="any">
      <label>Masa molar (g/mol):</label>
      <input type="number" id="mm-mol" placeholder="Ej. 58.44 (NaCl)" step="any">
      <label>Volumen (L):</label>
      <input type="number" id="volumen-mol" placeholder="Ej. 1" step="any">
    `;
    display.textContent = "Cálculo de Masa del Soluto";
  } else {
    inputs.innerHTML = `
      <label>Masa del soluto (g):</label>
      <input type="number" id="masa-mol" placeholder="Ej. 10" step="any">
      <label>Masa de la disolución (g):</label>
      <input type="number" id="masa-dis" placeholder="Ej. 100" step="any">
    `;
    display.textContent = "Cálculo de Concentración (%)";
  }
}

function calcularMolaridad() {
  const tipo = document.getElementById("tipoCalculo-molaridad").value;
  const resultado = document.getElementById("resultado-molaridad");
  let res = "";

  if (tipo === "molaridad") {
    const masa = parseFloat(document.getElementById("masa-mol").value);
    const mm = parseFloat(document.getElementById("mm-mol").value);
    const vol = parseFloat(document.getElementById("volumen-mol").value);
    if (isNaN(masa) || isNaN(mm) || isNaN(vol) || vol <= 0 || mm <= 0) {
      resultado.textContent = "Por favor, ingresa valores válidos.";
      return;
    }
    const mol = masa / mm;
    const M = mol / vol;
    res = `Molaridad = ${M.toFixed(4)} M`;
  } 
  else if (tipo === "masa") {
    const M = parseFloat(document.getElementById("molaridad-mol").value);
    const mm = parseFloat(document.getElementById("mm-mol").value);
    const vol = parseFloat(document.getElementById("volumen-mol").value);
    if (isNaN(M) || isNaN(mm) || isNaN(vol)) {
      resultado.textContent = "Completa todos los campos.";
      return;
    }
    const masa = M * mm * vol;
    res = `Masa del soluto = ${masa.toFixed(4)} g`;
  } 
  else if (tipo === "porcentaje") {
    const masaSoluto = parseFloat(document.getElementById("masa-mol").value);
    const masaDis = parseFloat(document.getElementById("masa-dis").value);
    if (isNaN(masaSoluto) || isNaN(masaDis) || masaDis <= 0) {
      resultado.textContent = "Completa ambos valores.";
      return;
    }
    const porcentaje = (masaSoluto / masaDis) * 100;
    res = `Concentración = ${porcentaje.toFixed(2)} %`;
  }

  resultado.innerHTML = `<strong>${res}</strong>`;
}

function limpiarMolaridad() {
  document.getElementById("resultado-molaridad").textContent = "";
  document.querySelectorAll("#inputs-molaridad input").forEach(i => i.value = "");
}


// ============================================================
// CALCULADORA 37: Masa Molar de Compuestos
// ============================================================

// Tabla periódica simplificada (puedes ampliarla si deseas)
const atomicMasses = {
    H: 1.008, He: 4.0026,
    Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
    Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
    K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38, Ag: 107.8682, I: 126.904, Au: 196.967
};

// Función para contar átomos (soporta paréntesis)
function countAtomsMM(formula) {
    let i = 0;

    function parseFormula() {
        const counts = {};
        while (i < formula.length && formula[i] !== ')') {
            if (formula[i] === '(') {
                i++;
                const nested = parseFormula();
                i++;
                let multStr = "";
                while (i < formula.length && /\d/.test(formula[i])) {
                    multStr += formula[i++];
                }
                const mult = multStr ? parseInt(multStr) : 1;
                for (const el in nested) {
                    counts[el] = (counts[el] || 0) + nested[el] * mult;
                }
            } else {
                const match = formula.substring(i).match(/^([A-Z][a-z]?)(\d*)/);
                if (!match) throw new Error("Fórmula inválida cerca de: " + formula.substring(i));
                const el = match[1];
                const num = match[2] ? parseInt(match[2]) : 1;
                i += match[0].length;
                counts[el] = (counts[el] || 0) + num;
            }
        }
        return counts;
    }

    return parseFormula();
}

// Función principal
function calcularMasaMolarJS() {
    const formula = document.getElementById('formula-mm').value.trim();
    if (!formula) {
        alert("Por favor, introduce una fórmula química (ej. H2O, NaCl).");
        return;
    }

    try {
        const atoms = countAtomsMM(formula);
        let totalMasa = 0;
        let detalle = "<h4>Desglose de masa molar:</h4><ul>";

        for (const el in atoms) {
            if (!(el in atomicMasses)) {
                alert(`Elemento desconocido: ${el}`);
                return;
            }
            const masa = atomicMasses[el] * atoms[el];
            detalle += `<li>${el}: ${atomicMasses[el]} × ${atoms[el]} = ${masa.toFixed(3)} g/mol</li>`;
            totalMasa += masa;
        }

        detalle += `</ul><strong>Masa molar total = ${totalMasa.toFixed(3)} g/mol</strong>`;
        document.getElementById('resultado-mm').innerHTML = detalle;
    } catch (err) {
        alert("Error al calcular la masa molar: " + err.message);
    }
}

// Limpiar
function limpiarMasaMolar() {
    document.getElementById('formula-mm').value = '';
    document.getElementById('resultado-mm').innerHTML = '';
}



// =====================
// 38-Funciones auxiliares
// =====================

/**
 * Contar átomos en una molécula (versión mejorada).
 * Esta función usa recursividad para manejar correctamente los paréntesis,
 * incluyendo los anidados (ej: Al2(SO4)3).
 */
function countAtoms(molecule) {
    let i = 0;

    function parseFormula() {
        const counts = {};
        while (i < molecule.length && molecule[i] !== ')') {
            if (molecule[i] === '(') {
                i++; // Omitir '('
                const nestedCounts = parseFormula(); // Llamada recursiva
                i++; // Omitir ')'

                // Obtener el multiplicador después del ')'
                let multiplierStr = "";
                while (i < molecule.length && molecule[i] >= '0' && molecule[i] <= '9') {
                    multiplierStr += molecule[i];
                    i++;
                }
                const multiplier = multiplierStr ? parseInt(multiplierStr) : 1;

                // Añadir las cuentas anidadas (multiplicadas) a las cuentas actuales
                for (const atom in nestedCounts) {
                    counts[atom] = (counts[atom] || 0) + nestedCounts[atom] * multiplier;
                }
            } else {
                // Es un átomo
                const atomMatch = molecule.substring(i).match(/^[A-Z][a-z]*/);
                if (!atomMatch) throw new Error(`Fórmula inválida: "${molecule}" en la posición ${i}`);
                
                const atom = atomMatch[0];
                i += atom.length;

                // Obtener el contador del átomo
                let countStr = "";
                while (i < molecule.length && molecule[i] >= '0' && molecule[i] <= '9') {
                    countStr += molecule[i];
                    i++;
                }
                const count = countStr ? parseInt(countStr) : 1;

                counts[atom] = (counts[atom] || 0) + count;
            }
        }
        return counts;
    }
    return parseFormula();
}

// =====================
// 2. CONSTRUCCIÓN DE LA MATRIZ (SIN CAMBIOS)
// =====================

// Obtener lista de todos los elementos presentes
function getElements(reactivos, productos) {
    const elements = new Set();
    [...reactivos, ...productos].forEach(m => {
        const atoms = countAtoms(m);
        Object.keys(atoms).forEach(el => elements.add(el));
    });
    return Array.from(elements);
}

// Obtener matriz de coeficientes
function buildMatrix(reactivos, productos, elements) {
    const numCols = reactivos.length + productos.length;
    const matrix = elements.map(el => {
        const row = Array(numCols).fill(0);
        reactivos.forEach((m, i) => {
            const atoms = countAtoms(m);
            row[i] = atoms[el] || 0;
        });
        productos.forEach((m, i) => {
            const atoms = countAtoms(m);
            const colIndex = i + reactivos.length;
            row[colIndex] = -(atoms[el] || 0); // Productos son negativos
        });
        return row;
    });
    return matrix;
}

// =====================
// 3. RESOLUCIÓN DE LA MATRIZ (NUEVO)
// =====================

/**
 * Resuelve el sistema de ecuaciones homogéneo Ax = 0 usando Eliminación de Gauss-Jordan.
 * Encuentra un vector en el espacio nulo de la matriz.
 */
function solveMatrix(matrix) {
    const m = matrix.length;    // Ecuaciones (elementos)
    const n = matrix[0].length; // Variables (moléculas)

    // Copiar la matriz para no modificar la original
    let A = matrix.map(row => [...row]);

    // ---- Eliminación de Gauss-Jordan (convertir a RREF) ----
    let h = 0; // Fila pivote
    let k = 0; // Columna pivote

    while (h < m && k < n) {
        // 1. Encontrar el pivote (máximo absoluto en la columna)
        let i_max = h;
        for (let i = h + 1; i < m; i++) {
            if (Math.abs(A[i][k]) > Math.abs(A[i_max][k])) {
                i_max = i;
            }
        }

        if (A[i_max][k] === 0) {
            // No hay pivote en esta columna, pasar a la siguiente
            k++;
            continue;
        }

        // 2. Intercambiar fila pivote con fila actual
        [A[h], A[i_max]] = [A[i_max], A[h]];

        // 3. Normalizar fila pivote (dividir por el pivote para que A[h][k] = 1)
        let pivot = A[h][k];
        for (let j = k; j < n; j++) {
            A[h][j] /= pivot;
        }

        // 4. Eliminar la columna pivote en todas las demás filas
        for (let i = 0; i < m; i++) {
            if (i !== h) {
                let factor = A[i][k];
                for (let j = k; j < n; j++) {
                    A[i][j] -= factor * A[h][j];
                }
            }
        }
        h++;
        k++;
    }

    // ---- Extracción de la solución ----
    // La matriz está en RREF. Estamos resolviendo Ax=0.
    // Asumimos que la última variable (c_{n-1}) es nuestra variable libre = 1.
    const coeffs = Array(n).fill(0);
    coeffs[n - 1] = 1;

    // Recorrer las filas pivote de la RREF
    for (let i = 0; i < h; i++) {
        let pivotIndex = -1;
        for (let j = 0; j < n; j++) {
            if (Math.abs(A[i][j] - 1) < 1e-9) {
                pivotIndex = j;
                break;
            }
        }

        if (pivotIndex !== -1 && pivotIndex < n - 1) {
            // La ecuación es: c_[pivotIndex] + A[i][n-1] * c_[n-1] = 0
            // Dado que c_[n-1] = 1, entonces: c_[pivotIndex] = -A[i][n-1]
            coeffs[pivotIndex] = -A[i][n - 1];
        }
    }

    // ---- Limpieza de decimales a enteros ----
    
    // Encontrar el Mínimo Común Múltiplo (MCM) de los denominadores
    let lcm = 1;
    for (const c of coeffs) {
        const den = getDenominator(c);
        lcm = (lcm * den) / gcd(lcm, den);
    }

    // Multiplicar todo por el MCM y redondear
    let finalCoeffs = coeffs.map(c => Math.round(c * lcm));

    // Dividir por el Máximo Común Divisor (MCD) para obtener los enteros más pequeños
    const minGCD = gcdArray(finalCoeffs.map(Math.abs));
    
    if (minGCD === 0) {
        throw new Error("No se pudo encontrar una solución (GCD es cero).");
    }

    return finalCoeffs.map(c => Math.abs(c / minGCD));
}

// =====================
// 4. FUNCIONES AUXILIARES (ACTUALIZADAS)
// =====================

/**
 * Máximo Común Divisor (MCD)
 * Asegura que se manejen enteros redondeados.
 */
function gcd(a, b) {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    if (!b) return a;
    return gcd(b, a % b);
}

/**
 * MCD de un array de números.
 */
function gcdArray(arr) {
    if (arr.length === 0) return 1;
    return arr.reduce((a, b) => gcd(a, b));
}

/**
 * Intenta encontrar el denominador de un número de punto flotante
 * usando un algoritmo de fracción continua. Es más robusto que mirar la longitud del string.
 */
function getDenominator(n, maxDenom = 1000) {
    if (Math.abs(n - Math.round(n)) < 1e-9) return 1; // Es un entero

    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = n;
    do {
        let a = Math.floor(b);
        let aux = h1; h1 = a * h1 + h2; h2 = aux;
        aux = k1; k1 = a * k1 + k2; k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(n - h1 / k1) > n * 1.0E-6 && k1 < maxDenom);
    
    return k1;
}

// =====================
// 5. FUNCIONES PRINCIPALES (SIN CAMBIOS)
// =====================

function balanceEquationJS() {
    const equation = document.getElementById('equation-balanceo').value;
    if (!equation.includes('=')) {
        alert("La ecuación debe tener un '='");
        return;
    }

    try {
        const [left, right] = equation.split('=').map(s => s.trim());
        const reactivos = left.split('+').map(s => s.trim()).filter(s => s);
        const productos = right.split('+').map(s => s.trim()).filter(s => s);

        if (reactivos.length === 0 || productos.length === 0) {
             alert("Debe haber reactivos y productos.");
             return;
        }

        const elements = getElements(reactivos, productos);
        const matrix = buildMatrix(reactivos, productos, elements);
        const coeffs = solveMatrix(matrix);

        let result = '';
        reactivos.forEach((m, i) => {
            result += (coeffs[i] !== 1 ? `<strong>${coeffs[i]}</strong>` : '') + m + (i < reactivos.length - 1 ? ' + ' : ' ');
        });
        result += ' = ';
        productos.forEach((m, i) => {
            const index = i + reactivos.length;
            result += (coeffs[index] !== 1 ? `<strong>${coeffs[index]}</strong>` : '') + m + (i < productos.length - 1 ? ' + ' : '');
        });

        document.getElementById('resultado-balanceo_ecuaciones').innerHTML = result;
    } catch (err) {
        console.error(err);
        alert("Error al balancear la ecuación: " + err.message);
    }
}

// Limpiar
function limpiarBalanceo() {
    document.getElementById('equation-balanceo').value = '';
    document.getElementById('resultado-balanceo_ecuaciones').innerHTML = '';
}




// ==========================
// CALCULADORA 39: PRÉSTAMOS
// ==========================

// Limpiar todos los campos
function limpiarPrestamo() {
    document.getElementById('monto-prestamo').value = '';
    document.getElementById('tasa-prestamo').value = '';
    document.getElementById('plazo-prestamo').value = '';
    document.getElementById('resultado-prestamos').innerHTML = '';
    document.getElementById('tabla-prestamos').innerHTML = '';
}

// Calcular préstamo
function calcularPrestamoJS() {
    const monto = parseFloat(document.getElementById('monto-prestamo').value);
    const tasaAnual = parseFloat(document.getElementById('tasa-prestamo').value);
    const plazo = parseFloat(document.getElementById('plazo-prestamo').value);
    const tipoPlazo = document.getElementById('tipoPlazo-prestamo').value;

    if (isNaN(monto) || isNaN(tasaAnual) || isNaN(plazo) || monto <= 0 || plazo <= 0) {
        alert("Por favor ingresa valores válidos.");
        return;
    }

    // Convertir plazo a meses si el usuario elige años
    const numeroPagos = tipoPlazo === 'años' ? Math.round(plazo * 12) : Math.round(plazo);
    const tasaMensual = tasaAnual / 12 / 100;

    // Cuota fija mensual (fórmula estándar de amortización)
    const pagoMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numeroPagos));

    let saldo = monto;
    let totalIntereses = 0;

    // Generar tabla de amortización
    let tabla = `
        <table border="1" cellpadding="4" cellspacing="0" style="width:100%; text-align:right;">
            <tr>
                <th>Pago</th>
                <th>Saldo Inicial</th>
                <th>Interés</th>
                <th>Amortización</th>
                <th>Saldo Final</th>
            </tr>
    `;

    for (let i = 1; i <= numeroPagos; i++) {
        const interes = parseFloat((saldo * tasaMensual).toFixed(2));
        let amortizacion = parseFloat((pagoMensual - interes).toFixed(2));
        if (amortizacion > saldo) amortizacion = saldo;
        const saldoFinal = parseFloat((saldo - amortizacion).toFixed(2));

        tabla += `
            <tr>
                <td>${i}</td>
                <td>$${saldo.toFixed(2)}</td>
                <td>$${interes.toFixed(2)}</td>
                <td>$${amortizacion.toFixed(2)}</td>
                <td>$${saldoFinal.toFixed(2)}</td>
            </tr>
        `;

        saldo = saldoFinal;
        totalIntereses += interes;
        if (saldo <= 0) break;
    }

    tabla += `</table>`;
    document.getElementById('tabla-prestamos').innerHTML = tabla;

    // Mostrar resumen
    const totalPagado = pagoMensual * numeroPagos;
    document.getElementById('resultado-prestamos').innerHTML = `
        <strong>Pago mensual:</strong> $${pagoMensual.toFixed(2)}<br>
        <strong>Total pagado:</strong> $${totalPagado.toFixed(2)}<br>
        <strong>Intereses totales:</strong> $${totalIntereses.toFixed(2)}<br>
        <strong>Plazo total:</strong> ${numeroPagos} meses
    `;
}





// ==========================
// calculadora 40 hipotecaria/credito
// ==========================
// Actualizar tasa según tipo de crédito
function actualizarTasaHipotecaria(){
    const tipo = document.getElementById('tipoCredito-hip').value;
    const tasaInput = document.getElementById('tasa-hip');
    
    if(tipo === 'personal'){
        tasaInput.value = 12;
    } else if(tipo === 'hipotecario'){
        tasaInput.value = 8;
    }
}

// Limpiar todos los campos
function limpiarHipotecaria(){
    document.getElementById('monto-hip').value = '';
    document.getElementById('tasa-hip').value = '';
    document.getElementById('plazo-hip').value = '';
    document.getElementById('resultado-hipotecaria').innerHTML = '';
    document.getElementById('tabla-hipotecaria').innerHTML = '';
}

// Calcular crédito y generar tabla + resumen
function calcularCreditoHipotecarioJS(){
    const monto = parseFloat(document.getElementById('monto-hip').value);
    const tasaAnual = parseFloat(document.getElementById('tasa-hip').value);
    const plazoAnios = parseFloat(document.getElementById('plazo-hip').value);

    if(isNaN(monto) || isNaN(tasaAnual) || isNaN(plazoAnios) || monto <= 0 || plazoAnios <= 0){
        alert("Por favor ingresa valores válidos.");
        return;
    }

    const numeroPagos = Math.round(plazoAnios * 12);
    const tasaMensual = tasaAnual / 12 / 100;

    // Cuota fija mensual
    const pagoMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numeroPagos));

    let saldo = monto;
    let totalIntereses = 0;

    // Tabla de amortización
    let html = '<table border="1" cellpadding="4" cellspacing="0" style="width:100%; text-align:right;">';
    html += '<tr><th>Mes</th><th>Saldo Inicial</th><th>Interés</th><th>Amortización</th><th>Saldo Final</th></tr>';

    for(let i=1; i<=numeroPagos; i++){
        const interes = parseFloat((saldo * tasaMensual).toFixed(2));
        let amortizacion = parseFloat((pagoMensual - interes).toFixed(2));
        if(amortizacion > saldo) amortizacion = saldo;
        const saldoFinal = parseFloat((saldo - amortizacion).toFixed(2));

        html += `<tr>
            <td>${i}</td>
            <td>$${saldo.toFixed(2)}</td>
            <td>$${interes.toFixed(2)}</td>
            <td>$${amortizacion.toFixed(2)}</td>
            <td>$${saldoFinal.toFixed(2)}</td>
        </tr>`;

        saldo = saldoFinal;
        totalIntereses += interes;
        if(saldo <= 0) break;
    }

    html += '</table>';
    document.getElementById('tabla-hipotecaria').innerHTML = html;

    const totalPagado = pagoMensual * numeroPagos;
    document.getElementById('resultado-hipotecaria').innerHTML = 
        `<strong>Tipo de crédito:</strong> ${document.getElementById('tipoCredito-hip').value}<br>
         <strong>Pago mensual:</strong> $${pagoMensual.toFixed(2)}<br>
         <strong>Total pagado:</strong> $${totalPagado.toFixed(2)}<br>
         <strong>Intereses totales:</strong> $${totalIntereses.toFixed(2)}`;
}
