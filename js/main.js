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

// ===== Galería en campo: filtros, "ver todas" y visor =====
(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const INICIALES = 12; // fotos visibles en "Todos" antes de pulsar "Ver todas"
  const items = [...gallery.querySelectorAll('.gallery__item')];
  const filters = document.querySelectorAll('.gallery-filter');
  const moreWrap = document.getElementById('galleryMore').parentElement;
  let filtro = 'todos';
  let expandida = false;

  const render = () => {
    const coinciden = items.filter(it => filtro === 'todos' || it.dataset.cat === filtro);
    const limite = filtro === 'todos' && !expandida ? INICIALES : Infinity;
    items.forEach(it => { it.hidden = true; });
    coinciden.forEach((it, i) => { it.hidden = i >= limite; });
    moreWrap.hidden = coinciden.length <= limite;
  };

  filters.forEach(btn => btn.addEventListener('click', () => {
    filtro = btn.dataset.filter;
    filters.forEach(b => {
      const activo = b === btn;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', activo);
    });
    render();
  }));

  document.getElementById('galleryMore').addEventListener('click', () => {
    expandida = true;
    render();
  });

  render();

  // Visor
  const box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return; // sin <dialog>: los enlaces abren la foto
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const count = document.getElementById('lightboxCount');
  let lista = [];
  let actual = 0;

  const mostrar = (i) => {
    actual = (i + lista.length) % lista.length;
    const link = lista[actual];
    img.src = link.href;
    img.alt = link.dataset.caption;
    caption.textContent = link.dataset.caption;
    count.textContent = `${actual + 1} / ${lista.length}`;
  };

  gallery.addEventListener('click', (e) => {
    const link = e.target.closest('.gallery__link');
    if (!link) return;
    e.preventDefault();
    lista = items.filter(it => !it.hidden).map(it => it.querySelector('.gallery__link'));
    mostrar(lista.indexOf(link));
    box.showModal();
    document.documentElement.classList.add('has-lightbox');
  });

  const cerrar = () => box.close();
  box.addEventListener('close', () => {
    document.documentElement.classList.remove('has-lightbox');
    img.src = '';
  });
  document.getElementById('lightboxClose').addEventListener('click', cerrar);
  document.getElementById('lightboxPrev').addEventListener('click', () => mostrar(actual - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => mostrar(actual + 1));
  box.addEventListener('click', (e) => { if (e.target === box) cerrar(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });

  // Deslizar con el dedo en móvil
  let x0 = null;
  box.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();

// ===== Carrusel de redes =====
(() => {
  const reel = document.getElementById('reel');
  if (!reel) return;
  document.querySelectorAll('[data-reel]').forEach(btn => {
    btn.addEventListener('click', () => {
      reel.scrollBy({ left: Number(btn.dataset.reel) * reel.clientWidth * 0.9, behavior: 'smooth' });
    });
  });
})();

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
