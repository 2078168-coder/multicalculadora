// ----------------- estadistica.js -----------------

// Calcular estadística básica (suma, media, mínimo, máximo)
function calcularEstadistica() {
  const input = document.getElementById('input-estadistica').value;
  const resultadoDiv = document.getElementById('resultado-estadistica');
  try {
    // Convertir la entrada en un array de números
    const nums = input.split(',')
                      .map(n => parseFloat(n.trim()))
                      .filter(n => !isNaN(n));

    if(nums.length === 0) {
      resultadoDiv.innerHTML = "No hay datos válidos";
      return;
    }

    const suma = nums.reduce((a,b) => a + b, 0);
    const media = suma / nums.length;
    const min = Math.min(...nums);
    const max = Math.max(...nums);

    resultadoDiv.innerHTML = `
      Suma: ${suma} | 
      Media: ${media.toFixed(2)} | 
      Mín: ${min} | 
      Máx: ${max}
    `;
  } catch {
    resultadoDiv.innerHTML = "Error en los datos";
  }
}
