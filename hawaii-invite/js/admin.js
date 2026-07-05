/* ============================================================
   ADMIN.JS — Lógica del panel de administración
   ============================================================ */

let inviteData = getInviteData();
let galeriaTemp = [...inviteData.imagenes.galeria];
let fotoPrincipalTemp = inviteData.imagenes.principal;
let musicaTemp = { ...inviteData.musica };
let fondoImagenTemp = inviteData.fondo.imagenFondo;

/* ---------- LOGIN ---------- */

document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();
  const pass = document.getElementById("inputPassword").value;
  if (pass === getAdminPassword()) {
    document.getElementById("loginScreen").classList.add("d-none");
    document.getElementById("panelAdmin").classList.remove("d-none");
    cargarFormularios();
  } else {
    const err = document.getElementById("loginError");
    err.textContent = "Contraseña incorrecta. Intenta de nuevo.";
    document.getElementById("inputPassword").value = "";
  }
});

document.getElementById("btnCerrarSesion").addEventListener("click", () => {
  document.getElementById("panelAdmin").classList.add("d-none");
  document.getElementById("loginScreen").classList.remove("d-none");
  document.getElementById("inputPassword").value = "";
});

/* ---------- NAVEGACIÓN POR PESTAÑAS ---------- */

document.getElementById("adminNav").addEventListener("click", (e) => {
  const btn = e.target.closest(".admin-nav-btn");
  if (!btn) return;
  document.querySelectorAll(".admin-nav-btn").forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(btn.dataset.tab).classList.add("active");
});

/* ---------- CARGA INICIAL DE FORMULARIOS ---------- */

function cargarFormularios() {
  inviteData = getInviteData();
  const { info, countdown, whatsapp, maps, musica, fondo, colores, imagenes } = inviteData;

  // Información
  document.getElementById("f_tituloEvento").value = info.tituloEvento;
  document.getElementById("f_nombre").value = info.nombre;
  document.getElementById("f_edad").value = info.edad;
  document.getElementById("f_fecha").value = info.fecha;
  document.getElementById("f_hora").value = info.hora;
  document.getElementById("f_lugar").value = info.lugar;
  document.getElementById("f_direccion").value = info.direccion;
  document.getElementById("f_vestimenta").value = info.vestimenta;
  document.getElementById("f_tema").value = info.tema;
  document.getElementById("f_mensajeBienvenida").value = info.mensajeBienvenida;

  // Cuenta regresiva
  const fechaObjetivo = countdown.fechaObjetivo || `${info.fecha}T${info.hora}:00`;
  document.getElementById("f_fechaObjetivo").value = fechaObjetivo.slice(0, 16);

  // WhatsApp
  document.getElementById("f_numeroWhatsapp").value = whatsapp.numero;
  document.getElementById("f_mensajeWhatsapp").value = whatsapp.mensaje;

  // Maps
  document.getElementById("f_mapsEnlace").value = maps.enlace;
  document.getElementById("f_mapsEmbed").value = maps.embed;

  // Música
  musicaTemp = { ...musica };
  renderMusicaActual();

  // Fotos
  fotoPrincipalTemp = imagenes.principal;
  galeriaTemp = [...imagenes.galeria];
  renderPreviewFotoPrincipal();
  renderGaleriaAdmin();

  // Fondo
  fondoImagenTemp = fondo.imagenFondo;
  document.getElementById("f_mostrarHojas").checked = fondo.mostrarHojas;
  document.getElementById("f_mostrarFlores").checked = fondo.mostrarFlores;

  // Colores
  document.getElementById("f_colorVerde").value = colores.verde;
  document.getElementById("f_colorRosa").value = colores.rosa;
  document.getElementById("f_colorBeige").value = colores.beige;
  document.getElementById("f_colorBlanco").value = colores.blanco;
  document.getElementById("f_colorTurquesa").value = colores.turquesa;
  document.getElementById("f_fuenteTitulo").value = colores.fuenteTitulo;
  document.getElementById("f_fuenteCuerpo").value = colores.fuenteCuerpo;
  actualizarMiniPreview();
}

/* ---------- HELPERS ---------- */

function mostrarGuardado(mensaje) {
  const ind = document.getElementById("guardadoIndicador");
  ind.textContent = mensaje || "Guardado ✓";
  ind.style.opacity = "1";
  setTimeout(() => (ind.style.opacity = "0.6"), 1800);
  // refresca la vista previa si está visible
  const frame = document.getElementById("previewFrame");
  if (frame) {
    try {
      frame.contentWindow.location.reload();
    } catch (e) {}
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- GUARDAR: INFORMACIÓN ---------- */

function guardarInfo() {
  inviteData.info = {
    tituloEvento: document.getElementById("f_tituloEvento").value.trim() || "Mis 16 Años",
    nombre: document.getElementById("f_nombre").value.trim(),
    edad: document.getElementById("f_edad").value.trim(),
    fecha: document.getElementById("f_fecha").value,
    hora: document.getElementById("f_hora").value,
    lugar: document.getElementById("f_lugar").value.trim(),
    direccion: document.getElementById("f_direccion").value.trim(),
    vestimenta: document.getElementById("f_vestimenta").value.trim(),
    tema: document.getElementById("f_tema").value.trim(),
    mensajeBienvenida: document.getElementById("f_mensajeBienvenida").value.trim(),
  };
  saveInviteData(inviteData);
  mostrarGuardado("Información guardada ✓");
}

/* ---------- GUARDAR: CUENTA REGRESIVA ---------- */

function guardarCountdown() {
  const val = document.getElementById("f_fechaObjetivo").value;
  inviteData.countdown.fechaObjetivo = val ? `${val}:00` : "";
  saveInviteData(inviteData);
  mostrarGuardado("Cuenta regresiva guardada ✓");
}

/* ---------- GUARDAR: WHATSAPP ---------- */

function guardarWhatsapp() {
  inviteData.whatsapp = {
    numero: document.getElementById("f_numeroWhatsapp").value.replace(/\D/g, ""),
    mensaje: document.getElementById("f_mensajeWhatsapp").value.trim(),
  };
  saveInviteData(inviteData);
  mostrarGuardado("WhatsApp guardado ✓");
}

/* ---------- GUARDAR: MAPS ---------- */

function guardarMaps() {
  inviteData.maps = {
    enlace: document.getElementById("f_mapsEnlace").value.trim(),
    embed: document.getElementById("f_mapsEmbed").value.trim(),
  };
  saveInviteData(inviteData);
  mostrarGuardado("Mapa guardado ✓");
}

/* ---------- MÚSICA ---------- */

document.getElementById("f_musicaFile").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const base64 = await fileToBase64(file);
  musicaTemp = { archivo: base64, nombre: file.name };
  renderMusicaActual();
});

function renderMusicaActual() {
  const cont = document.getElementById("musicaActual");
  cont.textContent = musicaTemp.archivo
    ? `🎵 Archivo actual: ${musicaTemp.nombre || "música cargada"}`
    : "Aún no se ha subido ningún archivo de música.";
}

function guardarMusica() {
  inviteData.musica = { ...musicaTemp };
  saveInviteData(inviteData);
  mostrarGuardado("Música guardada ✓");
}

/* ---------- FOTOS: PRINCIPAL ---------- */

document.getElementById("f_fotoPrincipal").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fotoPrincipalTemp = await fileToBase64(file);
  renderPreviewFotoPrincipal();
});

function renderPreviewFotoPrincipal() {
  const cont = document.getElementById("previewFotoPrincipal");
  cont.innerHTML = fotoPrincipalTemp
    ? `<img src="${fotoPrincipalTemp}" alt="Foto principal">`
    : `<p class="admin-hint">Aún no se ha subido una foto principal.</p>`;
}

/* ---------- FOTOS: GALERÍA ---------- */

document.getElementById("f_fotosGaleria").addEventListener("change", async (e) => {
  const files = Array.from(e.target.files);
  for (const file of files) {
    const base64 = await fileToBase64(file);
    galeriaTemp.push(base64);
  }
  e.target.value = "";
  renderGaleriaAdmin();
});

function renderGaleriaAdmin() {
  const grid = document.getElementById("galeriaAdminGrid");
  grid.innerHTML = galeriaTemp
    .map(
      (src, i) => `
    <div class="galeria-admin-item" draggable="true" data-index="${i}">
      <img src="${src}" alt="Foto ${i + 1}">
      <button class="btn-eliminar-foto" onclick="eliminarFotoGaleria(${i})" title="Eliminar">✕</button>
    </div>`
    )
    .join("");
  activarDragReorder();
}

function eliminarFotoGaleria(index) {
  galeriaTemp.splice(index, 1);
  renderGaleriaAdmin();
}

/* Reordenar por drag & drop */
function activarDragReorder() {
  const items = document.querySelectorAll(".galeria-admin-item");
  let dragIndex = null;

  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      dragIndex = Number(item.dataset.index);
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
    item.addEventListener("dragover", (e) => e.preventDefault());
    item.addEventListener("drop", () => {
      const dropIndex = Number(item.dataset.index);
      if (dragIndex === null || dragIndex === dropIndex) return;
      const moved = galeriaTemp.splice(dragIndex, 1)[0];
      galeriaTemp.splice(dropIndex, 0, moved);
      renderGaleriaAdmin();
    });
  });
}

function guardarFotos() {
  inviteData.imagenes = {
    principal: fotoPrincipalTemp,
    galeria: galeriaTemp,
  };
  saveInviteData(inviteData);
  mostrarGuardado("Fotos guardadas ✓");
}

/* ---------- FONDO ---------- */

document.getElementById("f_imagenFondo").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fondoImagenTemp = await fileToBase64(file);
});

function quitarFondoImagen() {
  fondoImagenTemp = "";
  document.getElementById("f_imagenFondo").value = "";
}

function guardarFondo() {
  inviteData.fondo = {
    imagenFondo: fondoImagenTemp,
    mostrarHojas: document.getElementById("f_mostrarHojas").checked,
    mostrarFlores: document.getElementById("f_mostrarFlores").checked,
  };
  saveInviteData(inviteData);
  mostrarGuardado("Fondo guardado ✓");
}

/* ---------- COLORES ---------- */

["f_colorVerde", "f_colorRosa", "f_colorBeige", "f_colorBlanco", "f_colorTurquesa", "f_fuenteTitulo", "f_fuenteCuerpo"].forEach(
  (id) => {
    document.getElementById(id).addEventListener("input", actualizarMiniPreview);
  }
);

function actualizarMiniPreview() {
  const prev = document.getElementById("miniPreviewColores");
  prev.style.background = document.getElementById("f_colorBeige").value;
  prev.querySelector(".mini-preview-titulo").style.color = document.getElementById("f_colorRosa").value;
  prev.querySelector(".mini-preview-titulo").style.fontFamily = document.getElementById("f_fuenteTitulo").value;
  prev.querySelector(".mini-preview-nombre").style.fontFamily = document.getElementById("f_fuenteCuerpo").value;
  prev.querySelector(".mini-preview-boton").style.background = document.getElementById("f_colorTurquesa").value;
  prev.querySelector(".mini-preview-boton").style.fontFamily = document.getElementById("f_fuenteCuerpo").value;
}

function guardarColores() {
  inviteData.colores = {
    verde: document.getElementById("f_colorVerde").value,
    rosa: document.getElementById("f_colorRosa").value,
    beige: document.getElementById("f_colorBeige").value,
    blanco: document.getElementById("f_colorBlanco").value,
    turquesa: document.getElementById("f_colorTurquesa").value,
    fuenteTitulo: document.getElementById("f_fuenteTitulo").value,
    fuenteCuerpo: document.getElementById("f_fuenteCuerpo").value,
  };
  saveInviteData(inviteData);
  mostrarGuardado("Colores y fuentes guardados ✓");
}

/* ---------- SEGURIDAD ---------- */

function cambiarPassword() {
  const actual = prompt("Ingresa tu contraseña actual:");
  if (actual !== getAdminPassword()) {
    alert("Contraseña actual incorrecta.");
    return;
  }
  const nueva = prompt("Ingresa la nueva contraseña:");
  if (nueva && nueva.trim().length >= 4) {
    setAdminPassword(nueva.trim());
    alert("Contraseña actualizada correctamente.");
  } else if (nueva !== null) {
    alert("La contraseña debe tener al menos 4 caracteres.");
  }
}

function restaurarTodo() {
  const confirmar = confirm(
    "¿Seguro que quieres restaurar TODO a los valores por defecto? Esta acción no se puede deshacer."
  );
  if (!confirmar) return;
  resetInviteData();
  cargarFormularios();
  mostrarGuardado("Todo restaurado a valores por defecto");
}
