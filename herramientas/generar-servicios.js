// =========================================================
// Genera todo lo que se arma automáticamente:
//  - páginas de servicio en /servicios (desde servicios-datos.js)
//  - legal/aviso-de-privacidad.html y 404.html
//  - etiquetas SEO / redes del <head> de index.html
//  - sitemap.xml y robots.txt
//  - la carpeta /publicar, lista para subir a Cloudflare Pages
// Uso:  node herramientas/generar-servicios.js
// =========================================================
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const SALIDA = path.join(RAIZ, 'servicios');
const servicios = require('./servicios-datos.js');
const DOMINIO = 'https://dayped.cmrg.company'; // ← tu dominio final, sin "/" al final
const WHATSAPP = '523141165262';
// ← pon aquí los enlaces de tus redes (también cámbialos en index.html)
const FACEBOOK = 'https://www.facebook.com/profile.php?id=61595915657819';
const INSTAGRAM = 'https://www.instagram.com/dayped_mzo/';
const TIKTOK = 'https://www.tiktok.com/@dayped.mzo';
const YOUTUBE = ''; // sin canal por ahora: vacío = no se muestra el botón

// Reutiliza los iconos definidos en index.html (un solo lugar para editarlos)
const index = fs.readFileSync(path.join(RAIZ, 'index.html'), 'utf8');
const sprite = index.match(/<svg width="0" height="0"[\s\S]*?<\/defs>\s*<\/svg>/)[0];

// Ancho y alto reales de una foto de servicio (JPEG), para width/height y evitar saltos de diseño
function medidas(archivo) {
  const b = fs.readFileSync(path.join(RAIZ, 'assets/img/servicios', archivo));
  for (let i = 2; i < b.length;) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1];
    if (m >= 0xC0 && m <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(m)) return `width="${b.readUInt16BE(i + 7)}" height="${b.readUInt16BE(i + 5)}"`;
    i += 2 + b.readUInt16BE(i + 2);
  }
  return '';
}

const porSlug = Object.fromEntries(servicios.map(s => [s.slug, s]));
const wa = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
const icon = (id, cls = '') => `<svg${cls ? ` class="${cls}"` : ''}><use href="#i-${id}"/></svg>`;

const REDES = [FACEBOOK, INSTAGRAM, TIKTOK, YOUTUBE].filter(Boolean);
const IMAGEN_COMPARTIR = `${DOMINIO}/assets/img/compartir-dayped.jpg`;
const LOGO = `${DOMINIO}/assets/logo/icono-512.png`;
const NOMBRE_SITIO = 'DAYPED Control Ambiental';
const ID_NEGOCIO = `${DOMINIO}/#negocio`;
const ID_SITIO = `${DOMINIO}/#sitio-web`;
const ESTADOS_ATENDIDOS = ['Colima', 'Jalisco', 'Nayarit'];

// Etiquetas comunes del <head>: canonical, vista previa al compartir e iconos.
// `ruta` es la URL pública (Cloudflare quita el ".html"); `pre` el prefijo a la raíz.
function etiquetasHead({ titulo, descripcion, ruta, pre }) {
  const url = DOMINIO + ruta;
  return `<link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#02213F">

  <!-- Vista previa al compartir (WhatsApp, Facebook, etc.) -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_MX">
  <meta property="og:site_name" content="DAYPED Control Ambiental">
  <meta property="og:title" content="${titulo}">
  <meta property="og:description" content="${descripcion}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${IMAGEN_COMPARTIR}">
  <meta property="og:image:secure_url" content="${IMAGEN_COMPARTIR}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="DAYPED Control Ambiental, control profesional de plagas">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${titulo}">
  <meta name="twitter:description" content="${descripcion}">
  <meta name="twitter:image" content="${IMAGEN_COMPARTIR}">
  <meta name="twitter:image:alt" content="DAYPED Control Ambiental, control profesional de plagas">

  <!-- Iconos -->
  <link rel="icon" href="${pre}assets/logo/icono.svg" type="image/svg+xml">
  <link rel="icon" href="${pre}assets/logo/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="${pre}assets/logo/apple-touch-icon.png">
  <link rel="manifest" href="${pre}site.webmanifest">`;
}

const PASOS = [
  { icono: 'search', titulo: 'Diagnóstico' },
  { icono: 'gear', titulo: 'Tratamiento especializado' },
  { icono: 'calendar', titulo: 'Seguimiento' },
  { icono: 'shield', titulo: 'Prevención' }
];

function pagina(s) {
  const otros = s.otros.map(slug => porSlug[slug]).filter(Boolean);
  const tituloSeo = `${s.titulo} en Manzanillo | DAYPED`;
  const urlServicio = `${DOMINIO}/servicios/${s.slug}`;
  const schemaServicio = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${urlServicio}#pagina`,
        url: urlServicio,
        name: tituloSeo,
        description: s.descripcionMeta,
        inLanguage: 'es-MX',
        isPartOf: { '@id': ID_SITIO },
        about: { '@id': `${urlServicio}#servicio` },
        breadcrumb: { '@id': `${urlServicio}#migas` },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${DOMINIO}/assets/img/servicios/${s.imagen}` }
      },
      {
        '@type': 'Service',
        '@id': `${urlServicio}#servicio`,
        name: s.titulo,
        serviceType: s.nombre,
        description: s.intro,
        url: urlServicio,
        image: `${DOMINIO}/assets/img/servicios/${s.imagen}`,
        provider: { '@id': ID_NEGOCIO },
        areaServed: ESTADOS_ATENDIDOS.map(name => ({ '@type': 'State', name }))
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': ID_NEGOCIO,
        name: NOMBRE_SITIO,
        url: `${DOMINIO}/`,
        telephone: '+52 314 116 5262',
        image: IMAGEN_COMPARTIR,
        logo: LOGO,
        address: { '@type': 'PostalAddress', addressLocality: 'Manzanillo', addressRegion: 'Colima', addressCountry: 'MX' }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${urlServicio}#migas`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${DOMINIO}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${DOMINIO}/#servicios` },
          { '@type': 'ListItem', position: 3, name: s.nombre, item: urlServicio }
        ]
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tituloSeo}</title>
  <meta name="description" content="${s.descripcionMeta}">
  ${etiquetasHead({ titulo: tituloSeo, descripcion: s.descripcionMeta, ruta: `/servicios/${s.slug}`, pre: '../' })}

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Open+Sans:wght@400;500;600&display=swap"></noscript>

  <link rel="stylesheet" href="../css/styles.css">
  <script>document.documentElement.classList.add('js');</script>

  <script type="application/ld+json">
  ${JSON.stringify(schemaServicio)}
  </script>
</head>
<body>
  <!-- PÁGINA GENERADA AUTOMÁTICAMENTE: edita herramientas/servicios-datos.js y vuelve a generar -->

  ${sprite}

  <!-- ================= HEADER ================= -->
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="../" class="header__logo" aria-label="DAYPED Control Ambiental - Inicio">
        <img src="../assets/logo/logo-horizontal.svg" alt="DAYPED Control Ambiental" width="180" height="60">
      </a>

      <nav class="nav" id="nav" aria-label="Navegación principal">
        <ul class="nav__list">
          <li><a href="../" class="nav__link">Inicio</a></li>
          <li><a href="../#servicios" class="nav__link is-active">Servicios</a></li>
          <li><a href="../#paquetes" class="nav__link">Paquetes</a></li>
          <li><a href="../#galeria" class="nav__link">Galería</a></li>
          <li><a href="../#cobertura" class="nav__link">Cobertura</a></li>
          <li><a href="../#nosotros" class="nav__link">Nosotros</a></li>
          <li><a href="../#contacto" class="nav__link">Contacto</a></li>
        </ul>
        <a href="${wa(s.wa)}" class="btn btn--primary nav__cta" target="_blank" rel="noopener">Cotizar</a>
      </nav>

      <button class="nav__toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>
    <!-- ================= HERO DEL SERVICIO ================= -->
    <section class="svc-hero">
      <div class="svc-hero__media" aria-hidden="true">
        <img src="../assets/img/servicios/${s.imagen}" alt="" ${medidas(s.imagen)} fetchpriority="high">
      </div>
      <div class="container svc-hero__inner">
        <nav class="breadcrumb" aria-label="Ruta de navegación">
          <a href="../">Inicio</a><span>/</span><a href="../#servicios">Servicios</a><span>/</span><strong>${s.nombre}</strong>
        </nav>
        <div class="svc-hero__head">
          <span class="svc-hero__icon">${icon(s.icono)}</span>
          <h1 class="svc-hero__title">${s.titulo} en Manzanillo</h1>
        </div>
        <p class="svc-hero__text">${s.intro}</p>
        <div class="hero__actions">
          <a href="${wa(s.wa)}" class="btn btn--green btn--lg" target="_blank" rel="noopener">
            ${icon('whatsapp', 'btn__icon')} Solicitar tratamiento
          </a>
          <a href="#proceso" class="btn btn--outline btn--lg">Cómo trabajamos</a>
        </div>
      </div>
      <img class="svc-hero__photo-mobile" src="../assets/img/servicios/${s.imagen}" alt="${s.imagenAlt}" ${medidas(s.imagen)} fetchpriority="high">
    </section>

    <!-- ================= PROCESO ================= -->
    <section class="section section--tight" id="proceso">
      <div class="container">
        <div class="steps">
${PASOS.map((p, i) => `          <article class="step reveal">
            <span class="step__num">${i + 1}</span>
            <span class="step__icon">${icon(p.icono)}</span>
            <h2 class="step__title">${p.titulo}</h2>
            <p>${s.pasos[i]}</p>
          </article>`).join('\n')}
        </div>
      </div>
    </section>

    <!-- ================= SEÑALES + INCLUYE ================= -->
    <section class="section section--soft">
      <div class="container svc-info">
        <div class="svc-box reveal">
          <h2 class="svc-box__title">${icon('alert')} Señales de que lo necesitas</h2>
          <ul class="svc-list svc-list--alert">
${s.senales.map(x => `            <li>${x}</li>`).join('\n')}
          </ul>
        </div>
        <div class="svc-box svc-box--accent reveal">
          <h2 class="svc-box__title">${icon('check')} Qué incluye</h2>
          <ul class="svc-list svc-list--check">
${s.incluye.map(x => `            <li>${x}</li>`).join('\n')}
          </ul>
          <p class="svc-ideal-label">Ideal para:</p>
          <ul class="chips">
${s.ideal.map(x => `            <li>${x}</li>`).join('\n')}
          </ul>
        </div>
      </div>
    </section>

    <!-- ================= PREGUNTAS FRECUENTES ================= -->
    <section class="section">
      <div class="container faq-wrap">
        <header class="section-head">
          <h2 class="section-title">Preguntas frecuentes</h2>
        </header>
        <div class="faq">
${s.faq.map((f, i) => `          <details class="faq__item"${i === 0 ? ' open' : ''}>
            <summary>${icon('help', 'faq__q-icon')}<span>${f.q}</span>${icon('chevron', 'faq__arrow')}</summary>
            <p>${f.a}</p>
          </details>`).join('\n')}
        </div>
      </div>
    </section>

    <!-- ================= BANDA CTA ================= -->
    <section class="cta-band">
      <div class="container cta-band__inner reveal">
        ${icon('whatsapp', 'cta-band__icon')}
        <div class="cta-band__text">
          <h2>¿Listo para resolverlo?</h2>
          <p>Cuéntanos tu caso y te enviamos tu cotización.</p>
        </div>
        <a href="${wa(s.wa)}" class="btn btn--green btn--lg" target="_blank" rel="noopener">
          Solicitar tratamiento ${icon('arrow', 'btn__icon btn__icon--sm')}
        </a>
      </div>
    </section>

    <!-- ================= OTROS SERVICIOS ================= -->
    <section class="section section--soft">
      <div class="container">
        <header class="section-head">
          <h2 class="section-title">Otros servicios</h2>
        </header>
        <div class="services services--3">
${otros.map(o => `          <a class="service reveal" href="${o.slug}">
            <span class="service__icon">${icon(o.icono)}</span>
            <span class="service__body"><strong class="service__title">${o.nombre}</strong></span>
            <span class="service__img"><img src="../assets/img/servicios/${o.imagen}" alt="" ${medidas(o.imagen)} loading="lazy" decoding="async"></span>
            ${icon('chevron', 'service__arrow')}
          </a>`).join('\n')}
        </div>
      </div>
    </section>
  </main>

  <!-- ================= FOOTER ================= -->
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <img src="../assets/logo/logo-horizontal.svg" alt="DAYPED Control Ambiental" width="210" height="70" loading="lazy" decoding="async">
        <p>Control ambiental y de plagas en Colima, Jalisco y Nayarit.</p>
        <div class="social">
          <a href="${FACEBOOK}" class="social__link social__link--fb" target="_blank" rel="noopener" aria-label="DAYPED en Facebook"><svg><use href="#i-facebook"/></svg></a>
          <a href="${INSTAGRAM}" class="social__link social__link--ig" target="_blank" rel="noopener" aria-label="DAYPED en Instagram"><svg><use href="#i-instagram"/></svg></a>
          <a href="${TIKTOK}" class="social__link social__link--tt" target="_blank" rel="noopener" aria-label="DAYPED en TikTok"><svg><use href="#i-tiktok"/></svg></a>
${YOUTUBE ? `          <a href="${YOUTUBE}" class="social__link social__link--yt" target="_blank" rel="noopener" aria-label="DAYPED en YouTube"><svg><use href="#i-youtube"/></svg></a>
` : ''}        </div>
      </div>
      <div class="footer__col">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="../">Inicio</a></li>
          <li><a href="../#servicios">Servicios</a></li>
          <li><a href="../#paquetes">Paquetes</a></li>
          <li><a href="../#cobertura">Cobertura</a></li>
          <li><a href="../#nosotros">Nosotros</a></li>
          <li><a href="../#contacto">Contacto</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h3>Contacto</h3>
        <ul class="footer__contact">
          <li>${icon('whatsapp')}<a href="${wa('Hola DAYPED, quiero una cotización')}" target="_blank" rel="noopener">314 116 5262</a></li>
          <li>${icon('mail')}<a href="mailto:contacto@cmrg.company">contacto@cmrg.company</a></li>
          <li>${icon('pin')}Manzanillo, Colima</li>
        </ul>
      </div>
    </div>
    <p class="footer__copy">© <span id="year">2026</span> DAYPED Control Ambiental. Todos los derechos reservados. · <a href="../legal/aviso-de-privacidad">Aviso de privacidad</a> · <span class="footer__credit">Powered by <a href="https://cmrg.company" target="_blank" rel="noopener">CMRG</a></span></p>
  </footer>

  <a href="${wa(s.wa)}" class="wa-float" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
    ${icon('whatsapp')}
  </a>

  <script src="../js/main.js"></script>
  <script src="../js/bichos.js"></script>
</body>
</html>
`;
}

fs.mkdirSync(SALIDA, { recursive: true });
for (const s of servicios) {
  fs.writeFileSync(path.join(SALIDA, `${s.slug}.html`), pagina(s), 'utf8');
  console.log('✔ servicios/' + s.slug + '.html');
}
console.log(`\n${servicios.length} páginas de servicio generadas.`);

// ---------------------------------------------------------
// Aviso de privacidad: mismo header/footer que los servicios.
// El contenido está en herramientas/aviso-privacidad.html
// ---------------------------------------------------------
const contenidoAviso = fs.readFileSync(path.join(__dirname, 'aviso-privacidad.html'), 'utf8')
  .replace(/<!--[\s\S]*?-->\s*/, '');
const base = servicios[0];
const headBase = etiquetasHead({ titulo: `${base.titulo} en Manzanillo | DAYPED`, descripcion: base.descripcionMeta, ruta: `/servicios/${base.slug}`, pre: '../' });
if (!pagina(base).includes(headBase)) throw new Error('No encontré las etiquetas del head para reemplazar');

const aviso = pagina(base)
  .replace(headBase, () => etiquetasHead({ titulo: 'Aviso de privacidad | DAYPED Control Ambiental', descripcion: 'Aviso de privacidad de DAYPED Control Ambiental.', ruta: '/legal/aviso-de-privacidad', pre: '../' }))
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Aviso de privacidad | DAYPED Control Ambiental</title>')
  .replace(/<meta name="description"[^>]*>/, '<meta name="description" content="Aviso de privacidad de DAYPED Control Ambiental.">')
  .replace('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">', '<meta name="robots" content="noindex, follow">')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
  .replace(/<main>[\s\S]*<\/main>/, () => '<main>\n' + contenidoAviso + '  </main>')
  .replace('class="nav__link is-active">Servicios', 'class="nav__link">Servicios')
  .replace('edita herramientas/servicios-datos.js', 'edita herramientas/aviso-privacidad.html')
  .split(wa(base.wa)).join(wa('Hola DAYPED, quiero una cotización'));

fs.mkdirSync(path.join(RAIZ, 'legal'), { recursive: true });
fs.writeFileSync(path.join(RAIZ, 'legal', 'aviso-de-privacidad.html'), aviso, 'utf8');
console.log('✔ legal/aviso-de-privacidad.html');

// ---------------------------------------------------------
// 404: Cloudflare la muestra en cualquier dirección que no exista,
// por eso usa rutas desde la raíz ("/css/...") en vez de "../".
// (Abierta directo desde la carpeta se verá sin estilos; en línea, bien.)
// ---------------------------------------------------------
const contenido404 = `<main>
    <section class="section notfound">
      <div class="container notfound__inner">
        <p class="notfound__code" aria-hidden="true">4${icon('bug', 'notfound__bug')}4</p>
        <h1 class="section-title">Esta página no existe</h1>
        <p class="section-lead">Puede que el enlace esté mal escrito o que la página se haya movido. Lo bueno: aquí tampoco hay plagas.</p>
        <div class="hero__actions notfound__actions">
          <a href="/" class="btn btn--primary btn--lg">Ir al inicio</a>
          <a href="/#servicios" class="btn btn--outline btn--lg">Ver servicios</a>
        </div>
      </div>
    </section>
  </main>`;

const pagina404 = pagina(base)
  .replace(headBase, () => `<meta name="robots" content="noindex">
  <meta name="theme-color" content="#02213F">
  <link rel="icon" href="../assets/logo/icono.svg" type="image/svg+xml">
  <link rel="icon" href="../assets/logo/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="../assets/logo/apple-touch-icon.png">`)
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Página no encontrada | DAYPED Control Ambiental</title>')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
  .replace(/<main>[\s\S]*<\/main>/, () => contenido404)
  .replace('class="nav__link is-active">Servicios', 'class="nav__link">Servicios')
  .replace('edita herramientas/servicios-datos.js', 'edita herramientas/generar-servicios.js')
  .split(wa(base.wa)).join(wa('Hola DAYPED, quiero una cotización'))
  .split('"../').join('"/');

fs.writeFileSync(path.join(RAIZ, '404.html'), pagina404, 'utf8');
console.log('✔ 404.html');

// ---------------------------------------------------------
// index.html: etiquetas SEO entre <!-- SEO:inicio --> y <!-- SEO:fin -->
// ---------------------------------------------------------
const rutaIndex = path.join(RAIZ, 'index.html');
const perfilesSociales = REDES.filter(u => !/^https:\/\/www\.[a-z]+\.com\/$/.test(u));
const negocio = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': ID_NEGOCIO,
  name: NOMBRE_SITIO,
  alternateName: 'DAYPED',
  description: 'Empresa de control de plagas y fumigación para hogares, negocios e industria en Colima, Jalisco y Nayarit.',
  url: `${DOMINIO}/`,
  image: [IMAGEN_COMPARTIR],
  logo: { '@type': 'ImageObject', url: LOGO, width: 512, height: 512 },
  telephone: '+52 314 116 5262',
  email: 'contacto@cmrg.company',
  address: { '@type': 'PostalAddress', addressLocality: 'Manzanillo', addressRegion: 'Colima', addressCountry: 'MX' },
  areaServed: ESTADOS_ATENDIDOS.map(name => ({ '@type': 'State', name })),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+52 314 116 5262',
    contactType: 'customer service',
    areaServed: 'MX',
    availableLanguage: ['es']
  },
  knowsAbout: ['Control de plagas', 'Fumigación', 'Control de roedores', 'Control de termitas', 'Sanitización', 'Manejo integrado de plagas'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de control ambiental y de plagas',
    itemListElement: servicios.map(s => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.titulo, url: `${DOMINIO}/servicios/${s.slug}` }
    }))
  }
};
if (perfilesSociales.length) negocio.sameAs = perfilesSociales;

const schemaIndex = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': ID_SITIO,
      url: `${DOMINIO}/`,
      name: NOMBRE_SITIO,
      alternateName: 'DAYPED',
      inLanguage: 'es-MX',
      publisher: { '@id': ID_NEGOCIO }
    },
    negocio
  ]
};

const seoIndex = `<!-- SEO:inicio (generado: edita herramientas/generar-servicios.js) -->
  ${etiquetasHead({
    titulo: 'Control de plagas y fumigación en Manzanillo | DAYPED',
    descripcion: 'Empresa de control de plagas en Manzanillo. Fumigación, control de roedores, termitas y sanitización para hogares, negocios e industria.',
    ruta: '/',
    pre: ''
  })}
  <script type="application/ld+json">
  ${JSON.stringify(schemaIndex)}
  </script>
  <!-- SEO:fin -->`;

const htmlIndex = fs.readFileSync(rutaIndex, 'utf8');
if (!/<!-- SEO:inicio[\s\S]*?<!-- SEO:fin -->/.test(htmlIndex)) throw new Error('Faltan las marcas SEO en index.html');
fs.writeFileSync(rutaIndex, htmlIndex.replace(/<!-- SEO:inicio[\s\S]*?<!-- SEO:fin -->/, () => seoIndex), 'utf8');
console.log('✔ index.html (etiquetas SEO)');

// ---------------------------------------------------------
// sitemap.xml, robots.txt, site.webmanifest y _headers (Cloudflare)
// ---------------------------------------------------------
const hoy = new Date().toISOString().slice(0, 10);
const urls = [
  { ruta: '/', imagen: '/assets/img/compartir-dayped.jpg', titulo: 'DAYPED Control Ambiental' },
  ...servicios.map(s => ({ ruta: `/servicios/${s.slug}`, imagen: `/assets/img/servicios/${s.imagen}`, titulo: s.titulo }))
];
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(u => `  <url>
    <loc>${DOMINIO}${u.ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <image:image>
      <image:loc>${DOMINIO}${u.imagen}</image:loc>
      <image:title>${u.titulo}</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>
`);

fs.writeFileSync(path.join(RAIZ, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`);

fs.writeFileSync(path.join(RAIZ, 'site.webmanifest'), JSON.stringify({
  name: 'DAYPED Control Ambiental',
  short_name: 'DAYPED',
  start_url: '/',
  display: 'browser',
  theme_color: '#02213F',
  background_color: '#FFFFFF',
  icons: [
    { src: '/assets/logo/icono-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/logo/icono-512.png', sizes: '512x512', type: 'image/png' }
  ]
}, null, 2) + '\n');

// Cabeceras de Cloudflare Pages: seguridad básica + caché (imágenes 30 días, CSS/JS 1 día)
fs.writeFileSync(path.join(RAIZ, '_headers'), `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=2592000, stale-while-revalidate=86400

/css/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800

/js/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
`);
console.log('✔ sitemap.xml, robots.txt, site.webmanifest, _headers');

// ---------------------------------------------------------
// Carpeta /publicar: solo lo que va en línea (sin herramientas,
// sin fotos originales PNG ni imágenes que no se usan)
// ---------------------------------------------------------
const PUBLICAR = path.join(RAIZ, 'publicar');
try {
  fs.rmSync(PUBLICAR, { recursive: true, force: true });
} catch (error) {
  if (error.code !== 'EPERM' && error.code !== 'EBUSY') throw error;
  console.warn('⚠ /publicar está en uso; se actualizará sin eliminar la carpeta.');
}
fs.mkdirSync(PUBLICAR, { recursive: true });
const archivos = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'site.webmanifest', '_headers'];
const carpetas = ['css', 'js', 'servicios', 'legal', 'assets/logo', 'assets/img'];
for (const a of archivos) fs.cpSync(path.join(RAIZ, a), path.join(PUBLICAR, a));
for (const c of carpetas) {
  fs.cpSync(path.join(RAIZ, c), path.join(PUBLICAR, c), {
    recursive: true,
    filter: f => !(c === 'assets/img' && f.endsWith('.png'))
  });
}
const pesoTotal = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .reduce((t, e) => t + (e.isDirectory() ? pesoTotal(path.join(dir, e.name)) : fs.statSync(path.join(dir, e.name)).size), 0);
console.log(`✔ publicar/ lista para Cloudflare Pages (${(pesoTotal(PUBLICAR) / 1048576).toFixed(1)} MB)`);
