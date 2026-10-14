/* ============================================================
   DEDEX Dedetizadora - scripts
   ============================================================ */
(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header sólido ao rolar ---------- */
  var header = document.getElementById('header');

  function aoRolar() {
    header.classList.toggle('ativo', window.scrollY > 40);
  }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- 2. Menu hambúrguer ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  function fecharMenu() {
    nav.classList.remove('aberto');
    burger.classList.remove('aberto');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }

  burger.addEventListener('click', function () {
    var aberto = nav.classList.toggle('aberto');
    burger.classList.toggle('aberto', aberto);
    burger.setAttribute('aria-expanded', String(aberto));
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  // fecha ao clicar num link do menu
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) fecharMenu();
  });

  // fecha com Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('aberto')) {
      fecharMenu();
      burger.focus();
    }
  });

  // fecha ao clicar fora
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('aberto')) return;
    if (!e.target.closest('#nav') && !e.target.closest('#burger')) fecharMenu();
  });

  // se voltar para desktop, limpa o estado do menu
  window.matchMedia('(min-width: 860px)').addEventListener('change', function (ev) {
    if (ev.matches) fecharMenu();
  });

  /* ---------- 3. Aparecer ao rolar ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if (semMovimento || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visivel'); });
  } else {
    var obsReveal = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        // leve escalonamento entre irmãos para o grid entrar em cascata
        var irmaos = Array.prototype.slice.call(el.parentNode.children);
        var i = irmaos.indexOf(el);
        el.style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
        el.classList.add('visivel');
        obsReveal.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '220px 0px -60px 0px' });

    reveals.forEach(function (el) { obsReveal.observe(el); });
  }

  /* ---------- 4. Contadores animados ---------- */
  var contadores = document.querySelectorAll('.count');

  function formatar(n) {
    return n.toLocaleString('pt-BR');
  }

  function animarContador(el) {
    var alvo = parseInt(el.dataset.alvo, 10) || 0;
    var duracao = 1600;
    var inicio = null;

    function passo(agora) {
      if (inicio === null) inicio = agora;
      var p = Math.min((agora - inicio) / duracao, 1);
      // easeOutExpo, acelera e desacelera bonito no fim
      var e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = formatar(Math.round(alvo * e));
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  if (semMovimento || !('IntersectionObserver' in window)) {
    contadores.forEach(function (el) {
      el.textContent = formatar(parseInt(el.dataset.alvo, 10) || 0);
    });
  } else {
    var obsCount = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        animarContador(entrada.target);
        obsCount.unobserve(entrada.target);
      });
    }, { threshold: 0.5 });

    contadores.forEach(function (el) { obsCount.observe(el); });
  }

  /* ---------- 5. Vídeo em loop respeita movimento reduzido ---------- */
  var videoLoop = document.querySelector('.solo__video video');

  if (videoLoop) {
    if (semMovimento) {
      // quem desativou animação não recebe vídeo rodando sozinho:
      // vira imagem parada com controles, caso queira assistir
      videoLoop.removeAttribute('autoplay');
      videoLoop.setAttribute('controls', '');
      videoLoop.pause();
    } else {
      // só começa a baixar quando entra na tela, para não pesar no celular
      if ('IntersectionObserver' in window) {
        var obsVid = new IntersectionObserver(function (entradas) {
          entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
              videoLoop.preload = 'auto';
              videoLoop.play().catch(function () {});
            } else {
              videoLoop.pause();
            }
          });
        }, { threshold: 0.25 });
        obsVid.observe(videoLoop);
      } else {
        videoLoop.preload = 'auto';
      }
    }
  }

  /* ---------- 6. Flutuante sai da frente do vídeo com controles ---------- */
  var flutuante = document.querySelector('.wpp-float');
  var videoAlex = document.querySelector('.solo__explica');

  if (flutuante && videoAlex && 'IntersectionObserver' in window) {
    var obsFlut = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        flutuante.classList.toggle('recolhido', entrada.isIntersecting);
      });
    }, { threshold: 0.35 });
    obsFlut.observe(videoAlex);
  }

  /* ---------- 7. Accordion das dúvidas ---------- */
  var botoesFaq = document.querySelectorAll('.faq__btn');

  botoesFaq.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var jaAberto = item.classList.contains('aberto');

      // fecha os outros, deixa um aberto por vez
      document.querySelectorAll('.faq__item.aberto').forEach(function (outro) {
        if (outro === item) return;
        outro.classList.remove('aberto');
        outro.querySelector('.faq__btn').setAttribute('aria-expanded', 'false');
      });

      item.classList.toggle('aberto', !jaAberto);
      btn.setAttribute('aria-expanded', String(!jaAberto));
    });
  });

})();
