/* Shared rendering for Services pages. Data comes from services-data.js / tech-data.js */
(function () {
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var NS = "http://www.w3.org/2000/svg";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function icon(path, cls) { return '<svg class="' + (cls || "ico") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>"; }
  function bySlug(slug) { return window.SERVICES.filter(function (s) { return s.slug === slug; })[0]; }
  function sUrl(slug) { return ROOT + "services/" + slug + "/"; }
  function cUrl(slug) { return ROOT + "contact.html" + (slug ? "?service=" + encodeURIComponent(slug) : ""); }

  /* ---------- navigation (shared, with mobile toggle) ---------- */
  function initNav() {
    var btn = $(".nav-toggle"), menu = $("#nav-menu");
    if (!btn || !menu) return;
    function set(open) { btn.setAttribute("aria-expanded", open); menu.classList.toggle("open", open); }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { set(false); btn.focus(); } });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") set(false); });
  }

  /* ---------- services overview ---------- */
  function renderCards(target) {
    target.innerHTML = window.SERVICES.map(function (s) {
      return '<article class="svc-card"><div class="svc-top"><span class="svc-num">' + s.number + "</span>" + icon(s.icon, "svc-ico") + "</div>" +
        '<h3><a href="' + sUrl(s.slug) + '">' + esc(s.title) + "</a></h3><p>" + esc(s.short) + "</p>" +
        '<a class="svc-link" href="' + sUrl(s.slug) + '" aria-label="Explore service: ' + esc(s.title) + '">Explore Service <span aria-hidden="true">→</span></a></article>';
    }).join("");
  }

  /* ---------- technology explorer (expand/collapse + filters) ---------- */
  function renderTech(target) {
    var cats = window.TECH_CATEGORIES, active = "all", open = {};
    var bar = el("div", { class: "tech-filters", role: "group", "aria-label": "Filter technologies by category" });
    var list = el("div", { class: "tech-list" });
    var tools = el("div", { class: "tech-tools" });
    tools.innerHTML = '<button type="button" class="chip-btn" data-act="expand">Expand all</button><button type="button" class="chip-btn" data-act="collapse">Collapse all</button>';
    function chip(id, label) {
      var b = el("button", { type: "button", class: "chip-btn", "data-cat": id, "aria-pressed": id === active }, esc(label));
      return b;
    }
    function draw() {
      bar.innerHTML = "";
      bar.appendChild(chip("all", "All"));
      cats.forEach(function (c) { bar.appendChild(chip(c.id, c.name)); });
      Array.prototype.forEach.call(bar.children, function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-cat") === active); });
      list.innerHTML = "";
      cats.filter(function (c) { return active === "all" || c.id === active; }).forEach(function (c) {
        var isOpen = !!open[c.id] || active !== "all";
        var sec = el("section", { class: "tech-cat" });
        sec.innerHTML = '<h3><button type="button" class="tech-head" aria-expanded="' + isOpen + '" aria-controls="tp-' + c.id + '" data-id="' + c.id + '"><span>' + esc(c.name) + '</span><span class="count">' + c.items.length + ' <i aria-hidden="true">' + (isOpen ? "−" : "+") + "</i></span></button></h3>" +
          '<div class="tech-panel" id="tp-' + c.id + '"' + (isOpen ? "" : " hidden") + ">" +
          c.items.map(function (t) { return '<div class="tech-card"><strong>' + esc(t.name) + "</strong><span>" + esc(t.note) + "</span></div>"; }).join("") + "</div>";
        list.appendChild(sec);
      });
      if (!list.children.length) list.innerHTML = '<p class="empty">No technologies found.</p>';
    }
    bar.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { active = b.getAttribute("data-cat"); draw(); } });
    list.addEventListener("click", function (e) { var b = e.target.closest(".tech-head"); if (b) { var id = b.getAttribute("data-id"); open[id] = !open[id]; draw(); var nb = list.querySelector('[data-id="' + id + '"]'); if (nb) nb.focus(); } });
    tools.addEventListener("click", function (e) { var a = e.target.getAttribute("data-act"); if (!a) return; cats.forEach(function (c) { open[c.id] = a === "expand"; }); if (active !== "all") active = "all"; draw(); });
    target.appendChild(bar); target.appendChild(tools); target.appendChild(list);
    draw();
  }

  /* ---------- delivery process (interactive stepper) ---------- */
  function renderProcess(target) {
    var steps = window.PROCESS, cur = 0;
    var rail = el("div", { class: "proc-rail", role: "tablist", "aria-label": "Delivery stages" });
    var panel = el("div", { class: "proc-panel", role: "tabpanel", "aria-live": "polite" });
    steps.forEach(function (s, i) {
      var b = el("button", { type: "button", role: "tab", class: "proc-step", id: "ps-" + i, "aria-controls": "pp" }, '<span class="n">' + (i + 1) + "</span><b>" + esc(s.step) + "</b>");
      b.addEventListener("click", function () { go(i); });
      b.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { go((cur + 1) % steps.length, true); e.preventDefault(); }
        if (e.key === "ArrowLeft") { go((cur + steps.length - 1) % steps.length, true); e.preventDefault(); }
      });
      rail.appendChild(b);
    });
    panel.id = "pp";
    function go(i, focus) {
      cur = i;
      Array.prototype.forEach.call(rail.children, function (b, k) {
        b.setAttribute("aria-selected", k === i); b.setAttribute("tabindex", k === i ? "0" : "-1");
        b.classList.toggle("done", k < i); b.classList.toggle("on", k === i);
      });
      panel.setAttribute("aria-labelledby", "ps-" + i);
      panel.innerHTML = "<h3>" + (i + 1) + ". " + esc(steps[i].step) + "</h3><p>" + esc(steps[i].text) + "</p>";
      if (focus) rail.children[i].focus();
    }
    target.appendChild(rail); target.appendChild(panel); go(0);
  }

  function renderScope(target) {
    var d = window.DELIVERY_SCOPE;
    function ul(a) { return "<ul>" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
    target.innerHTML = '<div class="scope-col direct"><h3>Delivered directly by me</h3>' + ul(d.direct) + "</div>" +
      '<div class="scope-col wider"><h3>Wider NSOMEX Group, team and partners</h3>' + ul(d.wider) + "</div>" +
      '<p class="scope-note">' + esc(d.examples) + "</p>";
  }

  /* ---------- service detail page ---------- */
  function list(a) { return '<ul class="ticks">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function renderDetail(slug) {
    var s = bySlug(slug), main = $("#service-root");
    if (!s) {
      main.innerHTML = '<div class="container notfound"><h1>Service not found</h1><p>That service does not exist.</p><a class="btn b1" href="' + ROOT + 'services/">Back to Services</a></div>';
      document.title = "Service not found | Ayeah Derrick Nsom-M";
      return;
    }
    document.title = s.title + " | Services | Ayeah Derrick Nsom-M";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", s.short);
    var idx = window.SERVICES.indexOf(s), prev = window.SERVICES[idx - 1], next = window.SERVICES[idx + 1];
    var html = '<div class="container"><a class="back" href="' + ROOT + 'services/">← Back to all services</a>' +
      '<header class="svc-hero"><div><span class="svc-num big">' + s.number + '</span><p class="kicker">' + esc(s.title) + "</p><h1>" + esc(s.headline) + '</h1><p class="lead">' + esc(s.intro) + '</p>' +
      '<a class="btn b1" href="' + cUrl(s.slug) + '">Discuss this service</a></div><div class="svc-art">' + icon(s.icon, "art") + "</div></header>" +
      '<section class="block"><h2>What it includes</h2>' + list(s.includes) + "</section>" +
      '<section class="block"><h2>Key capabilities</h2>' + list(s.capabilities) + "</section>";
    if (s.extra === "process") html += '<section class="block"><h2>The delivery process</h2><div id="process"></div></section><section class="block"><h2>Who delivers what</h2><div class="scope" id="scope"></div></section>';
    if (s.extra === "tech") html += '<section class="block"><h2>Technology ecosystem</h2><p class="muted">Platforms and technologies within the service offering. Not a list of certifications or partnerships.</p><div id="tech"></div></section>';
    else html += '<section class="block"><h2>Relevant technologies</h2><div class="pills">' + s.tech.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div></section>";
    html += '<section class="block"><h2>Business value</h2>' + list(s.value) + "</section>" +
      '<section class="block related"><h2>Related projects</h2><p class="muted">Project case studies will be published in the Projects section. None are linked here yet.</p></section>' +
      '<section class="cta-band"><h2>Interested in this service? Let\'s discuss your project.</h2><a class="btn b1" href="' + cUrl(s.slug) + '">Contact me about ' + esc(s.title) + "</a></section>" +
      '<nav class="pager" aria-label="Other services">' + (prev ? '<a href="' + sUrl(prev.slug) + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a href="' + sUrl(next.slug) + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</nav></div>";
    main.innerHTML = html;
    if ($("#process")) renderProcess($("#process"));
    if ($("#scope")) renderScope($("#scope"));
    if ($("#tech")) renderTech($("#tech"));
  }

  function boot() {
    initNav();
    try {
      if (!window.SERVICES || !window.TECH_CATEGORIES) throw new Error("data");
      var grid = $("#services-grid"); if (grid) renderCards(grid);
      var slug = document.body.getAttribute("data-service"); if (slug) renderDetail(slug);
      var form = $("#contact-service");
      if (form) {
        window.SERVICES.forEach(function (s) { form.appendChild(el("option", { value: s.slug }, esc(s.title))); });
        var q = new URLSearchParams(location.search).get("service"); if (q) form.value = q;
      }
    } catch (err) {
      var r = $("#service-root") || $("#services-grid");
      if (r) r.innerHTML = '<p class="error" role="alert">Sorry, this content could not be loaded. Please refresh the page.</p>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
