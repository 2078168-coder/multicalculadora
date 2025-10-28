/* ============================================================
   Archivo: editar.js
   Propósito: Permite editar el tamaño de la calculadora activa
              y mostrar información de cualquier calculadora.
   ============================================================ */

/* ----------------- BOTÓN EDITAR TAMAÑO -----------------
   Permite al usuario cambiar el tamaño de la calculadora activa
   usando opciones predefinidas: small, medium, large.
----------------------------------------------------------- */
const btnEditarTamano = document.getElementById('btn-editar-tamano');

btnEditarTamano.addEventListener('click', () => {
  // Solicita al usuario el tamaño deseado
  const size = prompt("Ingresa tamaño: small, medium o large", "medium");
  if (!size) return; // Si cancela, no hace nada

  // Obtiene la calculadora activa
  const activeCalc = document.querySelector('.calculator.active');
  if (!activeCalc) return;

  // Define la escala según la opción elegida
  let scaleValue = 1;
  if (size.toLowerCase() === 'small') scaleValue = 0.8;
  else if (size.toLowerCase() === 'medium') scaleValue = 1;
  else if (size.toLowerCase() === 'large') scaleValue = 1.3;

  // Aplica escala a la calculadora activa
  // Esto mantiene la calculadora centrada usando transform
  activeCalc.style.transform = `scale(${scaleValue})`;
  activeCalc.style.transformOrigin = 'center top'; // Ajusta el origen para que no se deforme
});


/* ----------------- BOTÓN "!" INFORMACIÓN -----------------
   Muestra un mensaje con la descripción y ejemplos de uso
   de la calculadora activa. Puedes agregar más calculadoras
   al objeto infoCalculadoras.
----------------------------------------------------------- */
const btnGuia = document.getElementById('btn-guia');

// Objeto con información de cada calculadora
// Puedes agregar más calculadoras y cambiar texto según necesites
const infoCalculadoras = {
  basica: {
    titulo: "Calculadora Básica",
    descripcion: `La calculadora básica es ideal para realizar operaciones aritméticas sencillas de manera rápida y eficiente. Permite sumar, restar, multiplicar y dividir números enteros o decimales. Es perfecta para estudiantes, profesionales o cualquier persona que necesite resolver cálculos cotidianos sin complicaciones. Su diseño intuitivo y botones claros facilitan su uso, haciendo que las operaciones sean rápidas y precisas.`,
    funciones: [
      "Suma, resta, multiplicación y división",
      "Cálculos con decimales",
      "Operaciones sencillas de memoria (M+, M-, MR)",
      "Diseño fácil de usar, ideal para principiantes"
    ],
    uso: "Perfecta para el hogar, oficina, escuela o situaciones donde se necesiten cálculos rápidos sin funciones avanzadas.",
    ejemplos: [
      "Suma: 12 + 8 = 20",
      "Resta: 50 − 17 = 33",
      "Multiplicación: 7 × 6 = 42",
      "División: 45 ÷ 9 = 5"
    ]
  },
  // Ejemplo: agregar otra calculadora
  cientifica: {
    titulo: "Calculadora Científica",
    descripcion: "Permite realizar operaciones avanzadas como trigonometría, logaritmos, raíces, potencias y factoriales. Ideal para estudiantes y profesionales en matemáticas, física o ingeniería.",
    funciones: [
      "Funciones trigonométricas",
      "Logaritmos y raíces",
      "Potencias y factoriales",
      "Memoria y constantes matemáticas"
    ],
    uso: "Recomendada para estudios avanzados, laboratorios y cálculos complejos.",
    ejemplos: [
      "Seno: sin(30°) = 0.5",
      "Logaritmo: log10(100) = 2",
      "Raíz cuadrada: √25 = 5"
    ]
  }
};

// Evento del botón "!" que muestra la información
btnGuia.addEventListener('click', () => {
  const activeCalc = document.querySelector('.calculator.active');
  if (!activeCalc) return;

  const idCalc = activeCalc.id;
  const info = infoCalculadoras[idCalc];

  if (!info) {
    alert("No hay información disponible para esta calculadora.");
    return;
  }

  // Construye el mensaje
  let mensaje = `${info.titulo}\n\n`;
  mensaje += `Descripción:\n${info.descripcion}\n\n`;
  mensaje += `Funciones principales:\n- ${info.funciones.join('\n- ')}\n\n`;
  mensaje += `Uso recomendado:\n${info.uso}\n\n`;
  mensaje += `Ejemplos para digitar:\n- ${info.ejemplos.join('\n- ')}`;

  // Muestra el mensaje en alert
  alert(mensaje);
});
