// ----------------- main.js -----------------

// Cambiar entre calculadoras
function showCalculator(id) {
  const calculators = document.querySelectorAll('.calculator');
  calculators.forEach(calc => calc.classList.remove('active'));
  const selected = document.getElementById(id);
  selected.classList.add('active');

  // Ajustar tamaño según tipo de calculadora
  if(id === 'basica'){
    selected.style.width = '400px';
    selected.style.height = '500px';
  } else if(id === 'grafica'){
    selected.style.width = '700px';
    selected.style.height = '700px';
  } else if(id === 'estadistica'){
    selected.style.width = '500px';
    selected.style.height = '600px';
  }
}

// Esperar a que cargue la página para aplicar estilos (si estilos.js ya está cargado)
window.addEventListener('load', () => {
  if(typeof aplicarEstilos === 'function') aplicarEstilos();
});
