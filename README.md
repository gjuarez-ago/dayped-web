# dayped-web

Sitio web de **DAYPED Control Ambiental** — https://dayped.cmrg.company

Sitio estático (HTML, CSS y JavaScript, sin frameworks).

## Estructura

| Carpeta / archivo | Contenido |
|---|---|
| `index.html` | Página principal |
| `servicios/`, `legal/`, `404.html` | Páginas **generadas** (no editar a mano) |
| `css/styles.css` | Estilos |
| `js/main.js` | Menú, WhatsApp, cobertura, formulario, loader |
| `js/bichos.js` | Animaciones de hormigas, atomizador y hojas |
| `assets/` | Logos e imágenes |
| `assets/img/galeria/` | Galería "DAYPED en campo": `mini/` (miniaturas) y `grande/` (visor) |
| `assets/img/redes/` | Piezas de marca de la sección "Síguenos en redes" |
| `assets/img/proyectos/` | Fotos de "Trabajos realizados" |
| `assets/fotos-corporativas/` | Fotos originales mejoradas (no se publican; de aquí salen las de arriba) |
| `herramientas/` | Generador, datos de servicios y aviso de privacidad |

## Editar

- Servicios: `herramientas/servicios-datos.js`
- Aviso de privacidad: `herramientas/aviso-privacidad.html`
- Dominio y redes sociales: al inicio de `herramientas/generar-servicios.js`

Después de editar, regenera:

```bash
node herramientas/generar-servicios.js
```

Esto crea las páginas, `sitemap.xml`, `robots.txt` y la carpeta `publicar/` (lo que va en línea).

## Validar SEO

Después de editar contenido o servicios, ejecuta:

```bash
npm run build
npm run test:seo
```

La validación revisa títulos, descripciones, H1, canonical, robots, Open Graph, JSON-LD, enlaces limpios y presencia de cada URL en el sitemap.

## Publicar en Cloudflare Pages

Proyecto: `dayped-web` (https://dayped-web.pages.dev). Para regenerar y subir en un paso:

```bash
npm run deploy
```

Requiere haber iniciado sesión en Cloudflare con `npx wrangler login`.

---
Powered by [CMRG](https://cmrg.company)
