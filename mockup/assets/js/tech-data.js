/* Technology ecosystem data. Add, edit or remove entries freely; no rebuild needed.
   Listing describes service scope only, not certification or partnership. */
window.TECH_CATEGORIES = [
  { id: "cloud", name: "Cloud Platforms", items: [
    { name: "AWS", note: "Primary cloud platform" }, { name: "Microsoft Azure", note: "Cloud platform" }, { name: "Google Cloud", note: "Cloud platform" }] },
  { id: "devops", name: "DevOps & CI/CD", items: [
    { name: "GitHub Actions", note: "CI/CD workflows" }, { name: "Jenkins", note: "Build automation" }, { name: "GitLab CI", note: "CI/CD pipelines" }, { name: "Git", note: "Version control" }] },
  { id: "containers", name: "Containers & Orchestration", items: [
    { name: "Docker", note: "Containerization" }, { name: "Kubernetes", note: "Orchestration" }, { name: "Helm", note: "Kubernetes packaging" }] },
  { id: "iac", name: "Infrastructure as Code", items: [
    { name: "Terraform", note: "Provisioning" }, { name: "Ansible", note: "Configuration management" }, { name: "CloudFormation", note: "AWS provisioning" }] },
  { id: "observability", name: "Monitoring & Observability", items: [
    { name: "Prometheus", note: "Metrics" }, { name: "Grafana", note: "Dashboards" }, { name: "CloudWatch", note: "AWS monitoring" }] },
  { id: "programming", name: "Programming & Scripting", items: [
    { name: "Python", note: "Automation and tooling" }, { name: "Bash", note: "Shell scripting" }, { name: "JavaScript", note: "Application development" }] },
  { id: "databases", name: "Databases", items: [
    { name: "PostgreSQL", note: "Relational database" }, { name: "MySQL", note: "Relational database" }, { name: "MongoDB", note: "Document database" }] },
  { id: "os", name: "Operating Systems", items: [
    { name: "Linux", note: "Server operating system" }, { name: "Ubuntu", note: "Linux distribution" }, { name: "Windows Server", note: "Server operating system" }] },
  { id: "security", name: "Security & Networking", items: [
    { name: "IAM", note: "Access management" }, { name: "VPC networking", note: "Network design" }, { name: "TLS / certificates", note: "Transport security" }] },
  { id: "apps", name: "Application Development", items: [
    { name: "Node.js", note: "Backend runtime" }, { name: "REST APIs", note: "Service interfaces" }, { name: "Microservices", note: "Architecture style" }] }
];
