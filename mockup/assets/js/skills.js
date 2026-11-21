/* Renders the Skills page (filters + expandable categories) from skills-data.js and projects-data.js */
(function () {
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var LABEL = { project: "Demonstrated in a project", personal: "Personally used", nsomex: "NSOMEX ecosystem" };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function mono(n) { return n.replace(/[^A-Za-z]/g, "").slice(0, 2); }
  function boot() {
    var r = document.getElementById("skills-root"); if (!r) return;
    try {
      var cats = window.SKILL_CATEGORIES, skills = window.SKILLS.filter(function (x) { return x.status !== "hidden"; }), filters = window.SKILL_FILTERS;
      var proj = {}; window.PROJECTS.forEach(function (p) { if (p.published) proj[p.slug] = p; });
      var active = "all", open = {}; cats.forEach(function (c) { open[c.id] = true; });
      r.innerHTML = '<div class="tech-filters" role="group" aria-label="Filter skills by category" id="sk-bar"></div><div class="tech-tools"><button type="button" class="chip-btn" data-act="expand">Expand all</button><button type="button" class="chip-btn" data-act="collapse">Collapse all</button></div><p class="muted" id="sk-count" role="status"></p><div id="sk-list"></div>';
      var bar = r.querySelector("#sk-bar"), list = r.querySelector("#sk-list"), count = r.querySelector("#sk-count");
      function card(s) {
        var p = s.project && proj[s.project];
        return '<li class="sk-card"><div class="sk-top">' + (s.logo ? '<img class="sk-logo" src="' + ROOT + esc(s.logo) + '" alt="">' : '<span class="sk-mono" aria-hidden="true">' + esc(mono(s.name)) + "</span>") + "<h4>" + esc(s.name) + "</h4></div>" +
          (s.description ? "<p>" + esc(s.description) + "</p>" : "") + '<p class="sk-ev">' + esc(LABEL[s.evidence] || "") + "</p>" +
          (p ? '<a class="svc-link" href="' + ROOT + "projects/" + p.slug + '/">Project ' + p.number + ': ' + esc(p.title) + "</a>" : "") + "</li>";
      }
      function draw() {
        bar.innerHTML = filters.map(function (f) { return '<button type="button" class="chip-btn" data-f="' + f.id + '" aria-pressed="' + (f.id === active) + '">' + esc(f.name) + "</button>"; }).join("");
        var n = 0, html = "";
        cats.forEach(function (c) {
          if (active !== "all" && c.filter !== active) return;
          var items = skills.filter(function (s) { return s.category === c.id; }); if (!items.length) return;
          n += items.length;
          html += '<section class="tech-cat"><h3><button type="button" class="tech-head" aria-expanded="' + open[c.id] + '" aria-controls="sk-' + c.id + '" data-id="' + c.id + '"><span>' + esc(c.name) + '</span><span class="count">' + items.length + ' <i aria-hidden="true">' + (open[c.id] ? "\u2212" : "+") + '</i></span></button></h3><ul class="sk-grid" id="sk-' + c.id + '"' + (open[c.id] ? "" : " hidden") + ">" + items.map(card).join("") + "</ul></section>";
        });
        list.innerHTML = html || '<p class="empty">No skills in this category yet.</p>';
        count.textContent = n + " skill" + (n === 1 ? "" : "s") + " shown";
      }
      r.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        var f = b.getAttribute("data-f"), id = b.getAttribute("data-id"), act = b.getAttribute("data-act"), keep = b.getAttribute("data-f") || id;
        if (f) active = f; else if (id) open[id] = !open[id]; else if (act) cats.forEach(function (c) { open[c.id] = act === "expand"; }); else return;
        draw();
        var again = r.querySelector('[data-f="' + keep + '"],[data-id="' + keep + '"]'); if (again) again.focus();
      });
      draw();
    } catch { r.innerHTML = '<p class="error" role="alert">Sorry, this content could not be loaded. Please refresh the page.</p>'; }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
