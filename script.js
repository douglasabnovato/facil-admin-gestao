/*
 * script.js · FacilAdmin: menu móvel, rolagem com compensação do cabeçalho, carrossel acessível
 * (pausa, teclado, movimento reduzido) e envio do formulário ao Formspree com validação por campo.
 */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger-menu");
  const navMenu = document.querySelector(".nav-menu");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Abre ou fecha o menu móvel e sincroniza aria-expanded. */
  const setMenu = (open) => {
    navMenu.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  hamburger.addEventListener("click", () => setMenu(!navMenu.classList.contains("active")));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      setMenu(false);
      hamburger.focus();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      setMenu(false);
      window.scrollTo({ top: target.offsetTop - header.offsetHeight, behavior: reduceMotion ? "auto" : "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  const cards = Array.from(document.querySelectorAll(".carousel-card"));
  const label = document.getElementById("cardLabel");
  const pauseButton = document.getElementById("carouselPause");
  const carousel = document.getElementById("heroCarousel");
  let current = 0;
  let timer = null;
  let pausedByUser = reduceMotion;

  /* Mostra o slide atual e esconde os demais de leitores de tela. */
  const render = () => {
    cards.forEach((card, index) => {
      card.style.transform = `translateX(${current * -100}%)`;
      card.setAttribute("aria-hidden", String(index !== current));
    });
    label.textContent = cards[current].dataset.label;
  };

  /* Avança ou volta, de forma circular. */
  const move = (direction) => {
    current = (current + direction + cards.length) % cards.length;
    render();
  };

  /* Liga a troca automática a cada 5 s, se permitido. */
  const start = () => {
    if (pausedByUser || timer) return;
    timer = setInterval(() => move(1), 5000);
  };

  /* Para a troca automática. */
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  /* Atualiza o botão de pausa (WCAG 2.2.2). */
  const syncPauseButton = () => {
    pauseButton.textContent = pausedByUser ? "Retomar" : "Pausar";
    pauseButton.setAttribute("aria-pressed", String(pausedByUser));
  };

  document.querySelectorAll(".carousel-nav [data-direction]").forEach((button) => {
    button.addEventListener("click", () => move(Number(button.dataset.direction)));
  });
  pauseButton.addEventListener("click", () => {
    pausedByUser = !pausedByUser;
    syncPauseButton();
    if (pausedByUser) stop();
    else start();
  });
  const widget = carousel.closest(".dashboard-widget");
  widget.addEventListener("mouseenter", stop);
  widget.addEventListener("mouseleave", start);
  widget.addEventListener("focusin", stop);
  widget.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  syncPauseButton();
  render();
  start();

  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const status = document.getElementById("form-status");
  const submitButton = form.querySelector(".btn-submit");
  const rules = {
    name: (value) => (value.length >= 3 ? "" : "Informe seu nome completo."),
    email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Informe um e-mail válido, como nome@exemplo.com."),
    phone: (value) => (value.replace(/\D/g, "").length >= 10 ? "" : "Informe o telefone com DDD."),
    message: (value) => (value.length >= 10 ? "" : "Conte em poucas palavras o número de unidades e o principal desafio."),
  };

  /* Valida um campo, mostra a mensagem ao lado e devolve se está ok. */
  const validateField = (name) => {
    const field = form.elements[name];
    const message = rules[name](field.value.trim());
    document.getElementById(`${name}-error`).textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  };

  Object.keys(rules).forEach((name) => {
    form.elements[name].addEventListener("blur", () => validateField(name));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    const invalid = Object.keys(rules).filter((name) => !validateField(name));
    if (invalid.length > 0) {
      form.elements[invalid[0]].focus();
      return;
    }

    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      form.hidden = true;
      feedback.hidden = false;
      feedback.focus();
    } catch (error) {
      status.textContent = "Não foi possível enviar agora. Verifique sua conexão e tente de novo, ou fale conosco pelo WhatsApp.";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });

  document.getElementById("feedback-ok").addEventListener("click", () => {
    feedback.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });
});
/* fim de script.js */
