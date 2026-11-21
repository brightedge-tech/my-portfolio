/* Renders About and CV pages from profile-data.js, services-data.js and projects-data.js */
(function () {
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var P = window.PROFILE;
  function initials() { return P.name.split(" ").filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join(""); }
  function photo() {
    if (P.photo) return '<img src="' + ROOT + esc(P.photo) + '" alt="' + esc(P.photoAlt) + '">';
    return '<div class="ph" role="img" aria-label="Profile photo placeholder"><b>' + esc(initials()) + "</b><span>Photo to be added</span></div>";
  }
  function social() {
    var l = P.social.filter(function (s) { return s.url; });
    if (!l.length) return "";
    return '<ul class="social" aria-label="Professional links">' + l.map(function (s) { return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.label) + " \u2197</a></li>"; }).join("") + "</ul>";
  }
  function cvBtn(cls) {
    return P.cvPdf ? '<a class="btn ' + (cls || "b1") + '" href="' + ROOT + esc(P.cvPdf) + '" download>Download My CV</a>' : "";
  }
  function sec(id, title, body) { return '<section class="cs-sec" aria-labelledby="h-' + id + '"><h2 id="h-' + id + '">' + title + "</h2>" + body + "</section>"; }
  function todo(t) { return '<p class="todo">' + t + "</p>"; }

  function about(r) {
    var h = '<header class="about-hero"><div class="about-photo">' + photo() + '</div><div><p class="kicker">About</p><h1>' + esc(P.name) + '<span class="role">' + esc(P.title) + "</span></h1><p>" + esc(P.intro) + "</p>" +
      (P.location ? '<p class="muted">' + esc(P.location) + "</p>" : "") + '<div class="pj-actions">' + cvBtn("b1") + '<a class="btn b2 alt" href="' + ROOT + 'cv/">View CV</a></div>' + social() + "</div></header>";
    h += sec("bio", "Professional profile", "<p>" + esc(P.bio) + "</p>");
    h += sec("approach", "Engineering approach", '<div class="div-grid">' + P.approach.map(function (a) { return '<div class="div-card"><h3>' + esc(a[0]) + '</h3><p class="muted">' + esc(a[1]) + "</p></div>"; }).join("") + "</div>");
    h += sec("do", "What I do", '<ul class="tags">' + window.SERVICES.map(function (s) { return '<li><a href="' + ROOT + "services/" + s.slug + '/">' + esc(s.title) + "</a></li>"; }).join("") + '</ul><p class="muted" style="margin-top:14px"><a class="svc-link" href="' + ROOT + 'services/">Explore all services <span aria-hidden="true">\u2192</span></a></p>');
    var pj = window.PROJECTS.filter(function (p) { return p.published && p.featured; });
    h += sec("work", "Featured work", '<div class="div-grid">' + pj.map(function (p) { return '<div class="div-card"><span class="svc-num">PROJECT ' + p.number + '</span><h3><a href="' + ROOT + "projects/" + p.slug + '/">' + esc(p.title) + "</a></h3></div>"; }).join("") + '</div><p style="margin-top:14px"><a class="svc-link" href="' + ROOT + 'projects/">All projects <span aria-hidden="true">\u2192</span></a></p>');
    h += '<section class="cta-band"><h2>Let\u2019s talk about your project</h2><p>Tell me what you are trying to build or improve.</p><a class="btn" href="' + ROOT + 'contact.html">Contact me</a></section>';
    r.innerHTML = h;
  }

  function cv(r) {
    var h = '<header class="cv-head"><div><p class="kicker">Curriculum Vitae</p><h1>' + esc(P.name) + '<span class="role">' + esc(P.title) + '</span></h1></div><div class="pj-actions">' +
      (P.cvPdf ? cvBtn("b1") : '<span class="todo" role="status">CV PDF not yet available</span>') + "</div></header>" + social();
    h += sec("summary", "Professional summary", "<p>" + esc(P.summary) + "</p>");
    h += sec("skills", "Technical skills", '<p class="muted">Technologies demonstrated in portfolio projects, not proficiency levels. <a href="' + ROOT + 'skills/">See the full skills page</a>.</p><dl class="skills">' + window.SKILL_CATEGORIES.map(function (c) { var it = window.SKILLS.filter(function (s) { return s.category === c.id && s.status !== "hidden"; }); return it.length ? "<div><dt>" + esc(c.name) + '</dt><dd><ul class="tags">' + it.map(function (s) { return "<li>" + esc(s.name) + "</li>"; }).join("") + "</ul></dd></div>" : ""; }).join("") + "</dl>");
    h += sec("experience", "Professional experience", (window.EXPERIENCE || []).length ? window.EXPERIENCE.map(function (e) { return '<article class="cv-item"><h3>' + esc(e.title) + '</h3><p class="muted">' + esc(e.organization) + " \u00b7 " + esc([e.start, e.end].filter(Boolean).join(" \u2013 ")) + "</p>" + (e.responsibilities && e.responsibilities.length ? '<ul class="cs-list">' + e.responsibilities.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" : "") + "</article>"; }).join("") : todo("Experience details to be added in profile-data.js."));
    var pj = window.PROJECTS.filter(function (p) { return p.published; });
    h += sec("projects", "Projects", '<ul class="cs-list rel">' + pj.map(function (p) { return '<li><a href="' + ROOT + "projects/" + p.slug + '/">' + esc(p.title) + "</a></li>"; }).join("") + "</ul>");
    h += sec("education", "Education", P.education.length ? P.education.map(function (e) { return '<article class="cv-item"><h3>' + esc(e.qualification) + '</h3><p class="muted">' + esc(e.institution) + " \u00b7 " + esc(e.period) + "</p></article>"; }).join("") : todo("Education details to be added in profile-data.js."));
    if (P.certifications.length) h += sec("certs", "Certifications", '<ul class="cs-list">' + P.certifications.map(function (c) { return "<li>" + esc(c.name) + " \u2014 " + esc(c.issuer) + (c.year ? " (" + esc(c.year) + ")" : "") + "</li>"; }).join("") + "</ul>");
    r.innerHTML = h;
  }

  function boot() {
    var r = $("#profile-root");
    try {
      if (!r) return;
      if (!P || !window.SERVICES || !window.PROJECTS) throw new Error("data");
      if (document.body.getAttribute("data-page") === "cv") cv(r); else about(r);
    } catch { if (r) r.innerHTML = '<p class="error" role="alert">Sorry, this content could not be loaded. Please refresh the page.</p>'; }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
