/* Renders the Projects overview and case-study pages from projects-data.js */
(function () {
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pUrl(slug) { return ROOT + "projects/" + slug + "/"; }
  function published() { return window.PROJECTS.filter(function (p) { return p.status === "published"; }); }
  function bySlug(slug) { return published().filter(function (p) { return p.slug === slug; })[0]; }
  function isUrl(u) { return typeof u === "string" && /^https?:\/\//.test(u); }
  function ph() { return window.PROJECTS_CONFIG && window.PROJECTS_CONFIG.showPlaceholders; }

  function cover(p, cls) {
    if (p.cover) return '<div class="' + cls + '"><img src="' + ROOT + esc(p.cover) + '" alt="' + esc(p.title) + ' cover" loading="lazy"></div>';
    return '<div class="' + cls + ' ph" role="img" aria-label="Cover image placeholder for ' + esc(p.title) + '"><span class="ph-num">' + p.number + '</span><span class="ph-txt">Cover image to be added</span></div>';
  }
  function tags(a, max) {
    var l = max ? a.slice(0, max) : a;
    return '<ul class="tags">' + l.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + (max && a.length > max ? '<li class="more">+' + (a.length - max) + "</li>" : "") + "</ul>";
  }
  function ghBtn(p, cls) {
    return isUrl(p.github) ? '<a class="' + (cls || "gh-link") + '" href="' + esc(p.github) + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>' : "";
  }

  function renderCards(t) {
    var list = published();
    if (!list.length) { t.innerHTML = '<p class="empty">No projects published yet.</p>'; return; }
    t.innerHTML = list.map(function (p) {
      return '<article class="proj-card">' + cover(p, "proj-cover") + '<div class="proj-body"><span class="svc-num">PROJECT ' + p.number + "</span>" +
        '<h3><a href="' + pUrl(p.slug) + '">' + esc(p.title) + "</a></h3><p>" + esc(p.short) + "</p>" + (p.tech.length ? tags(p.tech, 5) : "") +
        '<div class="proj-actions"><a class="svc-link" href="' + pUrl(p.slug) + '" aria-label="View case study: ' + esc(p.title) + '">View Case Study <span aria-hidden="true">→</span></a>' + ghBtn(p) + "</div></div></article>";
    }).join("");
  }

  function diagramTiers(d) {
    var html = '<div class="dg-tiers">';
    d.tiers.forEach(function (t, i) {
      var inst = "";
      for (var k = 0; k < t.instances; k++) inst += '<span class="dg-inst">EC2<small>instance ' + (k + 1) + "</small></span>";
      html += (i ? '<div class="dg-arrow" aria-hidden="true">↓</div>' : "") + '<div class="dg-tier"><div class="dg-head"><strong>' + esc(t.name) + "</strong><span>" + esc(t.zone) + '</span></div><div class="dg-asg"><em>' + esc(t.asg) + '</em><div class="dg-insts">' + inst + "</div></div>" + (t.note ? '<p class="dg-note">' + esc(t.note) + "</p>" : "") + "</div>";
    });
    return html + "</div>";
  }
  function diagramFlow(d) {
    return '<ol class="dg-flow">' + d.stages.map(function (s) {
      return '<li><span class="n">' + s.n + "</span><div><h3>" + esc(s.name) + "</h3><p>" + esc(s.text) + "</p>" + tags(s.tools) + "</div></li>";
    }).join("") + "</ol>";
  }
  function sec(title, inner) { return '<section class="block"><h2>' + title + "</h2>" + inner + "</section>"; }
  function ticks(a) { return '<ul class="ticks">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function pending(msg) { return ph() ? '<p class="todo">' + esc(msg) + "</p>" : ""; }

  function renderDetail(slug) {
    var p = bySlug(slug), main = $("#project-root");
    if (!p) {
      document.title = "Project not found | Ayeah Derrick Nsom-M";
      main.innerHTML = '<div class="container notfound"><h1>Project not found</h1><p>That project does not exist or is not published.</p><a class="btn b1" href="' + ROOT + 'projects/">Back to Projects</a></div>';
      return;
    }
    document.title = p.title + " | Projects | Ayeah Derrick Nsom-M";
    var md = $('meta[name="description"]'); if (md) md.setAttribute("content", p.short);
    var h = '<div class="container"><a class="back" href="' + ROOT + 'projects/">← Back to all projects</a>' +
      '<header class="proj-hero"><div><span class="svc-num big">' + p.number + '</span><p class="kicker">Case study</p><h1>' + esc(p.title) + '</h1><p class="lead">' + esc(p.intro) + '</p><div class="proj-actions">' +
      '<a class="btn b1" href="' + ROOT + 'contact.html">Discuss a similar project</a>' + ghBtn(p, "btn b2") +
      (p.links || []).filter(function (l) { return isUrl(l.url); }).map(function (l) { return '<a class="btn b2" href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer">' + esc(l.label) + " ↗</a>"; }).join("") +
      "</div></div>" + cover(p, "proj-hero-img") + "</header>";
    h += sec("Overview", '<p class="lead sm">' + esc(p.overview) + "</p>");
    h += sec("Objective", p.objective.indexOf("To be added") !== 0 ? '<p class="lead sm">' + esc(p.objective) + "</p>" : pending(p.objective));
    if (p.topics) h += sec("Areas covered", ticks(p.topics));
    if (p.divisions) h += sec("Divisions", '<div class="div-grid">' + p.divisions.map(function (d) { return '<div class="div-card"><h3>' + esc(d.name) + "</h3><p>" + esc(d.text) + "</p>" + tags(d.areas) + "</div>"; }).join("") + '</div><p class="muted src">Source: official website, <a href="https://www.nsomex.com" target="_blank" rel="noopener noreferrer">nsomex.com</a>.</p>');
    if (p.solution.length) h += sec("Solution and implementation", ticks(p.solution));
    else if (ph() && !p.divisions) h += sec("Solution and implementation", pending("Solution and implementation details to be added."));
    if (p.diagram) h += sec(p.diagram.type === "flow" ? "Pipeline workflow" : "Architecture", (p.diagram.type === "flow" ? diagramFlow(p.diagram) : diagramTiers(p.diagram)) + '<p class="muted src">' + esc(p.diagram.caption) + "</p>");
    if (p.details.length) h += sec("Implementation details", '<div class="det-grid">' + p.details.map(function (d) { return '<div class="det"><h3>' + esc(d.title) + "</h3>" + ticks(d.items) + "</div>"; }).join("") + "</div>");
    if (p.tech.length) h += sec("Technologies used", '<div class="pills">' + p.tech.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>");
    if (p.screenshots.length) h += sec("Screenshots and visual evidence", '<div class="shots">' + p.screenshots.map(function (s) { return '<figure><img src="' + ROOT + esc(s.src) + '" alt="' + esc(s.alt || "") + '" loading="lazy"><figcaption>' + esc(s.caption || "") + "</figcaption></figure>"; }).join("") + "</div>");
    else if (ph()) h += sec("Screenshots and visual evidence", pending("Genuine screenshots and project evidence to be added."));
    if (p.challenges.length) h += sec("Challenges and technical considerations", ticks(p.challenges));
    else if (ph()) h += sec("Challenges and technical considerations", pending("To be added once confirmed."));
    if (p.results.length) h += sec("Results", ticks(p.results));
    else if (ph()) h += sec("Results", pending("Results will be added only when supported by evidence."));
    if (p.scopeNote) h += '<aside class="scope-aside" role="note"><strong>Scope note.</strong> ' + esc(p.scopeNote) + "</aside>";
    var rel = (p.related || []).map(bySlug).filter(Boolean);
    if (rel.length) h += sec("Related projects", '<div class="rel-grid">' + rel.map(function (r) { return '<a class="rel-card" href="' + pUrl(r.slug) + '"><span class="svc-num">PROJECT ' + r.number + "</span><strong>" + esc(r.title) + '</strong><span class="svc-link">View Case Study →</span></a>'; }).join("") + "</div>");
    h += '<section class="cta-band"><h2>Interested in similar work? Let\'s discuss your project.</h2><a class="btn b1" href="' + ROOT + 'contact.html">Contact me</a></section>';
    var all = published(), i = all.indexOf(p), pr = all[i - 1], nx = all[i + 1];
    h += '<nav class="pager" aria-label="Other projects">' + (pr ? '<a href="' + pUrl(pr.slug) + '">← ' + esc(pr.title) + "</a>" : "<span></span>") + (nx ? '<a href="' + pUrl(nx.slug) + '">' + esc(nx.title) + " →</a>" : "<span></span>") + "</nav></div>";
    main.innerHTML = h;
  }

  function boot() {
    try {
      if (!window.PROJECTS) throw new Error("data");
      var g = $("#projects-grid"); if (g) renderCards(g);
      var s = document.body.getAttribute("data-project"); if (s) renderDetail(s);
    } catch (e) {
      var r = $("#project-root") || $("#projects-grid");
      if (r) r.innerHTML = '<p class="error" role="alert">Sorry, projects could not be loaded. Please refresh the page.</p>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
