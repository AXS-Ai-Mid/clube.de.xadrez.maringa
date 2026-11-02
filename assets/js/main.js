/* =====================================================================
   CLUBE DE XADREZ DE MARINGÁ — COMPORTAMENTO DO SITE
   - Renderiza os componentes repetidos a partir de assets/js/data.js
   - Navegação (header fixo, menu mobile, link ativo)
   - Animações de entrada com IntersectionObserver (respeita reduced-motion)
   - Filtros de eventos, lightbox da galeria, mapa sob demanda
   - Formulário com validação (envio via WhatsApp ou endpoint opcional)
   - Dados estruturados (JSON-LD) gerados a partir de data.js
   Sem dependências externas.
   ===================================================================== */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  var ICONS = window.SITE_ICONS || {};
  if (!D) return;

  /* ------------------------------------------------------------------
     Utilitários
     ------------------------------------------------------------------ */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function icon(name, cls) {
    var body = ICONS[name] || "";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"' +
      (cls ? ' class="' + cls + '"' : "") + ">" + body + "</svg>";
  }

  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, obj);
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Dados derivados e links centrais
     ------------------------------------------------------------------ */
  var club = D.club;
  var loc = D.location;
  loc.fullAddress = loc.street + " – " + loc.neighborhood + ", " + loc.city + " – " + loc.state + ", " + loc.postalCode;

  function waLink(message) {
    return "https://wa.me/" + club.whatsappNumber + "?text=" + encodeURIComponent(message || "");
  }

  function planUrl(id) {
    var p = (D.plans || []).filter(function (x) { return x.id === id; })[0];
    return p ? p.ctaUrl : "#associar-se";
  }

  var LINKS = {
    "whatsapp": waLink(club.whatsappMessage),
    "whatsapp-trial": waLink(club.whatsappTrialMessage),
    "group": club.whatsappGroupUrl,
    "instagram": club.instagram,
    "facebook": club.facebook,
    "linktree": club.linktree,
    "maps": loc.mapsUrl,
    "directions": loc.directionsUrl,
    "email": "mailto:" + club.email,
    "phone": "tel:" + club.phoneE164,
    "asaas-associado": planUrl("associado"),
    "asaas-mensalidade": planUrl("nao-associado")
  };

  function resolveUrl(url) {
    if (!url) return "#";
    if (url === "whatsapp") return LINKS.whatsapp;
    if (url === "whatsapp-trial") return LINKS["whatsapp-trial"];
    return url;
  }
  function isExternal(url) { return /^https?:\/\//i.test(url); }
  function extAttrs(url) { return isExternal(url) ? ' target="_blank" rel="noopener"' : ""; }

  /* ------------------------------------------------------------------
     Bindings simples: [data-link], [data-text], [data-icon]
     ------------------------------------------------------------------ */
  function bindLinks() {
    $$("[data-link]").forEach(function (a) {
      var url = LINKS[a.getAttribute("data-link")];
      if (url) a.setAttribute("href", url);
    });
  }
  function bindTexts() {
    $$("[data-text]").forEach(function (el) {
      var v = get(D, el.getAttribute("data-text"));
      if (v !== undefined && v !== null) el.textContent = v;
    });
  }
  function bindIcons(ctx) {
    $$("[data-icon]", ctx).forEach(function (el) {
      if (!el.firstElementChild) el.innerHTML = icon(el.getAttribute("data-icon"));
    });
  }

  /* ------------------------------------------------------------------
     Renderizadores
     ------------------------------------------------------------------ */
  function render(name, html) {
    var el = $('[data-render="' + name + '"]');
    if (el) el.innerHTML = html;
    return el;
  }

  function staggerAttr(i, step) {
    return ' style="--delay:' + Math.min(i * (step || 80), 640) + 'ms"';
  }

  function renderHighlights() {
    render("highlights", D.highlights.map(function (h, i) {
      return '<li class="highlight reveal"' + staggerAttr(i, 110) + '>' +
        '<span class="icon-box">' + icon(h.icon) + '</span>' +
        '<div><h3>' + esc(h.title) + '</h3><p>' + esc(h.text) + '</p></div></li>';
    }).join(""));
  }

  var PIECES = ["piecePawn", "pieceKnight", "pieceBishop", "pieceRook", "pieceQueen", "pieceKing"];

  function renderClasses() {
    render("classes", D.classes.map(function (c, i) {
      return '<li class="reveal"' + staggerAttr(i, 90) + '><article class="card">' +
        '<span class="icon-box">' + icon(c.icon) + '</span>' +
        '<h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p>' +
        '<span class="card-watermark" aria-hidden="true">' + icon(PIECES[i % PIECES.length]) + '</span>' +
        '</article></li>';
    }).join(""));
  }

  function renderBenefits() {
    render("benefits", D.benefits.map(function (b, i) {
      return '<li class="reveal"' + staggerAttr(i, 90) + '>' +
        '<span class="tl-marker" aria-hidden="true">' + (i + 1) + '</span>' +
        '<div class="tl-card"><span class="icon-box">' + icon(b.icon) + '</span>' +
        '<div><h3>' + esc(b.title) + '</h3><p>' + esc(b.text) + '</p></div></div></li>';
    }).join(""));
  }

  function renderAffiliations() {
    render("affiliations", (club.affiliations || []).map(function (t) {
      return '<li class="tag">' + esc(t) + '</li>';
    }).join(""));
  }

  /* ---- Eventos ---- */
  var STATUS_LABEL = { inscricoes: "Inscrições abertas", proximo: "Em andamento", embreve: "Em breve", realizado: "Realizado" };
  var TYPE_LABEL = { torneio: "Torneio", aula: "Aulas", especial: "Evento especial" };

  function parseDate(str) {
    if (!str) return null;
    if (/^\d{4}$/.test(str)) return new Date(+str, 0, 1);
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function isUpcoming(ev) {
    if (ev.status === "realizado") return false;
    if (ev.status === "inscricoes" || ev.status === "proximo" || ev.status === "embreve") return true;
    var d = parseDate(ev.date);
    var today = new Date(); today.setHours(0, 0, 0, 0);
    return !!d && d >= today;
  }
  function sortedEvents() {
    var list = D.events.slice();
    list.forEach(function (e, i) { e._i = i; e._up = isUpcoming(e); e._t = parseDate(e.date); });
    return list.sort(function (a, b) {
      if (a._up !== b._up) return a._up ? -1 : 1;
      if (a._up) { // próximos: data crescente, sem data por último
        if (a._t && b._t) return a._t - b._t;
        if (a._t) return -1;
        if (b._t) return 1;
        return a._i - b._i;
      }
      if (a._t && b._t) return b._t - a._t; // realizados: mais recentes primeiro
      return a._i - b._i;
    });
  }

  function renderEventFilters() {
    var filters = [
      { id: "todos", label: "Todos" },
      { id: "proximos", label: "Próximos eventos" },
      { id: "torneio", label: "Torneios" },
      { id: "aula", label: "Aulas" },
      { id: "especial", label: "Eventos especiais" }
    ];
    var el = render("event-filters", filters.map(function (f, i) {
      return '<button class="filter-btn" type="button" data-filter="' + f.id + '" aria-pressed="' + (i === 0) + '">' + f.label + '</button>';
    }).join(""));
    if (!el) return;
    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", el).forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      applyEventFilter(btn.getAttribute("data-filter"));
    });
  }

  function eventCard(ev) {
    var url = resolveUrl(ev.ctaUrl);
    var status = ev.status || (ev._up ? "proximo" : "realizado");
    var statusLabel = ev.type === "aula" && status === "proximo" ? "Turmas abertas" : (STATUS_LABEL[status] || status);
    return '<li class="reveal" data-type="' + esc(ev.type) + '" data-upcoming="' + ev._up + '">' +
      '<article class="card event-card' + (ev._up ? "" : " is-past") + '">' +
      '<div class="event-top"><span class="status status-' + esc(status) + '">' + esc(statusLabel) + '</span>' +
      '<span class="event-date">' + icon("calendar") + esc(ev.dateLabel || ev.date || "Data a definir") + '</span></div>' +
      '<h3>' + esc(ev.title) + '</h3>' +
      '<ul class="event-meta">' +
      '<li>' + icon("mapPin") + '<span>' + esc(ev.location) + '</span></li>' +
      '<li>' + icon("ticket") + '<span>' + esc(TYPE_LABEL[ev.type] || ev.type) + ' · ' + esc(ev.category) + '</span></li>' +
      '</ul>' +
      '<p>' + esc(ev.text) + '</p>' +
      (ev.ctaLabel ? '<div class="card-foot"><a class="btn btn-outline btn-sm" href="' + esc(url) + '"' + extAttrs(url) + '>' + esc(ev.ctaLabel) +
        (isExternal(url) ? icon("arrowUpRight") : "") + '</a></div>' : "") +
      '</article></li>';
  }

  function renderEvents() {
    var list = sortedEvents();
    var el = render("events", list.map(eventCard).join(""));
    if (!el) return;
    if (!list.some(function (e) { return e._up; })) {
      el.insertAdjacentHTML("afterbegin", '<li class="events-empty">Próximo evento em breve. Acompanhe os canais oficiais do clube.</li>');
    }
  }

  function applyEventFilter(filter) {
    var el = $('[data-render="events"]');
    if (!el) return;
    var visible = 0;
    $$("li[data-type]", el).forEach(function (li, i) {
      var show = filter === "todos" ||
        (filter === "proximos" && li.getAttribute("data-upcoming") === "true") ||
        li.getAttribute("data-type") === filter;
      li.hidden = !show;
      if (show) {
        visible++;
        li.classList.remove("is-visible");
        li.style.setProperty("--delay", Math.min(visible * 60, 420) + "ms");
        // reinicia a animação de entrada
        void li.offsetWidth;
        li.classList.add("is-visible");
      }
    });
    var empty = $(".events-empty", el);
    if (empty) empty.remove();
    if (!visible) {
      el.insertAdjacentHTML("afterbegin", '<li class="events-empty">Próximo evento em breve. Acompanhe os canais oficiais do clube.</li>');
    }
  }

  /* ---- Planos ---- */
  function renderPlans() {
    render("plans", D.plans.map(function (p, i) {
      return '<article class="plan reveal' + (p.featured ? " plan-featured" : "") + '"' + staggerAttr(i, 120) + '>' +
        '<span class="plan-badge">' + esc(p.badge) + '</span>' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<div class="plan-price"><strong>' + esc(p.price) + '</strong><span>' + esc(p.priceNote) + '</span></div>' +
        '<p class="plan-desc">' + esc(p.description) + '</p>' +
        '<ul class="checklist">' + p.benefits.map(function (b) {
          return '<li><span>' + icon("check") + '</span>' + esc(b) + '</li>';
        }).join("") + '</ul>' +
        '<div class="plan-foot">' +
        '<a class="btn ' + (p.featured ? "btn-primary btn-shine" : "btn-outline") + ' btn-lg btn-block" href="' + esc(p.ctaUrl) + '" target="_blank" rel="noopener">' + esc(p.ctaLabel) + icon("arrowUpRight") + '</a>' +
        '<span class="plan-external">' + icon("external") + 'Abre em nova aba na plataforma Asaas</span>' +
        '</div></article>';
    }).join(""));
  }

  /* ---- Galeria + Lightbox ---- */
  var supportsWebp = (function () {
    try {
      var c = document.createElement("canvas");
      return c.getContext && c.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch (e) { return false; }
  })();

  function imageSources(item) {
    if (/\.(jpe?g|png|webp|avif|gif)$/i.test(item.image)) {
      return { src: item.image, srcset: "", webp: "", full: item.image };
    }
    var ws = (item.widths && item.widths.length ? item.widths : [800]).slice().sort(function (a, b) { return a - b; });
    var max = ws[ws.length - 1];
    return {
      src: item.image + "-" + max + ".jpg",
      srcset: ws.map(function (w) { return item.image + "-" + w + ".jpg " + w + "w"; }).join(", "),
      webp: ws.map(function (w) { return item.image + "-" + w + ".webp " + w + "w"; }).join(", "),
      full: item.image + "-" + max + (supportsWebp ? ".webp" : ".jpg")
    };
  }

  function renderGallery() {
    var el = render("gallery", D.gallery.map(function (g, i) {
      var s = imageSources(g);
      var wide = g.span === "wide";
      var sizes = wide ? "(min-width: 960px) 50vw, (min-width: 760px) 66vw, 100vw" : "(min-width: 960px) 25vw, (min-width: 760px) 33vw, 50vw";
      return '<button class="gallery-item reveal' + (g.span ? " span-" + esc(g.span) : "") + '" type="button" data-index="' + i + '"' + staggerAttr(i, 70) +
        ' aria-label="Ampliar imagem: ' + esc(g.caption || g.alt) + '">' +
        '<picture>' + (s.webp ? '<source type="image/webp" srcset="' + s.webp + '" sizes="' + sizes + '">' : "") +
        '<img src="' + esc(s.src) + '"' + (s.srcset ? ' srcset="' + s.srcset + '" sizes="' + sizes + '"' : "") +
        (g.width ? ' width="' + g.width + '" height="' + g.height + '"' : "") +
        ' alt="' + esc(g.alt) + '" loading="lazy" decoding="async"></picture>' +
        '<span class="gallery-caption"><span>' + esc(g.caption || "") + '</span>' + icon("zoomIn") + '</span>' +
        '</button>';
    }).join(""));
    if (el) el.addEventListener("click", function (e) {
      var btn = e.target.closest(".gallery-item");
      if (btn) openLightbox(+btn.getAttribute("data-index"));
    });
  }

  var lb = {
    el: $("#lightbox"), index: 0, lastFocus: null,
    img: null, cap: null
  };
  function openLightbox(i) {
    if (!lb.el) return;
    lb.img = lb.img || $(".lightbox-img", lb.el);
    lb.cap = lb.cap || $(".lightbox-caption", lb.el);
    lb.lastFocus = document.activeElement;
    lb.el.hidden = false;
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(function () { lb.el.classList.add("is-open"); });
    showLightbox(i);
    $(".lightbox-close", lb.el).focus();
  }
  function showLightbox(i) {
    var n = D.gallery.length;
    lb.index = (i + n) % n;
    var g = D.gallery[lb.index];
    var s = imageSources(g);
    lb.img.classList.add("is-loading");
    lb.img.onload = function () { lb.img.classList.remove("is-loading"); };
    lb.img.src = s.full;
    lb.img.alt = g.alt || "";
    lb.cap.textContent = (g.caption || "") + "  ·  " + (lb.index + 1) + " / " + n;
    // pré-carrega a próxima
    var next = new Image(); next.src = imageSources(D.gallery[(lb.index + 1) % n]).full;
  }
  function closeLightbox() {
    if (!lb.el || lb.el.hidden) return;
    lb.el.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    var done = function () { lb.el.hidden = true; };
    reduceMotion ? done() : setTimeout(done, 320);
    if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
  }
  function initLightbox() {
    if (!lb.el) return;
    $(".lightbox-close", lb.el).addEventListener("click", closeLightbox);
    $(".lightbox-prev", lb.el).addEventListener("click", function () { showLightbox(lb.index - 1); });
    $(".lightbox-next", lb.el).addEventListener("click", function () { showLightbox(lb.index + 1); });
    lb.el.addEventListener("click", function (e) { if (e.target === lb.el || e.target.classList.contains("lightbox-figure")) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lb.el.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showLightbox(lb.index - 1);
      else if (e.key === "ArrowRight") showLightbox(lb.index + 1);
      else if (e.key === "Tab") { // mantém o foco dentro do lightbox
        var f = $$("button", lb.el);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // gestos de toque (deslizar)
    var x0 = null;
    lb.el.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.el.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 48) showLightbox(lb.index + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ---- Depoimentos ---- */
  function renderTestimonials() {
    render("testimonials", D.testimonials.map(function (t, i) {
      var initials = t.placeholder ? icon("pieceKnight") : esc((t.name || "?").split(/\s+/).map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase());
      return '<li class="reveal"' + staggerAttr(i, 110) + '><figure class="testimonial' + (t.placeholder ? " is-placeholder" : "") + '">' +
        (t.placeholder ? '<span class="editable-flag">Conteúdo editável</span>' : "") +
        '<span class="testimonial-quote-icon" aria-hidden="true">' + icon("quote") + '</span>' +
        '<blockquote>' + esc(t.quote) + '</blockquote>' +
        '<figcaption class="testimonial-author"><span class="testimonial-avatar" aria-hidden="true">' + initials + '</span>' +
        '<div><strong>' + esc(t.name) + '</strong><span>' + esc(t.role) + '</span></div></figcaption>' +
        '</figure></li>';
    }).join(""));
  }

  /* ---- Horários ---- */
  function fmtTime(t) {
    var p = t.split(":");
    return p[1] === "00" ? p[0] + "h" : p[0] + "h" + p[1];
  }
  function splitRange(r) { return r.split(/\s*[–-]\s*/); }
  function renderHours() {
    var table = $('[data-render="hours"]');
    if (!table) return;
    var todayIdx = (new Date().getDay() + 6) % 7; // 0 = segunda
    var rows = loc.hours.map(function (h, i) {
      var closed = !h.times || !h.times.length;
      var cls = [closed ? "is-closed" : "", i === todayIdx ? "is-today" : ""].join(" ").trim();
      var times = closed ? "Fechado" : h.times.map(function (r) {
        var a = splitRange(r); return fmtTime(a[0]) + " – " + fmtTime(a[1]);
      }).join('<span class="sep">·</span>');
      return '<tr' + (cls ? ' class="' + cls + '"' : "") + '><th scope="row">' + esc(h.day) + '</th><td>' + times + '</td></tr>';
    }).join("");
    table.insertAdjacentHTML("beforeend", "<tbody>" + rows + "</tbody>");
  }

  /* ---- Canais de contato e redes ---- */
  function channel(cls, iconName, title, value, url) {
    return '<li><a class="channel ' + cls + '" href="' + esc(url) + '"' + extAttrs(url) + '>' +
      '<span class="icon-box">' + icon(iconName) + '</span>' +
      '<span class="channel-body"><strong>' + esc(title) + '</strong><span>' + esc(value) + '</span></span>' +
      '<span class="channel-arrow">' + icon("arrowUpRight") + '</span></a></li>';
  }
  function renderChannels() {
    render("channels", [
      channel("channel-whatsapp", "whatsapp", "WhatsApp oficial", club.phoneDisplay + " · resposta mais rápida", LINKS.whatsapp),
      channel("", "message", "Grupo de WhatsApp do clube", "Avisos de aulas, torneios e encontros", LINKS.group),
      channel("", "instagram", "Instagram", club.instagramHandle, LINKS.instagram),
      channel("", "facebook", "Facebook", "facebook.com/cxmga", LINKS.facebook),
      channel("", "linktree", "Linktree", "Todos os links oficiais em um só lugar", LINKS.linktree),
      channel("", "mail", "E-mail", club.email, LINKS.email)
    ].join(""));
  }
  function socialLinks() {
    return [
      ["instagram", "Instagram", LINKS.instagram],
      ["facebook", "Facebook", LINKS.facebook],
      ["whatsapp", "WhatsApp", LINKS.whatsapp],
      ["linktree", "Linktree", LINKS.linktree]
    ].map(function (s) {
      return '<a href="' + esc(s[2]) + '" target="_blank" rel="noopener" aria-label="' + s[1] + '" title="' + s[1] + '">' + icon(s[0]) + '</a>';
    }).join("");
  }
  function renderSocial() {
    render("social", socialLinks());
    render("social-mini", socialLinks());
  }

  function renderSubjects() {
    var sel = $('[data-render="subjects"]');
    if (!sel) return;
    sel.insertAdjacentHTML("beforeend", (D.formSubjects || []).map(function (s) {
      return '<option value="' + esc(s) + '">' + esc(s) + '</option>';
    }).join(""));
  }

  /* ---- Peças flutuantes do hero ---- */
  function renderHeroPieces() {
    if (reduceMotion) { render("hero-pieces", ""); return; }
    var spec = [
      ["pieceKing", 78, 18, 150, 22, 0], ["pieceQueen", 62, 70, 96, 19, 2], ["pieceKnight", 90, 62, 120, 24, 4],
      ["pieceBishop", 48, 12, 72, 17, 1], ["pieceRook", 70, 86, 64, 21, 3], ["piecePawn", 86, 30, 48, 16, 5], ["pieceKnight", 36, 82, 56, 23, 2]
    ];
    render("hero-pieces", spec.map(function (p) {
      return '<span class="hero-piece" style="left:' + p[1] + '%;top:' + p[2] + '%;--s:' + p[3] + 'px;--d:' + p[4] + 's;--delay:-' + p[5] + 's">' + icon(p[0]) + '</span>';
    }).join(""));
  }

  /* ------------------------------------------------------------------
     Header, menu mobile, link ativo, parallax
     ------------------------------------------------------------------ */
  function initHeader() {
    var header = $("#site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 24); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle", header);
    var menu = $("#mobile-menu");
    if (toggle && menu) {
      $$(".mobile-links a", menu).forEach(function (a, i) { a.style.setProperty("--i", i); });
      var open = function () {
        menu.hidden = false;
        requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("is-open"); }); });
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fechar menu");
        document.body.classList.add("menu-open");
      };
      var close = function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
        document.body.classList.remove("menu-open");
        var done = function () { if (!menu.classList.contains("is-open")) menu.hidden = true; };
        reduceMotion ? done() : setTimeout(done, 420);
      };
      toggle.addEventListener("click", function () { menu.classList.contains("is-open") ? close() : open(); });
      menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-open")) { close(); toggle.focus(); } });
      window.addEventListener("resize", function () { if (window.innerWidth >= 1024 && menu.classList.contains("is-open")) close(); });
    }

    // Link ativo conforme a seção visível
    var links = $$(".nav-links a[href^='#']");
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    if ("IntersectionObserver" in window) {
      var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.remove("is-active"); });
            var a = map[en.target.id];
            if (a) a.classList.add("is-active");
          }
        });
      }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  function initParallax() {
    if (reduceMotion) return;
    var media = $(".hero-media");
    var hero = $(".hero");
    if (!media || !hero) return;
    var ticking = false;
    var update = function () {
      ticking = false;
      if (window.innerWidth < 760) { media.style.transform = ""; return; }
      var y = window.scrollY;
      if (y > hero.offsetHeight) return;
      media.style.transform = "translate3d(0," + (y * 0.16).toFixed(1) + "px,0)";
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     Animações de entrada
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------
     Mapa sob demanda
     ------------------------------------------------------------------ */
  function initMap() {
    var btn = $("#load-map");
    var facade = $("#map-facade");
    if (!btn || !facade) return;
    btn.addEventListener("click", function () {
      var iframe = document.createElement("iframe");
      iframe.className = "map-frame";
      iframe.src = loc.embedUrl;
      iframe.title = "Mapa do Clube de Xadrez de Maringá no Google Maps";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      facade.replaceWith(iframe);
    });
  }

  /* ------------------------------------------------------------------
     Formulário de contato
     ------------------------------------------------------------------ */
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status");
    var hint = $("#form-hint");
    var submit = $("#form-submit");
    if (D.formEndpoint && hint) hint.textContent = "Responderemos pelo e-mail ou WhatsApp informados.";

    var rules = {
      nome: function (v) { return v.trim().length >= 2 ? "" : "Informe seu nome."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido."; },
      whatsapp: function (v) { var d = v.replace(/\D/g, ""); return d.length >= 10 && d.length <= 13 ? "" : "Informe um WhatsApp com DDD (ex.: 44 99999-9999)."; },
      assunto: function (v) { return v ? "" : "Selecione um assunto."; },
      mensagem: function (v) { return v.trim().length >= 10 ? "" : "Escreva uma mensagem com pelo menos 10 caracteres."; }
    };

    function validateField(name) {
      var input = form.elements[name];
      var err = $("#err-" + name);
      var msg = rules[name](input.value);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg;
      return !msg;
    }

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener("blur", function () { validateField(name); });
      input.addEventListener("input", function () { if (input.getAttribute("aria-invalid") === "true") validateField(name); });
    });

    // máscara leve para telefone
    var tel = form.elements.whatsapp;
    if (tel) tel.addEventListener("input", function () {
      var d = tel.value.replace(/\D/g, "").slice(0, 11);
      var out = d;
      if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
      tel.value = out;
    });

    function setStatus(type, html) {
      status.className = "form-status is-" + type;
      status.innerHTML = html;
      status.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements._gotcha && form.elements._gotcha.value) return; // honeypot
      var ok = Object.keys(rules).map(validateField).every(Boolean);
      if (!ok) {
        var firstInvalid = $('[aria-invalid="true"]', form);
        if (firstInvalid) firstInvalid.focus();
        setStatus("error", "Revise os campos destacados para enviar sua mensagem.");
        return;
      }
      var v = function (n) { return form.elements[n].value.trim(); };
      var text = "Olá! Vim pelo site do Clube de Xadrez de Maringá.\n" +
        "Nome: " + v("nome") + "\n" +
        "E-mail: " + v("email") + "\n" +
        "WhatsApp: " + v("whatsapp") + "\n" +
        "Assunto: " + v("assunto") + "\n" +
        "Mensagem: " + v("mensagem");

      if (D.formEndpoint) {
        submit.classList.add("is-loading");
        var fd = new FormData(form);
        fd.append("_subject", "[Site CX Maringá] " + v("assunto"));
        fetch(D.formEndpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json ? r.json().catch(function () { return {}; }) : {}; })
          .then(function () {
            form.reset();
            setStatus("success", "<strong>Mensagem enviada!</strong> Obrigado pelo contato — responderemos em breve. Se preferir agilidade, fale conosco pelo <a href=\"" + esc(LINKS.whatsapp) + "\" target=\"_blank\" rel=\"noopener\">WhatsApp</a>.");
          })
          .catch(function () {
            setStatus("error", "Não foi possível enviar agora. Você pode <a href=\"" + esc(waLink(text)) + "\" target=\"_blank\" rel=\"noopener\">enviar esta mensagem pelo WhatsApp</a> ou escrever para <a href=\"mailto:" + esc(club.email) + "\">" + esc(club.email) + "</a>.");
          })
          .finally(function () { submit.classList.remove("is-loading"); });
        return;
      }

      // Sem servidor: abre o WhatsApp com a mensagem pronta
      var url = waLink(text);
      var win = window.open(url, "_blank", "noopener");
      form.reset();
      $$("[aria-invalid]", form).forEach(function (el) { el.removeAttribute("aria-invalid"); });
      setStatus("success", "<strong>Tudo certo!</strong> Abrimos o WhatsApp com a sua mensagem pronta para enviar." +
        (win ? "" : " Se a janela não abriu, ") + " <a href=\"" + esc(url) + "\" target=\"_blank\" rel=\"noopener\">" + (win ? "Abrir novamente" : "clique aqui para abrir o WhatsApp") + "</a>.");
    });
  }

  /* ------------------------------------------------------------------
     Dados estruturados (JSON-LD)
     ------------------------------------------------------------------ */
  function injectJsonLd() {
    var base = club.siteUrl || (location.origin + location.pathname.replace(/[^/]*$/, ""));
    var opening = [];
    loc.hours.forEach(function (h) {
      (h.times || []).forEach(function (r) {
        var a = splitRange(r);
        opening.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + h.dayCode, opens: a[0], closes: a[1] });
      });
    });
    var place = {
      "@type": "Place",
      name: club.name + " – " + loc.venueName,
      address: { "@type": "PostalAddress", streetAddress: loc.street, addressLocality: loc.city, addressRegion: loc.state, postalCode: loc.postalCode, addressCountry: "BR" }
    };
    var graph = [{
      "@type": ["SportsClub", "LocalBusiness"],
      "@id": base + "#clube",
      name: club.name,
      alternateName: club.shortName,
      url: base,
      logo: base + "assets/img/brand/icon-512.png",
      image: base + "assets/img/brand/og-image.jpg",
      description: "Clube de xadrez em Maringá – PR com aulas para crianças, jovens e adultos, torneios e academia de treinamento. Fundado em 1954.",
      telephone: club.phoneE164,
      email: club.email,
      foundingDate: "1954-06-08",
      sport: "Xadrez",
      address: place.address,
      geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng },
      hasMap: loc.mapsUrl,
      openingHoursSpecification: opening,
      sameAs: [club.instagram, club.facebook, club.linktree],
      areaServed: { "@type": "City", name: "Maringá" }
    }, {
      "@type": "WebSite", url: base, name: club.name, inLanguage: "pt-BR"
    }];
    D.events.forEach(function (ev) {
      if (!isUpcoming(ev) || !/^\d{4}-\d{2}-\d{2}$/.test(ev.date) || ev.status === "embreve") return;
      graph.push({
        "@type": "Event",
        name: ev.title,
        startDate: ev.date,
        description: ev.text,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: place,
        organizer: { "@type": "Organization", name: club.name, url: base },
        offers: isExternal(ev.ctaUrl) ? { "@type": "Offer", url: ev.ctaUrl, availability: "https://schema.org/InStock" } : undefined
      });
    });
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------------
     Inicialização
     ------------------------------------------------------------------ */
  function init() {
    document.documentElement.classList.add("js");
    renderHighlights();
    renderClasses();
    renderBenefits();
    renderAffiliations();
    renderEventFilters();
    renderEvents();
    renderPlans();
    renderGallery();
    renderTestimonials();
    renderHours();
    renderChannels();
    renderSocial();
    renderSubjects();
    renderHeroPieces();

    bindLinks();
    bindTexts();
    bindIcons(document);

    initHeader();
    initParallax();
    initReveal();
    initLightbox();
    initMap();
    initForm();
    injectJsonLd();

    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
