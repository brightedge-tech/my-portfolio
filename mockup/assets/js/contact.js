/* Contact page: contact details, services-linked form, validation and submission. Data: contact-data.js, profile-data.js, services-data.js */
(function () {
  var C = window.CONTACT, P = window.PROFILE, S = window.SERVICES || [];
  var root = document.getElementById("contact-root");
  if (!root || !C || !P) return;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function opts(a, ph) { return (ph ? '<option value="">' + ph + "</option>" : "") + a.map(function (x) { return '<option value="' + esc(x) + '">' + esc(x) + "</option>"; }).join(""); }
  var primary = C.emails[0] && C.emails[0].address;

  function info() {
    var li = [];
    C.emails.forEach(function (e) { li.push('<li><small>' + esc(e.label) + '</small><a href="mailto:' + esc(e.address) + '">' + esc(e.address) + "</a></li>"); });
    if (P.phone) li.push('<li><small>Phone</small><a href="tel:' + esc(P.phone.replace(/[^+\d]/g, "")) + '">' + esc(P.phone) + "</a></li>");
    P.social.forEach(function (s) { if (s.url) li.push('<li><small>' + esc(s.label) + '</small><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url.replace(/^https?:\/\/(www\.)?/, "")) + " \u2197</a></li>"); });
    li.push('<li><small>Location</small>' + (P.location ? esc(P.location) : '<span class="todo">Location to be added in profile-data.js</span>') + "</li>");
    if (!P.social.some(function (s) { return s.id === "medium" && s.url; })) li.push('<li><small>Medium</small><span class="todo">Medium profile to be added in profile-data.js</span></li>');
    return '<aside class="ct-card" aria-labelledby="ct-info-h"><h2 id="ct-info-h">Contact information</h2><ul class="ct-list">' + li.join("") + '</ul><p class="ct-note" style="margin-top:18px">Looking for something specific? <a href="../services/" style="color:var(--blue);font-weight:700">Explore my services</a> first.</p></aside>';
  }
  function field(id, label, control, optional) {
    return '<div><label for="' + id + '">' + label + (optional ? ' <span class="opt">(optional)</span>' : "") + "</label>" + control + '<p class="ct-err" id="' + id + '-err" aria-live="polite"></p></div>';
  }
  function form() {
    var svc = '<option value="">No specific service</option>' + S.map(function (s) { return '<option value="' + esc(s.slug) + '">' + esc(s.title) + "</option>"; }).join("");
    return '<section class="ct-card" id="contact-form-section" aria-labelledby="ct-form-h"><h2 id="ct-form-h">Send a message</h2>' +
      '<form class="ct-form" id="contact-form" novalidate>' +
      '<div class="row">' + field("f-name", "Full name", '<input id="f-name" name="name" autocomplete="name" required aria-required="true">') + field("f-email", "Email address", '<input id="f-email" name="email" type="email" autocomplete="email" required aria-required="true">') + "</div>" +
      '<div class="row">' + field("f-company", "Company", '<input id="f-company" name="company" autocomplete="organization">', true) + field("f-type", "Inquiry type", '<select id="f-type" name="inquiryType" required aria-required="true">' + opts(C.inquiryTypes, "Select an inquiry type") + "</select>") + "</div>" +
      '<div class="row">' + field("f-service", "Service interested in", '<select id="f-service" name="service">' + svc + "</select>", true) + field("f-budget", "Project budget", '<select id="f-budget" name="budget">' + opts(C.budgets, "Prefer not to say") + "</select>", true) + "</div>" +
      field("f-message", "Message", '<textarea id="f-message" name="message" rows="6" required aria-required="true" aria-describedby="f-topics"></textarea>') +
      '<p class="ct-note" id="f-topics">Describe your project and goals. Topics I can discuss include: ' + C.topics.map(esc).join(", ") + ".</p>" +
      '<div class="ct-hp" aria-hidden="true"><label>Leave empty<input name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<div id="ct-status" role="status" aria-live="polite"></div>' +
      '<button class="btn b1" type="submit" id="ct-submit">' + (C.FORM_ENDPOINT ? "Send message" : "Compose email") + "</button>" +
      (C.FORM_ENDPOINT ? "" : '<p class="ct-note">No form service is connected yet, so this opens a pre-filled email in your email app. Your message is only sent when you press Send there.</p>') +
      "</form></section>";
  }
  root.innerHTML = '<div class="ct-layout">' + info() + form() + "</div>";

  var f = document.getElementById("contact-form"), btn = document.getElementById("ct-submit"), box = document.getElementById("ct-status"), busy = false;
  var q = new URLSearchParams(location.search).get("service");
  if (q && S.some(function (s) { return s.slug === q; })) document.getElementById("f-service").value = q;
  function status(kind, msg) { box.innerHTML = '<div class="ct-status ' + kind + '">' + esc(msg) + "</div>"; }
  function setErr(id, msg) { var i = document.getElementById(id), e = document.getElementById(id + "-err"); e.textContent = msg || ""; if (msg) { i.setAttribute("aria-invalid", "true"); i.setAttribute("aria-describedby", id + "-err"); } else { i.removeAttribute("aria-invalid"); } return !msg; }
  function validate() {
    var v = function (id) { return f.elements[id].value.trim(); }, bad = [];
    var checks = [["f-name", "name", "Please enter your full name."], ["f-type", "inquiryType", "Please choose an inquiry type."], ["f-message", "message", "Please write a message."]];
    checks.forEach(function (c) { if (!setErr(c[0], v(c[1]) ? "" : c[2])) bad.push(c[0]); });
    var em = v("email");
    if (!setErr("f-email", !em ? "Please enter your email address." : (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em) ? "" : "Please enter a valid email address, for example name@example.com."))) bad.push("f-email");
    if (bad.length) { document.getElementById(bad[0]).focus(); status("bad", "Please fix the highlighted fields and try again."); }
    return !bad.length;
  }
  function data() {
    var d = {}; Array.prototype.forEach.call(f.elements, function (e) { if (e.name) d[e.name] = e.value.trim(); });
    var s = S.filter(function (x) { return x.slug === d.service; })[0]; d.serviceTitle = s ? s.title : "";
    return d;
  }
  function done() { busy = false; btn.disabled = false; btn.removeAttribute("aria-disabled"); }
  f.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (busy) return;
    box.innerHTML = "";
    if (!validate()) return;
    var d = data();
    if (d.website) { return; }
    busy = true; btn.disabled = true; btn.setAttribute("aria-disabled", "true");
    if (!C.FORM_ENDPOINT) {
      var body = "Name: " + d.name + "\nEmail: " + d.email + "\nCompany: " + (d.company || "-") + "\nInquiry type: " + d.inquiryType + "\nService: " + (d.serviceTitle || "-") + "\nBudget: " + (d.budget || "-") + "\n\n" + d.message;
      status("info", "Opening your email app with the message pre-filled. It has not been sent yet: press Send in your email app. If nothing opens, email " + primary + " directly.");
      location.href = "mailto:" + primary + "?subject=" + encodeURIComponent(d.inquiryType + " - " + d.name) + "&body=" + encodeURIComponent(body.slice(0, 1500));
      setTimeout(done, 1500);
      return;
    }
    btn.textContent = "Sending\u2026"; status("info", "Sending your message\u2026");
    fetch(C.FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
      .then(function (r) { if (!r.ok) throw new Error("status " + r.status); f.reset(); status("ok", "Thank you, your message was sent. I will reply to " + d.email + "."); btn.textContent = "Send message"; done(); })
      .catch(function () { status("bad", "Sorry, your message could not be sent. Please try again, or email " + primary + " directly."); btn.textContent = "Send message"; done(); });
  });
  f.addEventListener("input", function (e) { if (e.target.id && e.target.getAttribute("aria-invalid")) setErr(e.target.id, ""); });
})();
