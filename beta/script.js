/* CLID Beta — script.js */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV INJECTION ---- */
  const navPages = [
    { href: 'index.html',    label: 'Inicio' },
    { href: 'laclid.html',   label: 'Definición' },
    { href: 'proposito.html',label: 'Propósito' },
    { href: 'servicios.html',label: 'Nuestros Servicios' },
    { href: 'genesis.html',  label: 'Génesis' },
    { href: 'innovaula.html',label: 'Innov@ula' },
    { href: 'eventos.html',  label: 'Eventos' },
    { href: 'galeria.html',  label: 'Galería' },
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

  /* ---- HERO BG SLIDER (infinite loop) ---- */
  const heroBgSlides = document.querySelector('.hero-bg-slides');
  if (heroBgSlides) {
    const realSlides = heroBgSlides.querySelectorAll('.hero-bg-slide');
    const total = realSlides.length;
    heroBgSlides.appendChild(realSlides[0].cloneNode(true));

    let cur = 0;

    setInterval(() => {
      cur++;
      heroBgSlides.style.transition = 'transform 1s cubic-bezier(0.25,0.46,0.45,0.94)';
      heroBgSlides.style.transform = `translateX(-${cur * 100}%)`;

      if (cur === total) {
        setTimeout(() => {
          heroBgSlides.style.transition = 'none';
          heroBgSlides.style.transform = 'translateX(0)';
          cur = 0;
        }, 1050);
      }
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
              <span class="footer-cta-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 4-10 8L2 4"/></svg></span>
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

  /* ---- TIMELINE SLIDERS + LIGHTBOX ---- */
  const lbOverlay = document.getElementById('lb-overlay');
  if (lbOverlay) {
    const lbMedia   = lbOverlay.querySelector('.lb-media');
    const lbPrev    = lbOverlay.querySelector('.lb-prev');
    const lbNext    = lbOverlay.querySelector('.lb-next');
    const lbClose   = lbOverlay.querySelector('.lb-close');
    const lbCounter = lbOverlay.querySelector('.lb-counter');
    let lbSlides = [], lbCurrent = 0;

    function lbRender() {
      const src = lbSlides[lbCurrent].querySelector('img, video');
      lbMedia.innerHTML = '';
      if (src.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = src.src;
        lbMedia.appendChild(img);
      } else {
        const video = document.createElement('video');
        video.src = src.src; video.controls = true; video.autoplay = true;
        lbMedia.appendChild(video);
      }
      lbCounter.textContent = `${lbCurrent + 1} / ${lbSlides.length}`;
    }

    function lbShow(slides, index) {
      lbSlides = slides; lbCurrent = index;
      lbRender();
      lbOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function lbHide() {
      lbOverlay.classList.remove('open');
      document.body.style.overflow = '';
      lbMedia.querySelectorAll('video').forEach(v => v.pause());
    }

    function lbGo(dir) {
      lbMedia.querySelectorAll('video').forEach(v => v.pause());
      lbCurrent = (lbCurrent + dir + lbSlides.length) % lbSlides.length;
      lbRender();
    }

    lbClose.addEventListener('click', lbHide);
    lbOverlay.addEventListener('click', e => { if (e.target === lbOverlay) lbHide(); });
    lbPrev.addEventListener('click', e => { e.stopPropagation(); lbGo(-1); });
    lbNext.addEventListener('click', e => { e.stopPropagation(); lbGo(1); });
    document.addEventListener('keydown', e => {
      if (!lbOverlay.classList.contains('open')) return;
      if (e.key === 'Escape')     lbHide();
      if (e.key === 'ArrowLeft')  lbGo(-1);
      if (e.key === 'ArrowRight') lbGo(1);
    });

    document.querySelectorAll('.tl-slider').forEach(slider => {
      const slidesEl = slider.querySelector('.tl-slides');
      const slideEls = Array.from(slider.querySelectorAll('.tl-slide'));
      const total = slideEls.length;
      let cur = 0;
      const go = n => { cur = (n + total) % total; slidesEl.style.transform = `translateX(-${cur * 100}%)`; };
      slider.querySelector('.tl-btn.prev').addEventListener('click', e => { e.stopPropagation(); go(cur - 1); });
      slider.querySelector('.tl-btn.next').addEventListener('click', e => { e.stopPropagation(); go(cur + 1); });
      const expandBtn = slider.querySelector('.tl-expand');
      if (expandBtn) expandBtn.addEventListener('click', e => { e.stopPropagation(); lbShow(slideEls, cur); });
      slider.addEventListener('click', () => lbShow(slideEls, cur));
    });
  }

  /* ---- GALERIA LIGHTBOX ---- */
  const galeriaGridBeta = document.getElementById('galeria-grid-beta');

  if (galeriaGridBeta) {
    const items   = Array.from(galeriaGridBeta.querySelectorAll('.galeria-card-img img'));
    const slides  = items.map(img => {
      const s = document.createElement('div');
      s.classList.add('tl-slide');
      const clone = document.createElement('img');
      clone.src = img.src;
      s.appendChild(clone);
      return s;
    });

    const gLb = document.createElement('div');
    gLb.className = 'lb-overlay';
    gLb.innerHTML = `
      <button class="lb-close" aria-label="Cerrar">×</button>
      <div class="lb-inner">
        <button class="lb-arrow lb-prev" aria-label="Anterior">&#8249;</button>
        <div class="lb-media"></div>
        <button class="lb-arrow lb-next" aria-label="Siguiente">&#8250;</button>
        <div class="lb-counter"></div>
      </div>
    `;
    document.body.appendChild(gLb);

    const gMedia   = gLb.querySelector('.lb-media');
    const gPrev    = gLb.querySelector('.lb-prev');
    const gNext    = gLb.querySelector('.lb-next');
    const gClose   = gLb.querySelector('.lb-close');
    const gCounter = gLb.querySelector('.lb-counter');

    let gCur = 0;

    const gRender = () => {
      gMedia.innerHTML = '';
      const img = document.createElement('img');
      img.src = slides[gCur].querySelector('img').src;
      gMedia.appendChild(img);
      gCounter.textContent = `${gCur + 1} / ${slides.length}`;
    };

    const gShow = (i) => { gCur = i; gRender(); gLb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const gHide = ()   => { gLb.classList.remove('open'); document.body.style.overflow = ''; };
    const gGo   = (d)  => { gCur = (gCur + d + slides.length) % slides.length; gRender(); };

    gClose.addEventListener('click', gHide);
    gLb.addEventListener('click', e => { if (e.target === gLb) gHide(); });
    gPrev.addEventListener('click', e => { e.stopPropagation(); gGo(-1); });
    gNext.addEventListener('click', e => { e.stopPropagation(); gGo(1); });

    document.addEventListener('keydown', e => {
      if (!gLb.classList.contains('open')) return;
      if (e.key === 'Escape')     gHide();
      if (e.key === 'ArrowLeft')  gGo(-1);
      if (e.key === 'ArrowRight') gGo(1);
    });

    items.forEach((img, i) => {
      img.closest('.galeria-card-beta').addEventListener('click', () => gShow(i));
    });
  }

});
