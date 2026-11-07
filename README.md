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

## Publicar en Cloudflare Pages

Conecta este repositorio en **Workers & Pages → Create → Pages → Connect to Git** con:

- **Build command:** `node herramientas/generar-servicios.js`
- **Build output directory:** `publicar`

Cada `git push` a `main` publica el sitio automáticamente.

---
Powered by [CMRG](https://cmrg.company)
