/* One-off generator for static page shells. Run: node gen.js */
const fs = require("fs"), path = require("path");
global.window = {}; require("./assets/js/services-data.js"); require("./assets/js/projects-data.js");
const P = window.PROJECTS;
const S = window.SERVICES;

function nav(root, active) {
  const a = (href, label, key) => `<li><a ${active === key ? 'class="active" aria-current="page" ' : ""}href="${href}">${label}</a></li>`;
  return `<nav aria-label="Primary">
  <a class="logo" href="${root}index.html" style="text-decoration:none;color:inherit">Ayeah<span>.</span>dev<i></i></a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">Menu</button>
  <ul id="nav-menu">
    ${a(root + "index.html", "Welcome", "welcome")}
    ${a("#", "CV", "cv")}
    ${a(root + "projects/", "Projects", "projects")}
    ${a(root + "services/", "Services", "services")}
    ${a("#", "Blog", "blog")}
    ${a("#", "Experience", "exp")}
    ${a("#", "Skills", "skills")}
    <li><a class="cta" href="${root}contact.html">Contact</a></li>
  </ul>
</nav>`;
}
function page({ root, title, desc, active, bodyAttr = "", main, projects = false }) {
  return `<!DOCTYPE html>
<html lang="en" data-root="${root}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="stylesheet" href="${root}styles.css">
<link rel="stylesheet" href="${root}assets/css/services.css">
<link rel="stylesheet" href="${root}assets/css/projects.css">
</head>
<body ${bodyAttr}>
<a class="skip" href="#main">Skip to content</a>
<div class="glow g1"></div><div class="glow g2"></div>
${nav(root, active)}
<main id="main">
${main}
</main>
<footer>© Ayeah Derrick Nsom-M · Cloud &amp; DevOps Engineer</footer>
<script src="${root}assets/js/services-data.js"></script>
<script src="${root}assets/js/tech-data.js"></script>
<script src="${root}assets/js/app.js"></script>${projects ? `
<script src="${root}assets/js/projects-data.js"></script>
<script src="${root}assets/js/projects.js"></script>` : ""}
</body>
</html>
`;
}
const w = (f, c) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, c); };

w("services/index.html", page({
  root: "../", active: "services",
  title: "Services | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Cloud migration, DevOps and automation, FinOps, cloud architecture, application modernization, enterprise technology support and end-to-end delivery.",
  main: `<div class="page-hero"><p class="kicker">Services</p><h1>Cloud &amp; DevOps services, built end to end.</h1><p>Seven ways I can help you plan, build and run reliable cloud infrastructure and delivery pipelines.</p></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to view the services.</p></noscript><div class="svc-grid" id="services-grid" aria-live="polite"></div></div>`
}));

S.forEach(s => w(`services/${s.slug}/index.html`, page({
  root: "../../", active: "services", bodyAttr: `data-service="${s.slug}"`,
  title: `${s.title} | Services | Ayeah Derrick Nsom-M`,
  desc: s.short,
  main: `<div id="service-root"><noscript><p class="error">Please enable JavaScript to view this service.</p></noscript></div>`
})));

w("projects/index.html", page({
  root: "../", active: "projects", projects: true,
  title: "Projects | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Case studies: AWS Terraform architecture, a DevSecOps pipeline on EKS, cloud optimization, NSOMEX Connect and NSOMEX Group.",
  main: `<div class="page-hero"><p class="kicker">Projects</p><h1>Engineering and technology case studies.</h1><p>Five featured projects across cloud infrastructure, DevSecOps, optimization and digital products.</p></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to view the projects.</p></noscript><div class="pj-grid" id="projects-grid" aria-live="polite"></div></div>`
}));
P.forEach(p => w(`projects/${p.slug}/index.html`, page({
  root: "../../", active: "projects", projects: true, bodyAttr: `data-project="${p.slug}"`,
  title: `${p.title} | Projects | Ayeah Derrick Nsom-M`,
  desc: p.short,
  main: `<div class="container" id="project-root"><noscript><p class="error">Please enable JavaScript to view this project.</p></noscript></div>`
})));

w("contact.html", page({
  root: "", active: "contact",
  title: "Contact | Ayeah Derrick Nsom-M",
  desc: "Get in touch with Ayeah Derrick Nsom-M about cloud and DevOps services.",
  main: `<div class="page-hero"><p class="kicker">Contact</p><h1>Let's discuss your project.</h1><p>Choose the service you are interested in and tell me a little about it.</p></div>
<div class="container"><form class="form" id="contact-form" action="mailto:" method="post" enctype="text/plain">
<label>Name<input name="name" required autocomplete="name"></label>
<label>Email<input name="email" type="email" required autocomplete="email"></label>
<label>Service<select name="service" id="contact-service"><option value="">General enquiry</option></select></label>
<label>Message<textarea name="message" rows="5" required></textarea></label>
<button class="btn b1" type="submit" disabled aria-disabled="true">Sending not yet connected</button>
<p class="muted">This form is a placeholder: a delivery endpoint (email service or API) still needs to be connected.</p>
</form></div>`
}));
console.log("generated");
