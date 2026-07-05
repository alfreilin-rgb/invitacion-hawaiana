/* ============================================================
   DECOR.JS
   Genera los SVG decorativos (hojas de monstera/palmera, flores
   hibiscus y plumeria) e íconos usados en la invitación.
   Mantenerlos como funciones JS permite reusarlos en index.html
   y en la vista previa del panel admin sin duplicar HTML.
   ============================================================ */

const SVG_LEAF = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="var(--color-verde, #2E8B57)" d="M100 10 C160 30 190 90 170 150 C150 190 90 195 50 170 C10 145 5 90 40 55 C60 35 80 15 100 10 Z"/>
  <path fill="var(--color-verde-oscuro, #1F5F3F)" d="M100 20 C100 20 95 90 100 180" stroke="var(--color-verde-oscuro, #1F5F3F)" stroke-width="4" fill="none"/>
  <path d="M100 40 C80 55 70 65 60 75 M100 70 C78 85 68 95 55 105 M100 100 C80 115 68 125 55 138 M100 130 C82 145 70 152 60 162" stroke="var(--color-verde-oscuro, #1F5F3F)" stroke-width="2.5" fill="none" opacity="0.6"/>
  <path d="M100 40 C120 55 130 65 140 75 M100 70 C122 85 132 95 145 105 M100 100 C120 115 132 125 145 138 M100 130 C118 145 130 152 140 162" stroke="var(--color-verde-oscuro, #1F5F3F)" stroke-width="2.5" fill="none" opacity="0.6"/>
</svg>`;

const SVG_PALM_LEAF = `
<svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg">
  <path fill="var(--color-verde, #2E8B57)" d="M10 150 C60 110 100 60 110 10 C130 60 130 100 100 140 C140 110 170 90 210 90 C170 60 130 50 100 70 C140 40 160 20 190 10 C150 10 110 20 90 50 C100 20 90 -10 60 -10 C70 20 60 60 40 90 C40 60 20 40 0 40 C20 60 30 90 20 120 C10 100 -10 90 -20 100 C0 110 10 130 10 150 Z"/>
</svg>`;

const SVG_HIBISCUS = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path fill="var(--flor-color-a, #FF6F9C)" d="M100 100 C100 60 70 30 60 40 C50 55 65 90 100 100 Z"/>
    <path fill="var(--flor-color-a, #FF6F9C)" d="M100 100 C140 90 160 55 150 40 C140 30 110 60 100 100 Z"/>
    <path fill="var(--flor-color-b, #FF9FC2)" d="M100 100 C60 110 30 140 40 155 C55 165 90 140 100 100 Z"/>
    <path fill="var(--flor-color-b, #FF9FC2)" d="M100 100 C110 140 145 165 160 155 C170 140 140 110 100 100 Z"/>
    <path fill="#fff" opacity="0.85" d="M100 100 C90 60 100 20 100 20 C100 20 110 60 100 100 Z"/>
    <circle cx="100" cy="100" r="12" fill="#ffde59"/>
    <circle cx="94" cy="94" r="2.4" fill="#c0392b"/>
    <circle cx="106" cy="94" r="2.4" fill="#c0392b"/>
    <circle cx="100" cy="108" r="2.4" fill="#c0392b"/>
  </g>
</svg>`;

const SVG_PLUMERIA = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <g>
    <path fill="#ffffff" d="M100 100 C95 60 75 40 55 45 C45 60 65 90 100 100 Z"/>
    <path fill="#ffffff" d="M100 100 C140 95 165 70 155 50 C140 45 115 65 100 100 Z"/>
    <path fill="#fff4f8" d="M100 100 C105 145 130 165 150 158 C160 143 135 112 100 100 Z"/>
    <path fill="#fff4f8" d="M100 100 C60 108 35 130 45 150 C60 158 88 132 100 100 Z"/>
    <path fill="#ffe9f0" d="M100 100 C70 70 65 45 80 30 C95 35 100 70 100 100 Z"/>
    <circle cx="100" cy="100" r="10" fill="#ffcd3c"/>
  </g>
</svg>`;

const ICONS = {
  calendario: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  reloj: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
  lugar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  vestimenta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 4 7l2 3 2-1v11h8V9l2 1 2-3-5-3s-1 2-3 2-3-2-3-2Z"/></svg>`,
  tema: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2s4 4 4 9a4 4 0 1 1-8 0c0-5 4-9 4-9Z"/><path d="M8 21h8"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1.7.3 1.2.4 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3Z"/><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 20.2 12 8.2 8.2 0 0 1 12 20.2Z"/></svg>`,
  mapa: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 20-6 3V7l6-3 6 3 6-3v16l-6 3-6-3Z"/><path d="M9 4v16M15 7v16"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7Z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>`,
  candado: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  camara: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
  pastel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7Z"/><path d="M4 17h16M9 11V7M12 11V7M15 11V7M12 4v0"/></svg>`,
};

/** Inserta la capa fija de hojas y flores flotantes de fondo. */
function renderDecorLayer() {
  return `
  <div class="deco-layer" aria-hidden="true">
    <div class="deco-item leaf-corner leaf-tl">${SVG_LEAF}</div>
    <div class="deco-item leaf-corner leaf-tr">${SVG_LEAF}</div>
    <div class="deco-item leaf-corner leaf-bl">${SVG_LEAF}</div>
    <div class="deco-item leaf-corner leaf-br">${SVG_LEAF}</div>

    <div class="deco-item leaf-float f1">${SVG_PALM_LEAF}</div>
    <div class="deco-item leaf-float f2">${SVG_LEAF}</div>
    <div class="deco-item leaf-float f3">${SVG_PALM_LEAF}</div>
    <div class="deco-item leaf-float f4">${SVG_LEAF}</div>

    <div class="deco-item flower-float h1">${SVG_HIBISCUS}</div>
    <div class="deco-item flower-float h2">${SVG_PLUMERIA}</div>
    <div class="deco-item flower-float h3">${SVG_HIBISCUS}</div>
    <div class="deco-item flower-float h4">${SVG_PLUMERIA}</div>
  </div>`;
}
