// CLID - Script principal
document.addEventListener("DOMContentLoaded", function () {

  // --- NAV INJECTION ---
  const navMenuTemplate = `
    <li><a href="index.html" class="nav-link">Inicio</a></li>
    <li><a href="laclid.html" class="nav-link">Definición</a></li>
    <li><a href="proposito.html" class="nav-link">Propósito</a></li>
    <li><a href="servicios.html" class="nav-link">Servicios</a></li>
    <li><a href="genesis.html" class="nav-link">Génesis</a></li>
    <li><a href="funciones.html" class="nav-link">Funciones</a></li>
    <li><a href="innovaula.html" class="nav-link">Innov@ula</a></li>
    <li><a href="eventos.html" class="nav-link">Eventos</a></li>
    <li><a href="contacto.html" class="nav-link">Contacto</a></li>
  `;
  // <li><a href="fundadoras.html" class="nav-link">Fundadoras</a></li>
  // <li><a href="objetivos.html" class="nav-link">Objetivos</a></li>
  // <li><a href="retos.html" class="nav-link">Retos</a></li>

  const navMenuEl = document.querySelector("#nav-menu");
  if (navMenuEl) {
    navMenuEl.innerHTML = navMenuTemplate;

    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";

    const links = navMenuEl.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      const linkHref = link.getAttribute("href");
      if (
        linkHref === pageName ||
        (pageName === "index.html" && linkHref === "index.html") ||
        (!pageName && linkHref === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  const navigation = document.querySelector(".navigation");
  if (navigation) {
    const mobileToggle = document.createElement("button");
    mobileToggle.className = "mobile-menu-toggle";
    mobileToggle.setAttribute("aria-label", "Toggle menu");
    mobileToggle.innerHTML = "<span></span><span></span><span></span>";
    navigation.appendChild(mobileToggle);

    const navMenu = document.querySelector(".nav-menu");
    if (navMenu) {
      function closeMenu() {
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }

      mobileToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.contains("active");
        if (isOpen) {
          closeMenu();
        } else {
          mobileToggle.classList.add("active");
          navMenu.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });

      navMenu.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });

      document.addEventListener("click", function (event) {
        if (
          navMenu.classList.contains("active") &&
          !navigation.contains(event.target)
        ) {
          closeMenu();
        }
      });
    }
  }

  // --- STICKY NAV SCROLL EFFECT ---
  window.addEventListener("scroll", function () {
    if (navigation) {
      if (window.scrollY > 10) {
        navigation.classList.add("scrolled");
      } else {
        navigation.classList.remove("scrolled");
      }
    }
  });

  // --- SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll(
    ".reveal, .card, .accordion-item, .bubble, .founder-card, .stat-item"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  // --- SLIDER AUTOPLAY ---
  const slider = document.getElementById("slider");
  if (slider) {
    const figure = slider.querySelector("figure");
    if (figure) {
      figure.style.animationPlayState = "running";
    }
  }

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
