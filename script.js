// Interactive functionality for the homepage
document.addEventListener("DOMContentLoaded", function () {
	// --- nav menu moved from HTML into a template literal ---
	const navMenuTemplate = `
    <li><a href="index.html" class="nav-link">Inicio</a></li>
    <li><a href="laclid.html" class="nav-link">Definición</a></li>
    <li><a href="proposito.html" class="nav-link">Propósito</a></li>
    <li><a href="propuesta.html" class="nav-link">Propuesta de Valor</a></li>
    <li><a href="genesis.html" class="nav-link">Genesis</a></li>
    <li><a href="funciones.html" class="nav-link">Funciones</a></li>
    <li><a href="innovaula.html" class="nav-link">Innov@ula</a></li>
    <li><a href="servicios.html" class="nav-link">Servicios</a></li>
    <li><a href="eventos.html" class="nav-link">Eventos</a></li>
    <li><a href="#" class="nav-link">Contacto</a></li>
  `;
	// 6. <li><a href="objetivos.html" class="nav-link">Objetivos</a></li>
	// 7. <li><a href="fundadoras.html" class="nav-link">Fundadoras</a></li>
	// 8. <li><a href="retos.html" class="nav-link">Retos</a></li>
	const navMenuEl = document.querySelector("#nav-menu");
	if (navMenuEl) {
		navMenuEl.innerHTML = navMenuTemplate;

		// Highlight active link based on current URL
		const currentPath = window.location.pathname;
		const pageName = currentPath.split("/").pop() || "index.html";

		const links = navMenuEl.querySelectorAll(".nav-link");
		links.forEach((link) => {
			const linkHref = link.getAttribute("href");
			if (
				linkHref === pageName ||
				(pageName === "index.html" && linkHref === "./") ||
				(pageName === "index.html" && linkHref === "/")
			) {
				link.classList.add("active");
			}

			// Update active state immediately on click
			link.addEventListener("click", function () {
				links.forEach((l) => l.classList.remove("active"));
				this.classList.add("active");
			});
		});
	}

	// --- Mobile Menu Toggle ---
	const navigation = document.querySelector(".navigation");
	if (navigation) {
		// Create mobile menu toggle button
		const mobileToggle = document.createElement("button");
		mobileToggle.className = "mobile-menu-toggle";
		mobileToggle.setAttribute("aria-label", "Toggle menu");
		mobileToggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

		// Insert toggle button before nav menu
		const navMenu = document.querySelector(".nav-menu");
		if (navMenu) {
			navigation.appendChild(mobileToggle);

			// Toggle menu on button click
			mobileToggle.addEventListener("click", function () {
				this.classList.toggle("active");
				navMenu.classList.toggle("active");
				document.body.style.overflow = navMenu.classList.contains("active")
					? "hidden"
					: "";
			});

			// Close menu when clicking on a link
			const navLinks = navMenu.querySelectorAll(".nav-link");
			navLinks.forEach((link) => {
				link.addEventListener("click", function () {
					mobileToggle.classList.remove("active");
					navMenu.classList.remove("active");
					document.body.style.overflow = "";
				});
			});

			// Close menu when clicking outside
			document.addEventListener("click", function (event) {
				if (
					!navigation.contains(event.target) &&
					navMenu.classList.contains("active")
				) {
					mobileToggle.classList.remove("active");
					navMenu.classList.remove("active");
					document.body.style.overflow = "";
				}
			});
		}
	}
	// --- end nav injection and mobile menu ---

	// Navigation hover effects
	const navLinks = document.querySelectorAll(".nav-link");

	navLinks.forEach((link) => {
		link.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-2px)";
			this.style.transition = "transform 0.3s ease";
		});

		link.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0)";
		});
	});

	// Footer card hover effects
	const footerCards = document.querySelectorAll(".footer-card");

	footerCards.forEach((card) => {
		card.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-5px)";
			this.style.transition = "transform 0.3s ease";
			this.style.boxShadow = "0px 12px 32px rgba(0, 0, 0, 0.4)";
		});

		card.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(0)";
			this.style.boxShadow = "0px 8px 24px rgba(0, 0, 0, 0.3)";
		});

		// Click functionality for cards
		card.addEventListener("click", function () {
			const cardTitle = this.querySelector(".card-title").textContent;

			if (cardTitle.includes("Contáctanos")) {
				// Handle contact action
				console.log("Opening contact form...");
				// You can add actual contact form logic here
				alert("Funcionalidad de contacto - Implementar formulario");
			} else if (cardTitle.includes("videollamada")) {
				// Handle video call booking
				console.log("Opening video call booking...");
				// You can add actual booking logic here
				alert(
					"Funcionalidad de videollamada - Implementar sistema de reservas",
				);
			}
		});
	});

	// Smooth scroll / click handling for navigation links
	navLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			const href = this.getAttribute("href") || "";
			// only prevent default for placeholder links (e.g. "#")
			if (href === "#" || href.trim() === "") {
				e.preventDefault();
				// visual feedback for JS-only items
				this.style.color = "#666";
				setTimeout(() => {
					if (this.classList.contains("contact-link")) {
						this.style.color = "#FFFFFF";
					} else {
						this.style.color = "#FFFFFF";
					}
				}, 200);
				return;
			}
			// for real links, allow navigation (you can still add analytics or effects here)
			// optional: add a small visual feedback before navigating
			this.style.opacity = "0.85";
		});
	});

	// Add loading animation
	const images = document.querySelectorAll("img");
	images.forEach((img) => {
		img.addEventListener("load", function () {
			this.style.opacity = "0";
			this.style.transition = "opacity 0.5s ease";
			setTimeout(() => {
				this.style.opacity = "1";
			}, 100);
		});
	});

	// Add intersection observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(function (entries) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = "1";
				entry.target.style.transform = "translateY(0)";
			}
		});
	}, observerOptions);

	// Observe valor cards for animation
	const valorCards = document.querySelectorAll(".valor-card");
	valorCards.forEach((card) => {
		card.style.opacity = "0";
		card.style.transform = "translateY(30px)";
		card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
		observer.observe(card);
	});

	// Add click handlers for valor cards
	valorCards.forEach((card) => {
		card.addEventListener("click", function () {
			const title = this.querySelector(".valor-text h3");
			if (title) {
				console.log(`Clicked on: ${title.textContent}`);
				// Add visual feedback
				this.style.transform = "scale(0.98)";
				setTimeout(() => {
					this.style.transform = "scale(1)";
				}, 150);
			}
		});
	});

	console.log("Homepage loaded successfully!");
});
