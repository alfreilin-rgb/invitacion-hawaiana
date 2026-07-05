# 🌺 Invitación Hawaiana Digital

Invitación de cumpleaños interactiva con temática Hawaii/Tropical, construida solo con **HTML, CSS, JavaScript y Bootstrap 5** (sin frameworks como React). Incluye un panel de administración para editar todo el contenido sin tocar código.

## 📁 Estructura del proyecto

```
├── index.html          → Invitación (lo que ven tus invitados)
├── admin.html          → Redirección de compatibilidad a /admin/
├── admin/
│   └── index.html      → Panel de administración (ruta /admin)
├── css/
│   ├── style.css       → Estilos de la invitación
│   └── admin.css       → Estilos del panel admin
├── js/
│   ├── config.js       → Modelo de datos + guardado en localStorage
│   ├── decor.js        → SVGs de hojas, hibiscus y plumeria + íconos
│   ├── main.js         → Lógica de la invitación (countdown, música, confeti, etc.)
│   └── admin.js        → Lógica del panel de administración
└── assets/
    └── og-image.png    → Imagen de vista previa al compartir por WhatsApp/Facebook
```

## ✏️ Cómo editar el contenido

1. Abre tu invitación y toca el pequeño botón con ícono de candado 🔒 en la esquina inferior izquierda, o entra directamente a `/admin`.
2. Contraseña por defecto: **`hawaii2026`** (cámbiala desde el panel, botón "Cambiar contraseña", apenas publiques el sitio).
3. Desde las pestañas del panel puedes editar: información del evento, cuenta regresiva, WhatsApp, Google Maps, música, fotos (principal y galería, con reordenamiento por arrastre), fondo/decoración y colores/tipografías, con vista previa en vivo.
4. Todo se guarda automáticamente en `localStorage` al presionar cada botón "Guardar".

> ⚠️ **Importante sobre `localStorage`:** los cambios que hagas en el panel admin se guardan en el navegador/dispositivo donde editas, no en un servidor. Esto significa que:
> - Si editas desde tu celular y luego abres el link desde otro celular, ese otro dispositivo **no verá tus cambios** (verá los valores por defecto).
> - Es ideal para probar y personalizar el diseño antes de publicar, o para invitaciones de un solo dispositivo/kiosko.
> - Si necesitas que **todos los invitados vean la misma información editada**, la forma más simple es: edita todo en el panel admin, y antes de publicar, reemplaza los valores por defecto en `js/config.js` (objeto `DEFAULT_DATA`) con los datos ya definidos — así quedan "de fábrica" para cualquiera que abra el link. Si más adelante quieres edición real multi-dispositivo, se necesitaría una base de datos/backend (fuera del alcance de HTML/CSS/JS puro).

## 🚀 Publicar gratis

Este proyecto es 100% estático, así que puedes subirlo tal cual a:

- **GitHub Pages:** sube esta carpeta a un repositorio y activa Pages (rama `main`, carpeta raíz).
- **Netlify:** arrastra la carpeta en [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel:** importa el repositorio o usa `vercel deploy` en esta carpeta.

No requiere build ni backend.

## 🔧 Personalización rápida antes de publicar

Edita `js/config.js` → objeto `DEFAULT_DATA` para dejar precargados: nombre, fecha, lugar, número de WhatsApp, enlace de Maps, etc. También puedes cambiar la contraseña por defecto del admin ahí (`DEFAULT_ADMIN_PASSWORD`).

## 🎨 Tecnologías usadas

- Bootstrap 5 (grid, carrusel, componentes)
- AOS (Animate On Scroll)
- Animate.css
- canvas-confetti
- Google Fonts: Great Vibes, Playfair Display, Poppins
- SVGs propios de hojas tropicales, hibiscus y plumeria (sin dependencias externas de imágenes)

¡Aloha y feliz fiesta! 🌴🌺
