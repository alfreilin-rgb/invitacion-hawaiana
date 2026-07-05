/* ============================================================
   MAIN.JS — Lógica de la invitación (index.html)
   - Lee la data de config.js / localStorage
   - Pinta todos los textos, imágenes, colores
   - Cuenta regresiva en vivo
   - Confeti al abrir
   - Reproductor de música
   - Carrusel de galería dinámico
   - Acceso al panel admin
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const data = getInviteData();

  aplicarColores(data.colores);
  pintarDecoracion(data.fondo);
  pintarHero(data.info, data.imagenes);
  pintarDetalles(data.info);
  pintarMapa(data.maps);
  pintarWhatsapp(data.whatsapp);
  pintarGaleria(data.imagenes.galeria);
  pintarMusica(data.musica);
  iniciarCuentaRegresiva(data.countdown.fechaObjetivo || `${data.info.fecha}T${data.info.hora}:00`);
  iniciarConfeti();
  iniciarAOS();
  iniciarAccesoAdmin();
});

/* ---------- Colores dinámicos ---------- */
function aplicarColores(colores) {
  const root = document.documentElement.style;
  root.setProperty("--color-verde", colores.verde);
  root.setProperty("--color-rosa", colores.rosa);
  root.setProperty("--color-beige", colores.beige);
  root.setProperty("--color-blanco", colores.blanco);
  root.setProperty("--color-turquesa", colores.turquesa);
  root.setProperty("--fuente-titulo", colores.fuenteTitulo);
  root.setProperty("--fuente-cuerpo", colores.fuenteCuerpo);
  document.body.style.backgroundColor = colores.beige;
}

/* ---------- Decoración de fondo ---------- */
function pintarDecoracion(fondo) {
  const layer = document.getElementById("decorLayer");
  if (fondo.mostrarHojas || fondo.mostrarFlores) {
    layer.innerHTML = renderDecorLayer();
    if (!fondo.mostrarHojas) {
      layer.querySelectorAll(".leaf-corner, .leaf-float").forEach((el) => el.remove());
    }
    if (!fondo.mostrarFlores) {
      layer.querySelectorAll(".flower-float").forEach((el) => el.remove());
    }
  }
  if (fondo.imagenFondo) {
    document.body.style.backgroundImage = `linear-gradient(rgba(243,228,200,0.85), rgba(243,228,200,0.85)), url(${fondo.imagenFondo})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
  }
}

/* ---------- Hero ---------- */
function pintarHero(info, imagenes) {
  document.getElementById("txtTituloEvento").textContent = info.tituloEvento;
  document.getElementById("txtNombre").textContent = info.nombre;
  document.getElementById("txtFrase").textContent = info.mensajeBienvenida;
  document.title = `${info.tituloEvento} · ${info.nombre}`;

  if (imagenes.principal) {
    const img = document.getElementById("imgPrincipal");
    img.src = imagenes.principal;
    img.style.display = "block";
    document.getElementById("imgPrincipalPlaceholder").style.display = "none";
  }
}

/* ---------- Detalles del evento (letrero de madera) ---------- */
function pintarDetalles(info) {
  const fechaFormateada = formatearFecha(info.fecha);
  const items = [
    { icon: ICONS.calendario, label: "Fecha", value: fechaFormateada },
    { icon: ICONS.reloj, label: "Hora", value: formatearHora(info.hora) },
    { icon: ICONS.lugar, label: "Lugar", value: `${info.lugar} — ${info.direccion}` },
    { icon: ICONS.vestimenta, label: "Vestimenta", value: info.vestimenta },
    { icon: ICONS.tema, label: "Tema de la fiesta", value: info.tema },
  ];

  const lista = document.getElementById("listaDetalles");
  lista.innerHTML = items
    .map(
      (it) => `
    <li>
      <span class="icono">${it.icon}</span>
      <span><strong>${it.label}</strong>${it.value}</span>
    </li>`
    )
    .join("");
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "";
  const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const [y, m, d] = fechaISO.split("-").map(Number);
  return `${d} de ${meses[m - 1]} de ${y}`;
}

function formatearHora(hora24) {
  if (!hora24) return "";
  const [h, m] = hora24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

/* ---------- Mapa ---------- */
function pintarMapa(maps) {
  document.getElementById("mapaEmbed").src = maps.embed;
  document.getElementById("btnVerUbicacion").href = maps.enlace;
  document.getElementById("iconMapa").innerHTML = ICONS.mapa;
}

/* ---------- WhatsApp ---------- */
function pintarWhatsapp(whatsapp) {
  const texto = encodeURIComponent(whatsapp.mensaje);
  document.getElementById("btnWhatsapp").href = `https://wa.me/${whatsapp.numero}?text=${texto}`;
  document.getElementById("iconWhatsapp").innerHTML = ICONS.whatsapp;
}

/* ---------- Galería ---------- */
function pintarGaleria(galeria) {
  const inner = document.getElementById("galeriaInner");
  const indicadores = document.getElementById("galeriaIndicadores");
  const seccionGaleria = document.getElementById("galeria");

  const fotos = galeria && galeria.length ? galeria : null;

  if (!fotos) {
    // placeholders ilustrativos si no hay fotos cargadas aún
    const frases = ["Próximamente más fotos 📸", "¡Sube tus fotos desde el panel admin!", "Aloha vibes 🌺"];
    inner.innerHTML = frases
      .map(
        (f, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="placeholder-slide">${ICONS.camara.replace("<svg", '<svg width="46" height="46"')}<div>${f}</div></div>
      </div>`
      )
      .join("");
    indicadores.innerHTML = frases
      .map(
        (_, i) => `<button type="button" data-bs-target="#carruselGaleria" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`
      )
      .join("");
    return;
  }

  inner.innerHTML = fotos
    .map(
      (src, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="${src}" alt="Foto de la galería ${i + 1}">
    </div>`
    )
    .join("");
  indicadores.innerHTML = fotos
    .map(
      (_, i) => `<button type="button" data-bs-target="#carruselGaleria" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`
    )
    .join("");
}

/* ---------- Música ---------- */
function pintarMusica(musica) {
  const audio = document.getElementById("audioFondo");
  const btn = document.getElementById("btnMusic");
  const label = document.getElementById("musicLabel");
  const player = document.getElementById("musicPlayer");

  document.getElementById("iconMusicPlay").innerHTML = ICONS.play;

  if (!musica.archivo) {
    label.textContent = "Sin música";
    btn.disabled = true;
    btn.style.opacity = "0.5";
    return;
  }

  audio.src = musica.archivo;
  label.textContent = musica.nombre || "Música de fondo";

  let sonando = false;
  btn.addEventListener("click", () => {
    if (sonando) {
      audio.pause();
      document.getElementById("iconMusicPlay").innerHTML = ICONS.play;
      player.classList.remove("playing");
    } else {
      audio.play().catch(() => {});
      document.getElementById("iconMusicPlay").innerHTML = ICONS.pause;
      player.classList.add("playing");
    }
    sonando = !sonando;
  });

  // Intento de autoplay silencioso -> si el navegador lo bloquea,
  // el usuario simplemente usa el botón.
  audio.muted = true;
  audio
    .play()
    .then(() => {
      audio.muted = false;
    })
    .catch(() => {
      /* autoplay bloqueado, se espera interacción del usuario */
    });
}

/* ---------- Cuenta regresiva ---------- */
function iniciarCuentaRegresiva(fechaObjetivoStr) {
  const objetivo = new Date(fechaObjetivoStr).getTime();

  function actualizar() {
    const ahora = new Date().getTime();
    let diff = objetivo - ahora;

    if (isNaN(objetivo) || diff < 0) diff = 0;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const seg = Math.floor((diff / 1000) % 60);

    document.getElementById("cdDias").textContent = String(dias).padStart(2, "0");
    document.getElementById("cdHoras").textContent = String(horas).padStart(2, "0");
    document.getElementById("cdMin").textContent = String(min).padStart(2, "0");
    document.getElementById("cdSeg").textContent = String(seg).padStart(2, "0");
  }

  actualizar();
  setInterval(actualizar, 1000);
}

/* ---------- Confeti al abrir ---------- */
function iniciarConfeti() {
  if (typeof confetti !== "function") return;

  const colores = ["#FF6F9C", "#17C3C0", "#2E8B57", "#FFD166", "#FFFFFF"];

  const disparo = (opciones) =>
    confetti(
      Object.assign(
        {
          particleCount: 60,
          spread: 70,
          colors: colores,
          origin: { y: 0.6 },
        },
        opciones
      )
    );

  setTimeout(() => {
    disparo({ angle: 60, origin: { x: 0 } });
    disparo({ angle: 120, origin: { x: 1 } });
    disparo({ particleCount: 90, spread: 100, origin: { y: 0.5 } });
  }, 400);
}

/* ---------- AOS init ---------- */
function iniciarAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 900, once: true, offset: 60 });
  }
}

/* ---------- Acceso discreto al panel admin ---------- */
function iniciarAccesoAdmin() {
  document.getElementById("iconCandado").innerHTML = ICONS.candado;
  document.getElementById("btnAdminAccess").addEventListener("click", () => {
    window.location.href = "admin/";
  });
}
