/* Blog overview: featured article, filters, search and grid. Data comes from blog-data.js. */
(function () {
  var B = window.BLOG, ROOT = document.documentElement.getAttribute("data-root") || "";
  var root = document.getElementById("blog-root");
  if (!root || !B) return;
  var list = B.articles.filter(function (a) { return a.published; });
  var state = { q: "", cat: "All Articles" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function filterOf(a) { var c = B.categories.filter(function (x) { return x.name === a.category; })[0]; return c && c.filter ? c.filter : a.category; }
  function href(a) { return a.platform === "medium" ? a.url : ROOT + "blog/" + a.slug + "/"; }
  function ext(a) { return a.platform === "medium" ? ' target="_blank" rel="noopener noreferrer"' : ""; }
  function fmt(d) { var t = new Date(d + "T00:00:00"); return isNaN(t) ? esc(d) : t.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" }); }
  function cover(a, cls) {
    var inner = a.cover ? '<img src="' + ROOT + esc(a.cover) + '" alt="' + esc(a.coverAlt || "") + '" loading="lazy">' : '<div class="ph" aria-hidden="true"><b>' + esc((a.category || "").charAt(0)) + "</b></div>";
    return '<a class="pj-cover' + (cls || "") + '" href="' + esc(href(a)) + '"' + ext(a) + ' tabindex="-1" aria-hidden="true">' + inner + "</a>";
  }
  function meta(a) { return '<div class="bl-meta"><span class="bl-cat">' + esc(a.category) + "</span><span>" + fmt(a.date) + "</span><span>" + esc(a.readingTime) + "</span><span>" + esc(a.author) + "</span></div>"; }
  function link(a, label) { return '<a class="svc-link" href="' + esc(href(a)) + '"' + ext(a) + ">" + label + (a.platform === "medium" ? " on Medium" : "") + ' <span class="sr" style="position:absolute;left:-999px">: ' + esc(a.title) + "</span> →</a>"; }
  function card(a) { return '<article class="bl-card">' + cover(a) + '<div class="bl-body">' + meta(a) + '<h3><a href="' + esc(href(a)) + '"' + ext(a) + ">" + esc(a.title) + "</a></h3><p>" + esc(a.description) + "</p>" + link(a, "Read more") + "</div></article>"; }
  function matches(a) {
    if (state.cat !== "All Articles" && filterOf(a) !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    return [a.title, a.description, a.category].concat(a.keywords || []).join(" ").toLowerCase().indexOf(q) !== -1;
  }
  function empty(title, text) { return '<div class="bl-empty" role="status"><h3>' + title + "</h3><p>" + text + "</p></div>"; }

  function featured() {
    var f = list.filter(function (a) { return a.featured; })[0];
    if (!f) return "";
    return '<article class="bl-feature" aria-labelledby="bl-feat-h">' + cover(f) + '<div class="bl-body"><p class="kicker">Featured article</p>' + meta(f) + '<h2 id="bl-feat-h"><a href="' + esc(href(f)) + '"' + ext(f) + ">" + esc(f.title) + "</a></h2><p>" + esc(f.description) + '</p><a class="btn b1" href="' + esc(href(f)) + '"' + ext(f) + ">Read Article →</a></div></article>";
  }
  function filters() {
    var names = [];
    list.forEach(function (a) { var f = filterOf(a); if (names.indexOf(f) === -1) names.push(f); });
    return ["All Articles"].concat(names).map(function (n) { return '<button type="button" data-cat="' + esc(n) + '" aria-pressed="' + (state.cat === n) + '">' + esc(n) + "</button>"; }).join("");
  }
  function categories() {
    var present = B.categories.filter(function (c) { return list.some(function (a) { return a.category === c.name; }); });
    if (!present.length) return "";
    return '<section class="bl-cats" aria-labelledby="bl-cats-h"><h2 id="bl-cats-h">Article categories</h2><ul class="tags">' + present.map(function (c) { return "<li>" + esc(c.name) + "</li>"; }).join("") + "</ul></section>";
  }
  function medium() {
    var btn = B.MEDIUM_URL ? '<a class="btn" href="' + esc(B.MEDIUM_URL) + '" target="_blank" rel="noopener noreferrer">Follow on Medium</a>' : '<p class="todo" style="color:#dbe7fb">Medium profile link to be added: set MEDIUM_URL in assets/js/blog-data.js.</p>';
    return '<section class="cta-band bl-medium" aria-labelledby="bl-med-h"><h2 id="bl-med-h">Follow My Engineering Journey</h2><p>I share practical cloud engineering tutorials, DevOps implementations, infrastructure automation techniques and lessons learned from real-world projects.</p>' + btn + "</section>";
  }
  function renderGrid() {
    var out = document.getElementById("bl-grid"), items = list.filter(matches);
    out.innerHTML = items.length ? items.map(card).join("") : empty("No articles match your search", "Try a different keyword or choose another category.");
    document.getElementById("bl-count").textContent = items.length + (items.length === 1 ? " article found" : " articles found");
  }
  function render() {
    var h = "";
    if (!list.length) {
      h += empty("Articles are coming soon", "No articles have been published yet. Check back soon, or follow my engineering journey on Medium below.");
    } else {
      h += featured();
      h += '<section id="articles" aria-labelledby="bl-latest-h"><h2 id="bl-latest-h" style="margin-bottom:16px">Latest articles</h2><div class="bl-tools"><label class="bl-search">Search articles<input type="search" id="bl-q" placeholder="Search by title, topic or keyword" autocomplete="off"></label><div class="bl-filters" role="group" aria-label="Filter by category">' + filters() + '</div></div><p id="bl-count" class="muted" aria-live="polite"></p><div class="bl-grid" id="bl-grid"></div></section>' + categories();
    }
    h += medium();
    h += '<section class="cta-band bl-svc" aria-labelledby="bl-svc-h"><h2 id="bl-svc-h">Need help with your cloud or DevOps project?</h2><p>Explore the professional services I offer.</p><a class="btn" href="' + ROOT + 'services/">Explore my services</a></section>';
    root.innerHTML = h;
    if (list.length) {
      renderGrid();
      document.getElementById("bl-q").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });
      root.querySelector(".bl-filters").addEventListener("click", function (e) {
        var b = e.target.closest("button[data-cat]"); if (!b) return;
        state.cat = b.getAttribute("data-cat");
        Array.prototype.forEach.call(root.querySelectorAll(".bl-filters button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        renderGrid();
      });
    }
  }
  render();
})();
