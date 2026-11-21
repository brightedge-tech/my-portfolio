/* One-off generator for static page shells. Run: node gen.js */
const fs = require("fs"), path = require("path");
global.window = {}; require("./assets/js/services-data.js"); require("./assets/js/projects-data.js"); require("./assets/js/profile-data.js"); require("./assets/js/skills-data.js"); require("./assets/js/blog-data.js"); require("./assets/js/contact-data.js");
const P = window.PROJECTS;
const S = window.SERVICES;

function nav(root, active) {
  const a = (href, label, key) => `<li><a ${active === key ? 'class="active" aria-current="page" ' : ""}href="${href}">${label}</a></li>`;
  return `<nav aria-label="Primary">
  <a class="logo" href="${root}index.html" style="text-decoration:none;color:inherit">Ayeah<span>.</span>dev<i></i></a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">Menu</button>
  <ul id="nav-menu">
    ${a(root + "index.html", "Welcome", "welcome")}
    ${a(root + "about/", "About", "about")}
    ${a(root + "cv/", "CV", "cv")}
    ${a(root + "projects/", "Projects", "projects")}
    ${a(root + "services/", "Services", "services")}
    ${a(root + "blog/", "Blog", "blog")}
    ${a(root + "experience/", "Experience", "exp")}
    ${a(root + "skills/", "Skills", "skills")}
    <li><a class="cta" href="${root}contact/">Contact</a></li>
  </ul>
</nav>`;
}
function page({ root, title, desc, active, head = "", bodyAttr = "", main, projects = false, profile = false, scripts = [] }) {
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
<link rel="stylesheet" href="${root}assets/css/profile.css">
<link rel="stylesheet" href="${root}assets/css/skills.css">
<link rel="stylesheet" href="${root}assets/css/blog.css">
<link rel="stylesheet" href="${root}assets/css/contact.css">
${head}
</head>
<body ${bodyAttr}>
<a class="skip" href="#main">Skip to content</a>
<div class="glow g1"></div><div class="glow g2"></div>
${nav(root, active)}
<main id="main">
${main}
</main>
<footer>© Ayeah Derrick Nsom-M · Cloud &amp; DevOps Engineer · <a href="${root}blog/">Blog</a></footer>
<script src="${root}assets/js/services-data.js"></script>
<script src="${root}assets/js/tech-data.js"></script>
<script src="${root}assets/js/app.js"></script>${projects ? `
<script src="${root}assets/js/projects-data.js"></script>
<script src="${root}assets/js/projects.js"></script>` : ""}${scripts.map(s => `
<script src="${root}assets/js/${s}.js"></script>`).join("")}${profile ? `
<script src="${root}assets/js/projects-data.js"></script>
<script src="${root}assets/js/profile-data.js"></script>
<script src="${root}assets/js/profile.js"></script>` : ""}
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

w("about/index.html", page({
  root: "../", active: "about", profile: true, bodyAttr: 'data-page="about"',
  title: "About | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "About Ayeah Derrick Nsom-M, Cloud & DevOps Engineer: cloud engineering, infrastructure automation and delivery.",
  main: `<div class="container" id="profile-root"><noscript><p class="error">Please enable JavaScript to view this page.</p></noscript></div>`
}));
w("cv/index.html", page({
  root: "../", active: "cv", profile: true, bodyAttr: 'data-page="cv"',
  title: "CV | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Curriculum vitae of Ayeah Derrick Nsom-M, Cloud & DevOps Engineer.",
  main: `<div class="container" id="profile-root"><noscript><p class="error">Please enable JavaScript to view this page.</p></noscript></div>`
}));

w("experience/index.html", page({
  root: "../", active: "exp", scripts: ["profile-data", "experience"],
  title: "Experience | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Professional experience of Ayeah Derrick Nsom-M, Cloud & DevOps Engineer.",
  main: `<div class="page-hero"><p class="kicker">Experience</p><h1>Professional experience.</h1><p>Ayeah Derrick Nsom-M — Cloud &amp; DevOps Engineer.</p></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to view this page.</p></noscript><div id="experience-root"></div></div>`
}));
w("skills/index.html", page({
  root: "../", active: "skills", scripts: ["projects-data", "skills-data", "skills"],
  title: "Skills | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Technical skills across cloud, DevOps, containers, infrastructure as code, monitoring, security and development, linked to portfolio projects.",
  main: `<div class="page-hero"><p class="kicker">Skills</p><h1>Technical skills.</h1><p>Technologies demonstrated across my portfolio projects, each linked to the case study that shows it. No proficiency levels are claimed.</p></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to view the skills.</p></noscript><div id="skills-root"></div>
<section class="cta-band sk-cta"><h2>Put these capabilities to work</h2><p>See how they apply to practical client solutions.</p><a class="btn" href="../services/">Explore my services</a></section></div>`
}));

w("contact/index.html", page({
  root: "../", active: "contact", scripts: ["contact-data", "profile-data", "contact"],
  title: "Contact | Ayeah Derrick Nsom-M \u2013 Cloud & DevOps Engineer",
  desc: "Contact Ayeah Derrick Nsom-M about cloud engineering, DevOps, infrastructure automation and technology services.",
  head: `<meta property="og:type" content="website">\n<meta property="og:title" content="Contact | Ayeah Derrick Nsom-M">\n<meta property="og:description" content="Let's discuss cloud engineering, DevOps and technology projects.">`,
  main: `<div class="page-hero ct-hero"><div><p class="kicker">Contact</p><h1>Let's Build Something Great Together.</h1><p>Have a project, an opportunity or an idea you'd like to bring to life? Let's discuss how cloud engineering, DevOps and modern technology can help you achieve your goals.</p><a class="btn b1" href="#contact-form-section">Start a conversation</a></div><svg class="ct-art" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="12" y="26" width="96" height="68" rx="10"/><path d="M14 32l46 34 46-34"/></svg></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to use the contact form, or email me directly at ${window.CONTACT.emails[0].address}.</p></noscript><div id="contact-root"></div>
<section class="cta-band" style="margin-top:40px"><h2>Not sure what you need yet?</h2><a class="btn" href="../services/">Explore my services</a></section></div>`
}));
w("contact.html", `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Contact | Ayeah Derrick Nsom-M</title><meta http-equiv="refresh" content="0; url=contact/"><link rel="canonical" href="contact/"><script>location.replace("contact/" + location.search + location.hash)</script></head><body><p>Redirecting to <a href="contact/">the contact page</a>.</p></body></html>
`);

const B = window.BLOG, H = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const local = B.articles.filter((a) => a.published && a.platform === "local");
w("blog/index.html", page({
  root: "../", active: "blog", scripts: ["blog-data", "blog"],
  title: "Blog | Ayeah Derrick Nsom-M – Cloud & DevOps Engineer",
  desc: "Practical insights, tutorials and engineering experiences on cloud computing, AWS, DevOps, infrastructure automation, cybersecurity and modern application development.",
  head: `<meta property="og:type" content="website">\n<meta property="og:title" content="Blog | Ayeah Derrick Nsom-M">\n<meta property="og:description" content="Cloud, AWS, DevOps and infrastructure engineering insights.">`,
  main: `<div class="page-hero bl-hero"><div><p class="kicker">Blog</p><h1>Engineering Ideas. Building Solutions. Sharing Knowledge.</h1><p>Explore practical insights, tutorials and engineering experiences covering cloud computing, AWS, DevOps, infrastructure automation, cybersecurity and modern application development.</p><a class="btn b1" href="#articles">Explore articles</a></div><svg class="bl-art" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="14" y="20" width="92" height="80" rx="10"/><path d="M14 40h92M44 62l-12 10 12 10M76 62l12 10-12 10M66 58l-12 28"/><circle cx="26" cy="30" r="2"/><circle cx="36" cy="30" r="2"/></svg></div>
<div class="container"><noscript><p class="error">Please enable JavaScript to view the articles.</p></noscript><div id="blog-root"></div></div>`
}));
local.forEach((a) => {
  const proj = a.project && P.filter((p) => p.slug === a.project)[0];
  const rel = local.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  const blocks = (a.content || []).map((b) => b.type === "h2" || b.type === "h3" ? `<${b.type}>${H(b.text)}</${b.type}>` : b.type === "ul" ? `<ul>${b.items.map((i) => `<li>${H(i)}</li>`).join("")}</ul>` : b.type === "code" ? `<pre><code>${H(b.text)}</code></pre>` : b.type === "img" ? `<figure><img src="../../${H(b.src)}" alt="${H(b.alt)}" loading="lazy">${b.caption ? `<figcaption>${H(b.caption)}</figcaption>` : ""}</figure>` : `<p>${H(b.text)}</p>`).join("\n");
  const ld = { "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title, description: a.description, datePublished: a.date, author: { "@type": "Person", name: a.author } };
  w(`blog/${a.slug}/index.html`, page({
    root: "../../", active: "blog",
    title: `${a.title} | Blog | Ayeah Derrick Nsom-M`, desc: H(a.description),
    head: `<meta property="og:type" content="article">\n<meta property="og:title" content="${H(a.title)}">\n<meta property="og:description" content="${H(a.description)}">${a.cover ? `\n<meta property="og:image" content="../../${H(a.cover)}">` : ""}\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`,
    main: `<article class="container bl-post"><p><a class="svc-link" href="../">← Back to Blog</a></p><p class="bl-cat">${H(a.category)}</p><h1>${H(a.title)}</h1><p class="lead">${H(a.description)}</p><div class="bl-meta"><span>${H(a.author)}</span><span>${H(a.date)}</span><span>${H(a.readingTime)}</span></div>${a.cover ? `<div class="pj-cover"><img src="../../${H(a.cover)}" alt="${H(a.coverAlt)}"></div>` : ""}<div class="bl-prose">${blocks}</div><div class="bl-actions"><a class="btn b2" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(a.title)}" target="_blank" rel="noopener noreferrer">Share on X</a>${proj ? `<a class="btn b1" href="../../projects/${proj.slug}/">Related project: ${H(proj.title)}</a>` : ""}</div>${rel.length ? `<section class="bl-related"><h2>Related articles</h2><ul>${rel.map((r) => `<li><a href="../${r.slug}/">${H(r.title)}</a></li>`).join("")}</ul></section>` : ""}</article>`
  }));
});
console.log("generated");
