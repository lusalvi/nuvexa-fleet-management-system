// script.js corregido
const API_URL = 'https://sistema-de-rastreo-de-flotas.onrender.com/api';


// Determinar la base URL dependiendo de dónde se carga el script
function getBasePath() {
  const path = window.location.pathname;
  // Si estamos en una ruta que contiene '/frontend', ajustamos la base
  if (path.includes('/frontend/')) return '/frontend';
  if (path.includes('/templates/')) return '/templates';
  return '';
}

const BASE_PATH = getBasePath();

// -------------------- AUTENTICACIÓN Y ACCESO --------------------
function verificarAcceso() {
  const ruta = window.location.pathname;
  if (ruta.includes('/frontend/templates/logueo.html') || ruta.includes('/templates/logueo.html')) return;

  const token = localStorage.getItem('token');
  const verificado = sessionStorage.getItem("verificacion_completa") === "true";

  if (!token || !verificado) {
    sessionStorage.clear();
    localStorage.clear();
    const esLocal = window.location.origin.includes('127.0.0.1') || window.location.origin.includes('localhost');
    const rutaLogout = esLocal ? '/frontend/templates/logueo.html' : '/templates/logueo.html';

    window.location.replace(rutaLogout);
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  localStorage.clear();

  const esLocal = window.location.origin.includes('127.0.0.1') || window.location.origin.includes('localhost');
  const rutaLogout = esLocal ? '/frontend/templates/logueo.html' : '/templates/logueo.html';

  window.location.href = rutaLogout;
}

// -------------------- FETCH GENERAL --------------------
async function fetchAPI(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    console.log(`Enviando ${method} a ${API_URL}/${endpoint}`, options);

    const res = await fetch(`${API_URL}/${endpoint}`, options);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error en la solicitud: ${res.status} ${res.statusText}`, errorText);
      throw new Error(errorText || `Error ${res.status}: ${res.statusText}`);
    }

    const responseData = await res.json();
    console.log(`Respuesta de ${endpoint}:`, responseData);
    return responseData;
  } catch (error) {
    console.error(`Error en fetchAPI para ${endpoint}:`, error);
    throw error;
  }
}

// -------------------- UTILIDADES  --------------------
function formatearFecha(fecha) {
  if (!fecha) return 'No especificada';
  
  const date = new Date(fecha);
  // Ajuste manual: compensar la diferencia horaria para evitar el desfase de día
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
  
  return adjustedDate.toLocaleDateString('es-AR');
}

// -------------------- INIT --------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM cargado, inicializando aplicación...");
  console.log("Ruta actual:", window.location.pathname);

  verificarAcceso();

  const salirBtn = document.getElementById('CerrarSesion');
  if (salirBtn) {
    console.log("Configurando botón de salir");
    salirBtn.addEventListener('click', cerrarSesion);
  }

  console.log("Inicialización global completa");
});

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    verificarAcceso();
  }
});
