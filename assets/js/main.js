(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const toTop = document.querySelector(".to-top");
  const year = document.querySelector("[data-year]");

  if (year) year.textContent = String(new Date().getFullYear());

  // Effet machine à écrire : plusieurs messages tournent sous « Un geste. ».
  // La première phrase est déjà dans le HTML : sans JavaScript, le message
  // reste lisible.
  const typedTarget = document.getElementById("typed-text");
  if (typedTarget) {
    const phrases = [
      "Vos proches savent où vous êtes.",
      "Votre position part en quelques secondes.",
      "L'itinéraire s'ouvre sur leur téléphone.",
      "Votre carnet de santé les guide.",
      "Ils savent que vous avez besoin d'aide.",
      "Un réseau de confiance, au Mali.",
    ];
    const typedReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typedReduceMotion) {
      typedTarget.textContent = phrases[0];
    } else {
      let phraseIndex = 0;
      let charIndex = phrases[0].length;
      let deleting = false;
      let timer = null;

      const schedule = (callback, delay) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(callback, delay);
      };

      const step = () => {
        const phrase = phrases[phraseIndex];
        typedTarget.textContent = phrase.slice(0, charIndex);

        if (!deleting) {
          if (charIndex < phrase.length) {
            charIndex += 1;
            schedule(step, 48);
          } else {
            schedule(() => {
              deleting = true;
              step();
            }, 2200);
          }
        } else if (charIndex > 0) {
          charIndex -= 1;
          schedule(step, 26);
        } else {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          schedule(step, 360);
        }
      };

      // On laisse la première phrase se lire, puis on efface et on enchaîne.
      schedule(() => {
        deleting = true;
        step();
      }, 2600);

      // Onglet en arrière-plan : on suspend la boucle pour ne pas consommer
      // inutilement, puis on reprend au retour.
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          window.clearTimeout(timer);
        } else {
          schedule(step, 450);
        }
      });
    }
  }

  // Ombre de l'en-tête au défilement.
  const onScroll = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menu mobile.
  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) closeNav();
    });
  }

  // Retour en haut.
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Apparition douce des blocs.
  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Téléchargement de l'APK : petit retour visuel sans bloquer le lien.
  document.querySelectorAll("[data-download]").forEach((link) => {
    link.addEventListener("click", () => {
      const note = document.querySelector("[data-download-note]");
      if (!note) return;
      note.textContent =
        "Téléchargement de l’APK en cours… Acceptez l’installation depuis votre navigateur.";
    });
  });
})();
