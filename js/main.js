// ===== Configuración =====
const WHATSAPP = '523141165262'; // 52 + número a 10 dígitos

const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// ===== Enlaces de WhatsApp =====
// Cualquier elemento con data-wa="mensaje" abre WhatsApp con ese mensaje.
document.querySelectorAll('[data-wa]').forEach(el => {
  el.href = waLink(el.dataset.wa);
  el.target = '_blank';
  el.rel = 'noopener';
});

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navLinks = nav.querySelectorAll('.nav__link');

const closeMenu = () => {
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Abrir menú');
};

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.forEach(link => link.addEventListener('click', closeMenu));

// ===== Marcar en el menú la sección visible =====
const sections = [...navLinks]
  .filter(link => link.getAttribute('href').startsWith('#'))
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ===== Animación al hacer scroll =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Cobertura: cambiar el mapa según la zona =====
const map = document.getElementById('coverageMap');
const showOnMap = (lugar, zoom) => {
  map.src = `https://www.google.com/maps?q=${encodeURIComponent(lugar + ', México')}&z=${zoom}&output=embed`;
};

if (map) {
  // Pestañas de estado
  document.querySelectorAll('.state').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.state').forEach(t => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active);
        document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
      });
      document.querySelectorAll('.city').forEach(c => c.classList.remove('is-active'));
      showOnMap(tab.dataset.state, 7);
    });
  });

  // Ciudades
  document.querySelectorAll('.city').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.city').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      showOnMap(btn.dataset.zone, 12);
    });
  });
}

// ===== Formulario de contacto → WhatsApp =====
const form = document.getElementById('contactForm');
const formError = document.getElementById('formError');

if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { nombre, telefono, servicio, mensaje } = form.elements;

  const invalid = [nombre, telefono, servicio].filter(f => !f.checkValidity() || !f.value.trim());
  [nombre, telefono, servicio].forEach(f => f.classList.toggle('is-invalid', invalid.includes(f)));

  if (invalid.length) {
    formError.textContent = 'Por favor completa nombre, un teléfono válido (10 dígitos) y el tipo de servicio.';
    invalid[0].focus();
    return;
  }
  formError.textContent = '';

  const texto = [
    'Hola DAYPED, quiero solicitar una cotización.',
    `Nombre: ${nombre.value.trim()}`,
    `Teléfono: ${telefono.value.trim()}`,
    `Servicio: ${servicio.value}`,
    mensaje.value.trim() ? `Mensaje: ${mensaje.value.trim()}` : ''
  ].filter(Boolean).join('\n');

  window.open(waLink(texto), '_blank', 'noopener');
  form.reset();
});

// ===== Año del footer =====
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ===== Loader =====
(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const MIN_MS = 900;   // tiempo mínimo visible (evita parpadeo)
  const MAX_MS = 6000;  // por si alguna imagen tarda demasiado
  let done = false;

  const hide = () => {
    if (done) return;
    done = true;
    const wait = Math.max(0, MIN_MS - performance.now());
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.documentElement.classList.remove('is-loading');
      setTimeout(() => loader.remove(), 700);
    }, wait);
  };

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, MAX_MS);
})();
