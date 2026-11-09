// =========================================================
// Animaciones interactivas de "bichitos"
//  1. Hormigas que caminan en el hero y huyen del cursor
//  2. Cursor atomizador: clic = fumigar (la hormiga se vuelve hoja)
//  3. Estela de hojitas al mover el mouse (fuera del hero)
//  4. Hormiga que cruza la foto al pasar sobre una tarjeta de servicio
// En celular solo caminan las hormigas del hero (sin interacción).
// Se desactiva si el usuario pidió reducir animaciones.
// =========================================================
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hasMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const ANT = `<svg viewBox="0 0 40 40" aria-hidden="true">
    <g fill="none" stroke="#2A190D" stroke-width="1.6" stroke-linecap="round">
      <path class="leg leg-a" d="M18 16 10 11"/><path class="leg leg-b" d="M18 19.5H9"/><path class="leg leg-a" d="M18 23l-8 6"/>
      <path class="leg leg-b" d="M22 16l8-5"/><path class="leg leg-a" d="M22 19.5h9"/><path class="leg leg-b" d="M22 23l8 6"/>
      <path d="M18.5 8.5Q16 3 12.5 2.5M21.5 8.5Q24 3 27.5 2.5"/>
    </g>
    <g fill="#3B2516"><circle cx="20" cy="10.5" r="3.6"/><ellipse cx="20" cy="18.5" rx="2.8" ry="4"/><ellipse cx="20" cy="28.5" rx="5" ry="6.8"/></g>
  </svg>`;

  const LEAF = `<svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20C4 11 10 4 21 3c-1 11-7 17-17 17z" fill="#65B81B"/>
    <path d="M4 20 15 9" stroke="#4A9B18" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`;

  // Arranca cuando la página ya cargó y el navegador está libre (no compite con la carga)
  const start = () => {
    const hero = document.querySelector('.hero');
    if (hero) initHero(hero);
    if (hasMouse) {
      initLeafTrail();
      initCardBugs();
    }
  };
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 200));
  if (document.readyState === 'complete') idle(start);
  else addEventListener('load', () => idle(start), { once: true });

  // -------------------------------------------------------
  // 1 + 2. Hormigas del hero + atomizador
  // -------------------------------------------------------
  function initHero(hero) {
    const layer = document.createElement('div');
    layer.className = 'bugs';
    hero.appendChild(layer);

    let W = 0, H = 0;
    const measure = () => { W = hero.clientWidth; H = hero.clientHeight; };
    measure();
    addEventListener('resize', measure);

    const pointer = { x: -999, y: -999, inside: false };
    const TOTAL = hasMouse ? 8 : 4;
    // Tamaños (1 = 30px). Se reparten para que siempre haya chicas y grandes
    const SIZES = [0.45, 0.55, 0.65, 0.75, 0.85, 1, 1.15];
    const bugs = Array.from({ length: TOTAL }, (_, i) => createBug(SIZES[i % SIZES.length]));

    function createBug(size) {
      const el = document.createElement('div');
      el.className = 'bug';
      el.innerHTML = ANT;
      el.style.setProperty('--size', Math.round(30 * size) + 'px');
      layer.appendChild(el);
      const stride = 0.6 + size * 0.4;   // las grandes avanzan más por paso
      const b = { el, size, x: 0, y: 0, a: 0, pause: 0, state: 'walk',
                  base: (hasMouse ? 0.5 + Math.random() * 0.4 : 0.35 + Math.random() * 0.25) * stride };
      place(b, true);
      return b;
    }

    // Coloca la hormiga en cualquier punto o entrando desde un borde
    function place(b, anywhere) {
      if (anywhere) {
        b.x = Math.random() * W;
        b.y = Math.random() * H * 0.85;
        b.a = Math.random() * Math.PI * 2;
      } else {
        const side = Math.floor(Math.random() * 3);
        if (side === 0)      { b.x = W + 20; b.y = Math.random() * H * 0.8; b.a = Math.PI; }
        else if (side === 1) { b.x = -20;    b.y = Math.random() * H * 0.8; b.a = 0; }
        else                 { b.x = Math.random() * W; b.y = -20; b.a = Math.PI / 2; }
      }
      b.state = 'walk';
      b.el.classList.remove('is-dead', 'is-gone');
    }

    const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

    function retire(b, cls, delay) {
      b.state = 'off';
      b.el.classList.add(cls);
      setTimeout(() => place(b, false), delay);
    }

    let running = false, last = 0;
    function tick(now) {
      const dt = Math.min(3, (now - last) / 16.67);
      last = now;

      for (const b of bugs) {
        if (b.state === 'off') continue;

        const dx = b.x - pointer.x, dy = b.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (hasMouse && pointer.inside && dist < 130) {
          b.state = 'flee';
          b.a = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
        } else if (b.state === 'flee' && dist > 240) {
          b.state = 'walk';
        }

        let speed;
        if (b.state === 'flee') {
          speed = 4 + b.size * 1.5;
        } else if (b.pause > 0) {
          b.pause -= dt;
          speed = 0;
        } else {
          b.a += (Math.random() - 0.5) * 0.25;               // paseo aleatorio
          speed = b.base;
          if (Math.random() < 0.004) b.pause = 40 + Math.random() * 80;
          const m = 30;                                       // no salirse del hero
          if (b.x < m || b.x > W - m || b.y < m || b.y > H * 0.88) {
            const target = Math.atan2(H * 0.45 - b.y, W / 2 - b.x);
            b.a += angleDiff(target, b.a) * 0.08;
          }
        }

        b.x += Math.cos(b.a) * speed * dt;
        b.y += Math.sin(b.a) * speed * dt;

        if (b.state === 'flee' && (b.x < -40 || b.x > W + 40 || b.y < -40 || b.y > H + 40)) {
          retire(b, 'is-gone', 2500 + Math.random() * 3000);   // escapó: vuelve luego
          continue;
        }

        b.el.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.a + Math.PI / 2}rad)`;
        const walking = speed > 0, fleeing = b.state === 'flee';
        if (walking !== b.walking) { b.walking = walking; b.el.classList.toggle('is-walking', walking); }
        if (fleeing !== b.fleeing) { b.fleeing = fleeing; b.el.classList.toggle('is-running', fleeing); }
      }
      if (running) requestAnimationFrame(tick);
    }

    // Solo animar cuando el hero está a la vista
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
      }
    }).observe(hero);

    if (!hasMouse) return;

    // --- Interacción con mouse ---
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = true;
    });
    hero.addEventListener('pointerleave', () => { pointer.inside = false; });

    // --- Atomizador ---
    hero.classList.add('has-sprayer');

    const hint = document.createElement('p');
    hint.className = 'spray-hint';
    hint.innerHTML = `${ANT}<span>Tip: haz clic sobre las hormigas para fumigarlas</span>`;
    hero.querySelector('.hero__content')?.appendChild(hint);

    hero.addEventListener('pointerdown', e => {
      if (e.button !== 0 || e.target.closest('a, button')) return;
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      spray(x, y);

      let hit = false;
      for (const b of bugs) {
        if (b.state === 'off') continue;
        if (Math.hypot(b.x - x, b.y - y) < 50 + 25 * b.size) {
          hit = true;
          leafPop(b.x, b.y);
          retire(b, 'is-dead', 4000 + Math.random() * 2000);
        }
      }
      if (hit) hint.classList.add('is-hidden');
    });

    function spray(x, y) {
      const ring = document.createElement('span');
      ring.className = 'mist-ring';
      ring.style.left = x + 'px';
      ring.style.top = y + 'px';
      layer.appendChild(ring);
      setTimeout(() => ring.remove(), 600);

      for (let i = 0; i < 12; i++) {
        const p = document.createElement('span');
        const ang = Math.random() * Math.PI * 2, dist = 20 + Math.random() * 45;
        p.className = 'mist';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
        p.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
        layer.appendChild(p);
        setTimeout(() => p.remove(), 700);
      }
    }

    function leafPop(x, y) {
      const leaf = document.createElement('span');
      leaf.className = 'leaf-pop';
      leaf.innerHTML = LEAF;
      leaf.style.left = x + 'px';
      leaf.style.top = y + 'px';
      layer.appendChild(leaf);
      setTimeout(() => leaf.remove(), 1200);
    }
  }

  // -------------------------------------------------------
  // 3. Estela de hojitas (fuera del hero)
  // -------------------------------------------------------
  function initLeafTrail() {
    const layer = document.createElement('div');
    layer.className = 'leaf-trail';
    document.body.appendChild(layer);

    let lastX = 0, lastY = 0, alive = 0;
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || e.target.closest('.hero')) return;
      if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < 90) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (alive >= 12) return;

      const leaf = document.createElement('span');
      leaf.className = 'leaf';
      leaf.innerHTML = LEAF;
      leaf.style.left = e.clientX + 'px';
      leaf.style.top = e.clientY + 'px';
      leaf.style.setProperty('--r', Math.random() * 360 + 'deg');
      leaf.style.setProperty('--dx', Math.random() * 40 - 20 + 'px');
      layer.appendChild(leaf);
      alive++;
      setTimeout(() => { leaf.remove(); alive--; }, 1400);
    }, { passive: true });
  }

  // -------------------------------------------------------
  // 4. Hormiga que cruza la foto de la tarjeta de servicio
  // -------------------------------------------------------
  function initCardBugs() {
    document.querySelectorAll('.service').forEach(card => {
      const img = card.querySelector('.service__img');
      if (!img) return;
      let busy = false;
      card.addEventListener('mouseenter', () => {
        if (busy) return;
        busy = true;
        const bug = document.createElement('span');
        bug.className = 'card-bug';
        bug.innerHTML = ANT;
        bug.style.setProperty('--y', 25 + Math.random() * 50 + '%');
        bug.style.setProperty('--size', [14, 17, 20, 24][Math.floor(Math.random() * 4)] + 'px');
        img.appendChild(bug);
        setTimeout(() => { bug.remove(); busy = false; }, 1500);
      });
    });
  }
})();
