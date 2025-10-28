// ----------------- grafica.js -----------------

// Función para graficar una función en el canvas
function graficar() {
  const canvas = document.getElementById('canvas-grafica');
  if(!canvas) return;

  canvas.width = 600;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  const input = document.getElementById('input-grafica').value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const width = canvas.width;
  const height = canvas.height;
  const scale = 20; // px por unidad
  const unidades = 14; // ahora ±14 unidades en cada eje

  // ---------------- Dibujar cuadrícula ----------------
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 1;
  for(let i = -unidades; i <= unidades; i++) {
    // líneas verticales
    ctx.beginPath();
    ctx.moveTo(width/2 + i*scale, 0);
    ctx.lineTo(width/2 + i*scale, height);
    ctx.stroke();
    // líneas horizontales
    ctx.beginPath();
    ctx.moveTo(0, height/2 + i*scale);
    ctx.lineTo(width, height/2 + i*scale);
    ctx.stroke();
  }

  // ---------------- Dibujar ejes ----------------
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width/2, 0);
  ctx.lineTo(width/2, height);
  ctx.moveTo(0, height/2);
  ctx.lineTo(width, height/2);
  ctx.stroke();

  // ---------------- Números en los ejes ----------------
  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  for(let i = -unidades; i <= unidades; i++) {
    if(i !== 0) {
      ctx.fillText(i, width/2 + i*scale - 3, height/2 + 12); // eje X
      ctx.fillText(i, width/2 - 15, height/2 - i*scale + 3); // eje Y
    }
  }

  // ---------------- Dibujar función ----------------
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.fillStyle = "red";

  let first = true;
  for(let px = -unidades*scale; px <= unidades*scale; px++) {
    const x = px / scale;
    let y;
    try {
      y = eval(input.replace(/x/g, x));
    } catch {
      y = NaN;
    }

    if(!isNaN(y)) {
      const cx = width/2 + px;
      const cy = height/2 - y*scale; // arriba positivo, abajo negativo

      // dibujar punto
      ctx.fillRect(cx-2, cy-2, 4, 4);

      // dibujar línea
      if(first) {
        ctx.moveTo(cx, cy);
        first = false;
      } else {
        ctx.lineTo(cx, cy);
      }
    } else {
      first = true; // reiniciar línea si y es inválido
    }
  }
  ctx.stroke();
}
