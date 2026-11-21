/* Renders the Experience timeline from profile-data.js */
(function () {
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ul(a, cls) { return a && a.length ? '<ul class="' + (cls || "cs-list") + '">' + a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""; }
  function block(t, a) { return a && a.length ? "<h4>" + t + "</h4>" + ul(a) : ""; }
  function boot() {
    var r = document.getElementById("experience-root"); if (!r) return;
    try {
      var E = window.PROFILE && window.PROFILE.experience;
      if (!E) throw new Error("data");
      if (!E.length) { r.innerHTML = '<p class="todo" role="status">Professional experience has not been added yet. Add entries to assets/js/profile-data.js.</p>'; return; }
      r.innerHTML = '<ol class="timeline">' + E.map(function (e) {
        var dates = [e.start, e.end].filter(Boolean).join(" \u2013 ");
        var meta = [e.organization, e.type, e.location].filter(Boolean).map(esc).join(" \u00b7 ");
        return '<li class="tl-item"><article class="cs-sec"><p class="svc-num">' + esc(dates) + "</p><h3>" + esc(e.title) + '</h3><p class="muted">' + meta + "</p>" +
          (e.description ? "<p>" + esc(e.description) + "</p>" : "") + block("Responsibilities", e.responsibilities) + block("Technical contributions", e.contributions) +
          (e.technologies && e.technologies.length ? "<h4>Technologies</h4>" + ul(e.technologies, "tags") : "") + block("Achievements", e.achievements) + "</article></li>";
      }).join("") + "</ol>";
    } catch { r.innerHTML = '<p class="error" role="alert">Sorry, this content could not be loaded. Please refresh the page.</p>'; }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
