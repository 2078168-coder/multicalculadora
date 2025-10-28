// ---------- Variables ----------
const body = document.body;
const calculators = document.querySelectorAll('.calculator');
const buttons = document.querySelectorAll('.buttons button');
const displays = document.querySelectorAll('.display');

const fondoPantallaInput = document.getElementById('fondo-pantalla');
const colorBaseCalcInput = document.getElementById('color-base-calculadora');
const colorBotonesInput = document.getElementById('color-botones');
const colorBotonesHoverInput = document.getElementById('color-botones-hover');
const imgFondoPantallaInput = document.getElementById('img-fondo-pantalla');
const imgFondoCalcInput = document.getElementById('img-fondo-calculadora');
const fondoVideoInput = document.getElementById('fondo-video-input');
const transparenciaBaseInput = document.getElementById('transparencia-base');
const transparenciaBotonesDisplayInput = document.getElementById('transparencia-botones-display');

// ---------- IndexedDB para videos ----------
let db;
const DB_NAME = 'CalculadoraDB';
const DB_STORE = 'videos';

function initDB(){
  const request = indexedDB.open(DB_NAME,1);
  request.onupgradeneeded = (e)=>{
    db = e.target.result;
    if(!db.objectStoreNames.contains(DB_STORE)){
      db.createObjectStore(DB_STORE, {keyPath: 'id'});
    }
  };
  request.onsuccess = (e)=>{ 
    db = e.target.result; 
    cargarVideoDB(); 
  };
  request.onerror = (e)=>{ console.error("Error DB", e); };
}

function guardarVideoDB(file){
  const tx = db.transaction(DB_STORE, 'readwrite');
  const store = tx.objectStore(DB_STORE);
  store.put({id:'videoFondo', video: file});
}

function cargarVideoDB(){
  const tx = db.transaction(DB_STORE, 'readonly');
  const store = tx.objectStore(DB_STORE);
  const req = store.get('videoFondo');
  req.onsuccess = ()=>{
    if(req.result && localStorage.getItem("fondoTipo")==='video'){
      eliminarFondoAnterior();
      const videoEl = document.createElement('video');
      videoEl.id='video-fondo';
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.style.position='fixed';
      videoEl.style.top='0';
      videoEl.style.left='0';
      videoEl.style.width='100%';
      videoEl.style.height='100%';
      videoEl.style.zIndex='-1';
      videoEl.style.objectFit='cover';
      videoEl.src = URL.createObjectURL(req.result.video);
      document.body.appendChild(videoEl);
    }
  };
}

// ---------- Funciones auxiliares ----------
function getContrastColor(bgColor) {
  let r,g,b;
  if(bgColor.startsWith('#')){
    const bigint = parseInt(bgColor.slice(1),16);
    r=(bigint>>16)&255; g=(bigint>>8)&255; b=bigint&255;
  } else {
    const rgb = bgColor.match(/\d+/g);
    if(rgb){ [r,g,b]=rgb.map(Number); } else { return '#000'; }
  }
  const luminance = 0.299*r + 0.587*g + 0.114*b;
  return luminance > 186 ? '#000000' : '#FFFFFF';
}

function applyAlpha(color, alpha){
  if(color.startsWith('#')){
    const bigint=parseInt(color.slice(1),16);
    const r=(bigint>>16)&255;
    const g=(bigint>>8)&255;
    const b=bigint&255;
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return color;
}

function eliminarFondoAnterior(){
  const videoEl = document.getElementById('video-fondo');
  if(videoEl){
    videoEl.pause();
    videoEl.src = '';
    videoEl.remove();
  }
  body.style.background = '';
}

// ---------- Aplicar estilos guardados ----------
function aplicarEstilos(){
  // ---------- Restaurar calculadora activa ----------
  const calcActiva = localStorage.getItem("calculadoraActiva") || 'basica';
  calculators.forEach(c => c.classList.remove('active'));
  const elem = document.getElementById(calcActiva);
  if(elem) elem.classList.add('active');

  // Fondo tipo
  const fondoTipo = localStorage.getItem("fondoTipo") || "color"; // color, img, video
  const fondoColor = localStorage.getItem("fondoPantalla") || "#f0f0f0";
  const imgPantalla = localStorage.getItem("imgFondoPantalla");

  eliminarFondoAnterior();

  if(fondoTipo==='video'){
    cargarVideoDB();
  } else if(fondoTipo==='img' && imgPantalla){
    body.style.background = `url(${imgPantalla}) center/cover no-repeat`;
  } else {
    body.style.background = fondoColor;
  }
  fondoPantallaInput.value = fondoColor;

  // Calculadora
  const colorBase = localStorage.getItem("colorBaseCalculadora") || "#ffffff";
  const transBase = localStorage.getItem("transparenciaBase") || 1;
  calculators.forEach(c => c.style.background = applyAlpha(colorBase, transBase));
  colorBaseCalcInput.value = colorBase;
  transparenciaBaseInput.value = transBase;

  // Botones y display
  const colorBotones = localStorage.getItem("colorBotones") || "#eeeeee";
  const transBD = localStorage.getItem("transparenciaBotonesDisplay") || 0.9;
  buttons.forEach(b=>{
    b.style.background = applyAlpha(colorBotones, transBD);
    b.style.color = getContrastColor(colorBotones);
  });
  displays.forEach(d=>{
    d.style.background = applyAlpha('#ffffff', transBD);
    d.style.color = getContrastColor('#ffffff');
  });
  colorBotonesInput.value = colorBotones;
  transparenciaBotonesDisplayInput.value = transBD;

  // Hover botones
  const colorHover = localStorage.getItem("colorBotonesHover") || "#dddddd";
  let styleHover = document.getElementById('style-hover');
  if(!styleHover){
    styleHover = document.createElement('style');
    styleHover.id='style-hover';
    document.head.appendChild(styleHover);
  }
  styleHover.innerHTML = `.buttons button:hover { background: ${colorHover} !important; }`;
  colorBotonesHoverInput.value = colorHover;

  // Imagen calculadora
  const imgCalc = localStorage.getItem("imgFondoCalculadora");
  if(imgCalc){
    calculators.forEach(c => c.style.background = `url(${imgCalc}) center/cover no-repeat`);
  }
}

// ---------- Cambiar calculadora activa ----------
function showCalculator(nombre){
  calculators.forEach(c => c.classList.remove('active'));
  const elem = document.getElementById(nombre);
  if(elem) elem.classList.add('active');
  localStorage.setItem("calculadoraActiva", nombre);
}

// ---------- Eventos ----------
fondoPantallaInput.addEventListener('input', ()=>{
  eliminarFondoAnterior();
  body.style.background = fondoPantallaInput.value;
  localStorage.setItem("fondoPantalla", fondoPantallaInput.value);
  localStorage.setItem("fondoTipo","color");
  localStorage.removeItem("imgFondoPantalla");
});

colorBaseCalcInput.addEventListener('input', ()=>{
  calculators.forEach(c => c.style.background = applyAlpha(colorBaseCalcInput.value, transparenciaBaseInput.value));
  localStorage.setItem("colorBaseCalculadora", colorBaseCalcInput.value);
});

colorBotonesInput.addEventListener('input', ()=>{
  const alpha = transparenciaBotonesDisplayInput.value;
  buttons.forEach(b=>{
    b.style.background = applyAlpha(colorBotonesInput.value, alpha);
    b.style.color = getContrastColor(colorBotonesInput.value);
  });
  localStorage.setItem("colorBotones", colorBotonesInput.value);
});

colorBotonesHoverInput.addEventListener('input', ()=>{
  let styleHover = document.getElementById('style-hover');
  styleHover.innerHTML = `.buttons button:hover { background: ${colorBotonesHoverInput.value} !important; }`;
  localStorage.setItem("colorBotonesHover", colorBotonesHoverInput.value);
});

transparenciaBaseInput.addEventListener('input', ()=>{
  const alpha = transparenciaBaseInput.value;
  calculators.forEach(c => c.style.background = applyAlpha(colorBaseCalcInput.value, alpha));
  localStorage.setItem("transparenciaBase", alpha);
});

transparenciaBotonesDisplayInput.addEventListener('input', ()=>{
  const alpha = transparenciaBotonesDisplayInput.value;
  buttons.forEach(b => b.style.background = applyAlpha(colorBotonesInput.value, alpha));
  displays.forEach(d => d.style.background = applyAlpha('#ffffff', alpha));
  displays.forEach(d => d.style.color = getContrastColor('#ffffff'));
  localStorage.setItem("transparenciaBotonesDisplay", alpha);
});

imgFondoPantallaInput.addEventListener('change',(e)=>{
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(ev){
      eliminarFondoAnterior();
      body.style.background = `url(${ev.target.result}) center/cover no-repeat`;
      localStorage.setItem("imgFondoPantalla", ev.target.result);
      localStorage.setItem("fondoTipo","img");
      localStorage.removeItem("fondoPantalla");
    }
    reader.readAsDataURL(file);
  }
});

imgFondoCalcInput.addEventListener('change',(e)=>{
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(ev){
      calculators.forEach(c => c.style.background = `url(${ev.target.result}) center/cover no-repeat`);
      localStorage.setItem("imgFondoCalculadora", ev.target.result);
    }
    reader.readAsDataURL(file);
  }
});

fondoVideoInput.addEventListener('change',(e)=>{
  const file = e.target.files[0];
  if(file){
    eliminarFondoAnterior();
    const videoEl = document.createElement('video');
    videoEl.id='video-fondo';
    videoEl.autoplay=true;
    videoEl.loop=true;
    videoEl.muted=true;
    videoEl.style.position='fixed';
    videoEl.style.top='0';
    videoEl.style.left='0';
    videoEl.style.width='100%';
    videoEl.style.height='100%';
    videoEl.style.zIndex='-1';
    videoEl.style.objectFit='cover';
    videoEl.src = URL.createObjectURL(file);
    document.body.appendChild(videoEl);

    // Guardar en IndexedDB
    localStorage.setItem("fondoTipo","video");
    localStorage.removeItem("fondoPantalla");
    localStorage.removeItem("imgFondoPantalla");
    guardarVideoDB(file);
  }
});

// Reset
function resetEstilo(){
  localStorage.clear();
  const tx = db.transaction(DB_STORE,'readwrite');
  tx.objectStore(DB_STORE).clear();
  location.reload();
}

// Inicializar
document.addEventListener('DOMContentLoaded', ()=>{
  initDB();
  aplicarEstilos();
});
