const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..');
const archivos = [
  path.join(raiz, 'index.html'),
  ...fs.readdirSync(path.join(raiz, 'servicios'))
    .filter(nombre => nombre.endsWith('.html'))
    .map(nombre => path.join(raiz, 'servicios', nombre))
];

const errores = [];
const titulos = new Set();
const canonicos = new Set();
const sitemap = fs.readFileSync(path.join(raiz, 'sitemap.xml'), 'utf8');

function contenido(html, expresion) {
  return (html.match(expresion) || [])[1] || '';
}

for (const archivo of archivos) {
  const relativo = path.relative(raiz, archivo);
  const html = fs.readFileSync(archivo, 'utf8');
  const titulo = contenido(html, /<title>(.*?)<\/title>/i);
  const descripcion = contenido(html, /<meta name="description" content="([^"]*)"/i);
  const canonical = contenido(html, /<link rel="canonical" href="([^"]*)"/i);
  const cantidadH1 = (html.match(/<h1\b/gi) || []).length;

  if (titulo.length < 30 || titulo.length > 65) errores.push(`${relativo}: título de ${titulo.length} caracteres`);
  if (descripcion.length < 70 || descripcion.length > 170) errores.push(`${relativo}: descripción de ${descripcion.length} caracteres`);
  if (!canonical) errores.push(`${relativo}: falta canonical`);
  if (cantidadH1 !== 1) errores.push(`${relativo}: contiene ${cantidadH1} H1`);
  if (!/name="robots" content="index, follow, max-image-preview:large/i.test(html)) errores.push(`${relativo}: robots incompleto`);
  if (!/property="og:image:alt"/i.test(html)) errores.push(`${relativo}: falta og:image:alt`);
  if (!/name="twitter:title"/i.test(html)) errores.push(`${relativo}: faltan etiquetas de Twitter`);
  if (/href="[^"]+\.html(?:[#?"])/i.test(html)) errores.push(`${relativo}: contiene enlaces internos con .html`);
  if (titulos.has(titulo)) errores.push(`${relativo}: título duplicado`);
  if (canonicos.has(canonical)) errores.push(`${relativo}: canonical duplicado`);
  if (canonical && !sitemap.includes(`<loc>${canonical}</loc>`)) errores.push(`${relativo}: canonical ausente del sitemap`);
  titulos.add(titulo);
  canonicos.add(canonical);

  for (const coincidencia of html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi)) {
    try {
      JSON.parse(coincidencia[1]);
    } catch (error) {
      errores.push(`${relativo}: JSON-LD inválido (${error.message})`);
    }
  }

  console.log(`✓ ${relativo}: título ${titulo.length}, descripción ${descripcion.length}, H1 ${cantidadH1}`);
}

for (const relativo of ['404.html', path.join('legal', 'aviso-de-privacidad.html')]) {
  const html = fs.readFileSync(path.join(raiz, relativo), 'utf8');
  if (!/<meta name="robots" content="noindex(?:, follow)?">/i.test(html)) errores.push(`${relativo}: falta noindex`);
}

if (errores.length) {
  console.error('\nErrores SEO:');
  for (const error of errores) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`\nSEO válido en ${archivos.length} páginas indexables.`);
