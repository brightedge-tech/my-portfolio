/* Central skills data. Edit here; Skills and CV pages render from this file.
   category: id from SKILL_CATEGORIES. status: "shown" | "hidden" (hidden skills are not rendered).
   evidence: "project" = demonstrated in a portfolio project; "personal" = personally used (confirm, then set);
             "nsomex" = part of the wider NSOMEX service ecosystem. No proficiency levels are claimed.
   project: slug from projects-data.js (links to the case study), or null.
   logo: optional path under assets/img/logos/ (genuine asset); null shows a text monogram. */
(function (g) {
  g.SKILL_CATEGORIES = [
    { id: "cloud", name: "Cloud platforms", filter: "cloud" },
    { id: "devops", name: "DevOps & CI/CD", filter: "devops" },
    { id: "containers", name: "Containers & orchestration", filter: "containers" },
    { id: "iac", name: "Infrastructure as code", filter: "infrastructure" },
    { id: "monitoring", name: "Monitoring & observability", filter: "monitoring" },
    { id: "security", name: "Security", filter: "security" },
    { id: "dev", name: "Programming & application development", filter: "development" },
    { id: "db", name: "Databases", filter: "development" }
  ];
  g.SKILL_FILTERS = [
    { id: "all", name: "All skills" }, { id: "cloud", name: "Cloud" }, { id: "devops", name: "DevOps" },
    { id: "infrastructure", name: "Infrastructure" }, { id: "containers", name: "Containers" },
    { id: "monitoring", name: "Monitoring" }, { id: "security", name: "Security" }, { id: "development", name: "Development" }
  ];
  var T = "three-tier-aws-terraform", N = "netflix-devsecops-eks", C = "nsomex-connect";
  function s(name, category, description, project, evidence) { return { name: name, category: category, description: description, project: project, evidence: evidence || "project", logo: null, status: "shown" }; }
  g.SKILLS = [
    s("Amazon Web Services (AWS)", "cloud", "Cloud platform used for the Terraform-provisioned environment and the EKS deployment.", T),
    s("Amazon EC2", "cloud", "Virtual servers used for the web and application tiers.", T),
    s("Auto Scaling Groups", "cloud", "Web and application tiers each run in an Auto Scaling Group.", T),
    s("Jenkins", "devops", "CI/CD server driving the DevSecOps pipeline.", N),
    s("Argo CD", "devops", "Continuous delivery to the Kubernetes cluster.", N),
    s("Docker", "containers", "Container image creation for the pipeline.", N),
    s("Kubernetes", "containers", "Orchestration platform for the deployed application.", N),
    s("Amazon EKS", "containers", "Managed Kubernetes on AWS.", N),
    s("Helm", "containers", "Chart-based deployment through Argo CD.", N),
    s("Terraform", "iac", "Infrastructure provisioning in both AWS projects.", T),
    s("Prometheus", "monitoring", "Metrics collection for the pipeline project.", N),
    s("Grafana", "monitoring", "Dashboards and visualisation of metrics.", N),
    s("SonarQube", "security", "Code quality analysis.", N),
    s("Trivy", "security", "Container image vulnerability scanning.", N),
    s("OWASP Dependency Check", "security", "Dependency vulnerability analysis.", N),
    s("React Native", "dev", "Mobile application framework.", C),
    s("Expo", "dev", "React Native tooling and Android builds.", C),
    s("Apache HTTP Server", "dev", "Web server configured through EC2 user-data.", T),
    s("Supabase", "db", "Backend with authentication and database security policies.", C),
    s("PostgreSQL", "db", "Database behind Supabase, with migrations.", C)
  ];
})(typeof window !== "undefined" ? window : global.window);
