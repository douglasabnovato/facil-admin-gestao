document.addEventListener("DOMContentLoaded", () => {
  // Seletores de Elementos
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const form = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const submitBtn = form.querySelector(".btn-submit");
  const header = document.querySelector("header");

  /* ==========================================================================
       1. CONTROLE DO MENU (MOBILE & ACESSIBILIDADE)
       ========================================================================== */
  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    // Previne scroll no body quando menu está aberto em telas pequenas
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  };

  hamburger.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em links ou fora dele
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  /* ==========================================================================
       2. ROLAGEM SUAVE COM OFFSET DINÂMICO
       ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Se for apenas "#", não faz nada
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        const headerOffset = header.offsetHeight;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  /* ==========================================================================
       6. HERO CAROUSEL (ESTILO DASHBOARD) - AUTO-PLAY COM LABEL DINÂMICO
       ========================================================================== */

  let currentIdx = 0;
  const carousel = document.getElementById("heroCarousel");
  const cards = document.querySelectorAll(".carousel-card");
  const label = document.getElementById("cardLabel");

  function updateCarousel() {
    const offset = currentIdx * -100;
    cards.forEach((card) => {
      card.style.transform = `translateX(${offset}%)`;
    });
    // Atualiza o texto baseado no atributo data-label
    label.innerText = cards[currentIdx].getAttribute("data-label");
  }

  function moveCarousel(direction) {
    currentIdx += direction;
    if (currentIdx >= cards.length) currentIdx = 0;
    if (currentIdx < 0) currentIdx = cards.length - 1;
    updateCarousel();
  }

  // Auto-play estilo dashboard (troca a cada 4 segundos)
  setInterval(() => moveCarousel(1), 4000);
  /* ==========================================================================
       3. VALIDAÇÕES E UTILITÁRIOS
       ========================================================================== */
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  // Função global para o botão de "Ok" no feedback (exposta para o HTML onclick)
  window.hideFeedback = function (e) {
    if (e) e.preventDefault();
    formFeedback.style.display = "none";
    form.style.display = "grid"; // Voltando para o display grid definido no CSS
    window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
  };

  /* ==========================================================================
       4. ENVIO ASSÍNCRONO (FORMSPREE) COM ESTADO DE LOADING
       ========================================================================== */
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Coleta de valores
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validação Básica
    if (!name || !email || !phone || !message) {
      alert("Por favor, preencha todos os campos para continuarmos.");
      return;
    }

    if (!validateEmail(email)) {
      alert("O formato do e-mail parece incorreto. Poderia revisar?");
      return;
    }

    // --- ESTADO DE CARREGAMENTO (UX SISTEMA) ---
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.style.opacity = "0.7";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        // Sucesso
        form.style.display = "none";
        formFeedback.style.display = "block";
        form.reset();
      } else {
        // Erro de Resposta do Servidor
        const data = await response.json();
        throw new Error(data.error || "Erro ao processar envio.");
      }
    } catch (error) {
      console.error("Erro na submissão:", error);
      alert(
        "Infelizmente houve um erro técnico. Tente novamente em instantes.",
      );
    } finally {
      // Restaura o botão independente do resultado
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.opacity = "1";
    }
  });

  /* ==========================================================================
       5. EFEITO DE HEADER NO SCROLL (UX EXTRA)
       ========================================================================== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "var(--shadow-md)";
      header.style.padding = "0.8rem 0";
    } else {
      header.style.boxShadow = "none";
      header.style.padding = "1rem 0";
    }
  });
});
