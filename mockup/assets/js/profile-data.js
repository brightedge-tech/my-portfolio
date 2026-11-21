/* Central profile data. Edit here; About and CV pages render from this file.
   - Social links: leave url null to hide the link (never use "#").
   - photo: path relative to site root (e.g. "assets/img/profile.jpg"); null shows a placeholder.
   - cvPdf: path to the real PDF (e.g. "assets/cv/ayeah-derrick-nsom-m-cv.pdf"); null hides the download button.
   - education / certifications: empty arrays show a "to be added" note. Experience and skills live in experience-data.js and skills-data.js.
     Entry shapes: experience {role, org, period, bullets[]}, education {qualification, institution, period},
     certifications {name, issuer, year}. */
(function (g) {
  g.PROFILE = {
    name: "Ayeah Derrick Nsom-M",
    title: "Cloud & DevOps Engineer",
    location: null,
    photo: null,
    photoAlt: "Portrait of Ayeah Derrick Nsom-M",
    cvPdf: null,
    intro: "I am a Cloud & DevOps Engineer focused on cloud engineering, infrastructure automation and reliable delivery workflows. My work covers cloud architecture, CI/CD and deployment pipelines, application infrastructure and modernization, and building technology solutions through to delivery.",
    bio: "I work across cloud infrastructure, DevOps practice and application delivery, with an interest in infrastructure as code, secure pipelines and observability. My portfolio projects include Terraform-provisioned AWS environments and a DevSecOps pipeline on AWS EKS.",
    summary: "Cloud & DevOps Engineer working across cloud architecture, infrastructure automation, CI/CD and deployment workflows, and application infrastructure modernization.",
    approach: [
      ["Building reliable infrastructure", "Define environments as code so they can be reviewed, repeated and recovered."],
      ["Automating repetitive processes", "Replace manual, error-prone steps with scripted and pipeline-driven ones."],
      ["Improving deployment workflows", "Make the path from commit to running service clear, consistent and observable."],
      ["Designing scalable cloud environments", "Choose architecture that can grow with the workload and be operated by the team."],
      ["Applying security-conscious practices", "Build checks such as code analysis and image scanning into delivery."],
      ["Solving practical problems", "Start from the business and technical problem, then pick the tools."]
    ],
    social: [
      { id: "linkedin", label: "LinkedIn", url: null },
      { id: "github", label: "GitHub", url: null },
      { id: "medium", label: "Medium", url: null },
      { id: "nsomex", label: "NSOMEX website", url: "https://www.nsomex.com" }
    ],
    education: [],
    certifications: []
  };
})(typeof window !== "undefined" ? window : global.window);
