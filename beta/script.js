/* CLID Beta — script.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV INJECTION ---- */
  const navPages = [
    { href: 'index.html',    label: 'Inicio' },
    { href: 'laclid.html',   label: 'Definición' },
    { href: 'proposito.html',label: 'Propósito' },
    { href: 'servicios.html',label: 'Servicios' },
    { href: 'genesis.html',  label: 'Génesis' },
    { href: 'funciones.html',label: 'Funciones' },
    { href: 'innovaula.html',label: 'Innov@ula' },
    { href: 'eventos.html',  label: 'Eventos' },
    { href: 'contacto.html', label: 'Contacto' },
  ];

  const linksEl = document.getElementById('nav-links');
  if (linksEl) {
    const page = location.pathname.split('/').pop() || 'index.html';
    linksEl.innerHTML = navPages.map(p =>
      `<li><a href="${p.href}"${p.href === page ? ' class="active"' : ''}>${p.label}</a></li>`
    ).join('');
  }

  /* ---- NAV SCROLL EFFECT ---- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const tick = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ---- MOBILE TOGGLE ---- */
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      navLinks.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- HERO BG SLIDER ---- */
  const heroBgSlides = document.querySelector('.hero-bg-slides');
  if (heroBgSlides) {
    const total = heroBgSlides.querySelectorAll('.hero-bg-slide').length;
    let cur = 0;
    setInterval(() => {
      cur = (cur + 1) % total;
      heroBgSlides.style.transform = `translateX(-${cur * 100}%)`;
    }, 4500);
  }

  /* ---- FOOTER INJECTION ---- */
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-top">
        <div>
          <span class="footer-logo-text">CLID</span>
          <p class="footer-tagline">Centro Laboratorio de Innovación y Desarrollo. Unidad dinámica, multidisciplinaria e intercultural de la ULA — FACES.</p>
        </div>
        <div>
          <span class="footer-cta-eyebrow">¿En qué podemos ayudarte?</span>
          <div class="footer-cta-list">
            <a href="contacto.html" class="footer-cta-link">
              <span class="footer-cta-ico">✉</span>
              <span class="footer-cta-text">
                <strong>Contáctanos</strong>
                <span>Queremos saber más de tu proyecto</span>
              </span>
              <span class="footer-cta-arr">→</span>
            </a>
            <a href="contacto.html" class="footer-cta-link">
              <span class="footer-cta-ico">🎥</span>
              <span class="footer-cta-text">
                <strong>Reserva una videollamada</strong>
                <span>Forma parte del puente entre el presente y el futuro</span>
              </span>
              <span class="footer-cta-arr">→</span>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2024 CLID. Todos los derechos reservados.</span>
        <span class="footer-uni">Universidad de Los Andes — FACES, Núcleo Liria</span>
      </div>
    `;
  }

  /* ---- SCROLL REVEAL ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));

  /* ---- EVENT SLIDERS ---- */
  document.querySelectorAll('.event-slider').forEach(slider => {
    const slides = slider.querySelector('.event-slides');
    const total = slider.querySelectorAll('.event-slide').length;
    if (total < 2) { slider.querySelectorAll('.s-arrow').forEach(b => b.style.display = 'none'); return; }
    let cur = 0;
    const go = n => { cur = (n + total) % total; slides.style.transform = `translateX(-${cur * 100}%)`; };
    slider.querySelector('.prev').addEventListener('click', () => go(cur - 1));
    slider.querySelector('.next').addEventListener('click', () => go(cur + 1));
  });

});
