/* ============================================================
   CONFIG.JS
   Modelo de datos central de la invitación + helpers de guardado.
   Todo el contenido editable vive en un solo objeto que se
   guarda/lee de localStorage bajo la clave STORAGE_KEY.
   Tanto index.html como admin.html incluyen este archivo para
   compartir exactamente la misma estructura de datos.
   ============================================================ */

const STORAGE_KEY = "hawaiiInviteData_v1";
const ADMIN_PASS_KEY = "hawaiiInviteAdminPass_v1";
const DEFAULT_ADMIN_PASSWORD = "hawaii2026";

/* Objeto de datos por defecto. Si el usuario nunca entró al admin,
   la invitación se ve así. */
const DEFAULT_DATA = {
  // ---------- Información principal ----------
  info: {
    tituloEvento: "Mis 16 Años",
    nombre: "Leilani",
    edad: "16",
    mensajeBienvenida:
      "Aloha! Te invito a celebrar conmigo una noche bajo las estrellas, con flores, música y mucho aloha spirit.",
    fecha: "2026-09-12",
    hora: "19:00",
    lugar: "Salón Tropical Sunset",
    direccion: "Av. Costanera 1234, Punta Cana",
    vestimenta: "Elegante tropical (colores claros, flores, guayaberas)",
    tema: "Luau Hawaiano",
  },

  // ---------- Cuenta regresiva ----------
  countdown: {
    // combinación de info.fecha + info.hora se usa por defecto,
    // pero se guarda aparte por si se quiere una fecha distinta al evento.
    fechaObjetivo: "2026-09-12T19:00:00",
  },

  // ---------- WhatsApp ----------
  whatsapp: {
    numero: "18095551234",
    mensaje: "Hola, confirmo mi asistencia a la fiesta.",
  },

  // ---------- Google Maps ----------
  maps: {
    enlace: "https://maps.google.com/?q=Punta+Cana+Dominican+Republic",
    embed:
      "https://www.google.com/maps?q=Punta+Cana+Dominican+Republic&output=embed",
  },

  // ---------- Imágenes ----------
  imagenes: {
    principal: "", // base64 o vacío -> usa placeholder ilustrado
    galeria: [], // array de base64
  },

  // ---------- Música ----------
  musica: {
    archivo: "", // base64 del mp3
    nombre: "",
  },

  // ---------- Fondo / decoración ----------
  fondo: {
    imagenFondo: "", // opcional, imagen de fondo personalizada
    mostrarHojas: true,
    mostrarFlores: true,
  },

  // ---------- Colores ----------
  colores: {
    verde: "#2E8B57",
    rosa: "#FF6F9C",
    beige: "#F3E4C8",
    blanco: "#FFFFFF",
    turquesa: "#17C3C0",
    fuenteTitulo: "'Great Vibes', cursive",
    fuenteCuerpo: "'Poppins', sans-serif",
  },
};

/* ---------- Helpers de lectura/escritura ---------- */

function deepMerge(base, override) {
  const result = Array.isArray(base) ? [...base] : { ...base };
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === "object" &&
      !Array.isArray(override[key]) &&
      base[key] &&
      typeof base[key] === "object"
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

/** Devuelve los datos actuales de la invitación (mezclados con defaults). */
function getInviteData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const parsed = JSON.parse(raw);
    return deepMerge(DEFAULT_DATA, parsed);
  } catch (e) {
    console.error("Error leyendo datos de invitación:", e);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

/** Guarda el objeto completo de datos. */
function saveInviteData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Error guardando datos de invitación:", e);
    return false;
  }
}

/** Restaura todo a los valores por defecto. */
function resetInviteData() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Obtiene la contraseña actual del admin (o la default). */
function getAdminPassword() {
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASSWORD;
}

function setAdminPassword(pass) {
  localStorage.setItem(ADMIN_PASS_KEY, pass);
}
