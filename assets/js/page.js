/* Comportamento mínimo das páginas internas (privacidade, termos, 404):
   injeta ícones inline e atualiza o ano do rodapé. */
(function () {
  "use strict";
  var ICONS = window.SITE_ICONS || {};
  function icon(name) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || "") + "</svg>";
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-icon]"), function (el) {
    if (!el.firstElementChild) el.innerHTML = icon(el.getAttribute("data-icon"));
  });
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
