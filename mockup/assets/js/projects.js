/* Renders Projects overview and case-study pages from projects-data.js */
(function () {
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pub() { return window.PROJECTS.filter(function (p) { return p.published; }); }
  function url(slug) { return ROOT + "projects/" + slug + "/"; }
  function bySlug(s) { return pub().filter(function (p) { return p.slug === s; })[0]; }
  function tags(p, n) { return '<ul class="tags" aria-label="Technologies">' + p.technologies.slice(0, n || 99).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; }
  function gh(p) { return p.githubUrl ? '<a class="btn b2 gh" href="' + esc(p.githubUrl) + '" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>' : ""; }
  function cover(p) {
    if (p.cover) return '<img src="' + ROOT + esc(p.cover) + '" alt="' + esc(p.title) + ' cover" loading="lazy">';
    return '<div class="ph" role="img" aria-label="Cover image placeholder"><b>' + p.number + '</b><span>Cover image to be added</span></div>';
  }
  function box(x, y, w, h, t, c) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + (c || "#fff") + '" stroke="#1f6bff" stroke-width="1.5"/><text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 5) + '" text-anchor="middle" font-size="14" fill="#0b1b3a">' + t + "</text>"; }
  function diagram(p) {
    var d = p.diagram; if (!d) return "";
    var s;
    if (d.type === "three-tier") {
      s = '<svg viewBox="0 0 760 330" role="img" aria-labelledby="dt"><title id="dt">Web tier in two public subnets and application tier in two private subnets, each an Auto Scaling Group</title>' +
        '<rect x="10" y="10" width="740" height="310" rx="16" fill="#f3f8ff" stroke="#c5d6f3"/><text x="26" y="34" font-size="14" font-weight="700" fill="#43557a">AWS · Terraform-provisioned</text>' +
        '<rect x="30" y="50" width="700" height="120" rx="12" fill="#e9fbf2" stroke="#19c37d" stroke-dasharray="6 4"/><text x="44" y="72" font-size="13" font-weight="700" fill="#0e7a4c">Web tier · Auto Scaling Group (min 2, max 3) · Apache HTTP Server</text>' +
        box(70, 90, 280, 60, "Public subnet A · EC2") + box(410, 90, 280, 60, "Public subnet B · EC2") +
        '<rect x="30" y="190" width="700" height="120" rx="12" fill="#eaf2ff" stroke="#1f6bff" stroke-dasharray="6 4"/><text x="44" y="212" font-size="13" font-weight="700" fill="#1450d6">Application tier · Auto Scaling Group (min 2, max 3)</text>' +
        box(70, 230, 280, 60, "Private subnet A · EC2") + box(410, 230, 280, 60, "Private subnet B · EC2") +
        '<path d="M380 170v20" stroke="#1f6bff" stroke-width="2"/></svg>';
    } else {
      var st = ["Source", "Jenkins CI", "SonarQube + OWASP DC", "Docker build", "Trivy scan", "AWS EKS", "Argo CD + Helm", "Prometheus + Grafana"];
      s = '<svg viewBox="0 0 760 300" role="img" aria-labelledby="dt"><title id="dt">Eight pipeline stages from source code to monitoring</title>';
      st.forEach(function (t, i) { var x = 20 + (i % 4) * 185, y = i < 4 ? 40 : 180; s += box(x, y, 160, 70, t, i === 7 ? "#e9fbf2" : "#fff") + '<text x="' + (x + 10) + '" y="' + (y - 8) + '" font-size="12" font-weight="700" fill="#1f6bff">' + (i + 1) + "</text>"; if (i % 4 < 3) s += '<path d="M' + (x + 160) + " " + (y + 35) + 'h25" stroke="#1f6bff" stroke-width="2"/>'; });
      s += '<path d="M600 110v35H100v35" fill="none" stroke="#1f6bff" stroke-width="2"/>';
      s = s.replace('M600 110v35H100v35', 'M580 110v35H100v35');
      s += "</svg>";
    }
    return '<figure class="diagram">' + s + "<figcaption>" + esc(d.caption) + "</figcaption></figure>";
  }
  function sec(id, title, body) { return body ? '<section class="cs-sec" aria-labelledby="h-' + id + '"><h2 id="h-' + id + '">' + title + "</h2>" + body + "</section>" : ""; }
  function list(a) { return a && a.length ? "<ul class=\"cs-list\">" + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function todo(t) { return '<p class="todo">' + t + "</p>"; }

  function overview(t) {
    t.innerHTML = pub().map(function (p) {
      return '<article class="pj-card"><a class="pj-cover" href="' + url(p.slug) + '" tabindex="-1" aria-hidden="true">' + cover(p) + '</a><div class="pj-body"><span class="svc-num">PROJECT ' + p.number + "</span>" +
        '<h2><a href="' + url(p.slug) + '">' + esc(p.title) + "</a></h2><p>" + esc(p.short) + "</p>" + tags(p, 6) +
        '<div class="pj-actions"><a class="svc-link" href="' + url(p.slug) + '" aria-label="View case study: ' + esc(p.title) + '">View Case Study <span aria-hidden="true">→</span></a>' +
        (p.githubUrl ? '<a class="svc-link" href="' + esc(p.githubUrl) + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>' : "") + "</div></div></article>";
    }).join("");
  }

  function detail(slug) {
    var p = bySlug(slug), r = $("#project-root");
    if (!p) { r.innerHTML = '<p class="error" role="alert">Project not found. <a href="' + ROOT + 'projects/">Back to projects</a></p>'; return; }
    document.title = p.title + " | Projects | Ayeah Derrick Nsom-M";
    var h = '<a class="back" href="' + ROOT + 'projects/">← All projects</a><header class="cs-hero"><div><span class="svc-num">PROJECT ' + p.number + "</span><h1>" + esc(p.title) + "</h1><p>" + esc(p.full) + '</p><div class="pj-actions">' + gh(p) +
      (p.liveUrl ? '<a class="btn b2" href="' + esc(p.liveUrl) + '" target="_blank" rel="noopener noreferrer">Visit website ↗</a>' : "") + '</div></div><div class="pj-cover big">' + cover(p) + "</div></header>";
    h += sec("overview", "Project overview", "<p>" + esc(p.full) + "</p>");
    h += sec("objective", "Objective", p.objective ? "<p>" + esc(p.objective) + "</p>" : todo("Objective to be added."));
    if (p.topics) h += sec("topics", "Areas covered", list(p.topics));
    if (p.divisions) h += sec("divisions", "Divisions", '<div class="div-grid">' + p.divisions.map(function (d) { return '<div class="div-card"><h3>' + esc(d) + "</h3><p class=\"muted\">Description to be added from verified company information.</p></div>"; }).join("") + "</div>");
    h += sec("solution", "Solution and implementation", p.solution.length ? list(p.solution) : todo("Solution details to be added."));
    if (p.stages) h += sec("stages", "Pipeline stages", '<ol class="stages">' + p.stages.map(function (s) { return "<li><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>"; }).join("") + "</ol>");
    h += sec("arch", "Architecture", diagram(p));
    h += sec("tech", "Technologies used", tags(p));
    h += sec("details", "Implementation details", p.details.length ? '<dl class="proc-meta">' + p.details.map(function (d) { return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>"; }).join("") + "</dl>" : "");
    h += sec("shots", "Screenshots and visual evidence", p.screenshots.length ? '<div class="shots">' + p.screenshots.map(function (s) { return '<figure><img src="' + ROOT + esc(s.src) + '" alt="' + esc(s.alt || "") + '" loading="lazy"><figcaption>' + esc(s.alt || "") + "</figcaption></figure>"; }).join("") + "</div>" : todo("Screenshots to be added. None are shown until genuine project evidence is supplied."));
    h += sec("challenges", "Challenges and technical considerations", list(p.challenges));
    h += sec("results", "Results", list(p.results));
    var rel = p.related.map(bySlug).filter(Boolean);
    h += sec("related", "Related projects", rel.length ? '<ul class="cs-list rel">' + rel.map(function (x) { return '<li><a href="' + url(x.slug) + '">' + esc(x.title) + "</a></li>"; }).join("") + "</ul>" : "");
    h += '<section class="cta-band"><h2>Interested in similar work?</h2><p>Tell me about your project.</p><a class="btn" href="' + ROOT + "contact/">Contact me</a></section>';
    r.innerHTML = h;
  }

  function boot() {
    try {
      var g = $("#projects-grid"); if (g) overview(g);
      var s = document.body.getAttribute("data-project"); if (s) detail(s);
    } catch {
      var r = $("#project-root") || $("#projects-grid");
      if (r) r.innerHTML = '<p class="error" role="alert">Sorry, this content could not be loaded. Please refresh the page.</p>';
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
