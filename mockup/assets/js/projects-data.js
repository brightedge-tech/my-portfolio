/* Central data source for the Projects section.
   HOW TO EDIT
   - Publish / unpublish: set status to "published" or "draft".
   - Cover image: set cover to a path like "assets/img/projects/xyz.jpg" (null shows a neutral placeholder).
   - Screenshots: add { src, alt, caption } objects. Only real project evidence.
   - Repository: set github to the real URL. Empty string hides the GitHub button everywhere.
   - Results / challenges: leave empty until backed by evidence; a "to be added" note is shown while
     PROJECTS_CONFIG.showPlaceholders is true. Set it to false to hide empty sections instead.
   - Diagram: "tiers" (infrastructure) or "flow" (pipeline stages), rendered from the data below. */
window.PROJECTS_CONFIG = { showPlaceholders: true };

window.PROJECTS = [
  {
    id: "p01", number: "01", slug: "three-tier-aws-terraform", status: "published", featured: true,
    title: "Three-Tier AWS Application Architecture Using Terraform",
    short: "AWS infrastructure provisioned with Terraform: web and application tiers in Auto Scaling Groups across public and private subnets.",
    intro: "A Terraform configuration that provisions a tiered application environment on AWS, with Apache HTTP Server set up through EC2 user-data.",
    overview: "This project demonstrates AWS infrastructure provisioning with Terraform. The supplied Terraform code defines a web tier and an application tier, each running on EC2 instances managed by an Auto Scaling Group. Apache HTTP Server is installed through EC2 user-data provisioning.",
    objective: "Demonstrate provisioning of a tiered AWS environment as code, with the web tier in public subnets and the application tier in private subnets.",
    solution: ["The environment is described in Terraform so it can be reviewed and recreated.", "Web and application tiers are separated into public and private subnets.", "Each tier is managed by its own Auto Scaling Group.", "Apache HTTP Server is configured on instances through EC2 user-data."],
    tech: ["AWS", "Terraform", "EC2", "Auto Scaling Groups", "Public & private subnets", "Apache HTTP Server", "EC2 user-data"],
    details: [
      { title: "Web tier", items: ["2 EC2 instances across 2 public subnets", "Auto Scaling Group: minimum capacity 2, maximum capacity 3", "Apache HTTP Server installed via user-data"] },
      { title: "Application tier", items: ["2 EC2 instances across 2 private subnets", "Auto Scaling Group: minimum capacity 2, maximum capacity 3"] }
    ],
    diagram: { type: "tiers", caption: "Schematic of the components confirmed by the supplied Terraform code. It is not an exported AWS diagram.",
      tiers: [
        { name: "Web tier", zone: "Public subnets (2)", asg: "Auto Scaling Group · min 2 / max 3", instances: 2, note: "Apache HTTP Server via user-data" },
        { name: "Application tier", zone: "Private subnets (2)", asg: "Auto Scaling Group · min 2 / max 3", instances: 2, note: "" }
      ] },
    scopeNote: "Only the web and application tiers are confirmed. A database tier, load balancers, health checks, scaling policies and monitoring are not described here because they are not confirmed by the supplied code.",
    challenges: [], results: [], screenshots: [], cover: null, github: "", links: [],
    related: ["netflix-devsecops-monitoring", "cloud-optimization"]
  },
  {
    id: "p02", number: "02", slug: "netflix-devsecops-monitoring", status: "published", featured: true,
    title: "Monitoring & Logging: Netflix Clone DevSecOps Pipeline on AWS",
    short: "A DevSecOps pipeline for a Netflix clone using Jenkins, SonarQube, OWASP Dependency Check, Trivy, Docker, Terraform, EKS, Helm, Argo CD, Prometheus and Grafana.",
    intro: "A DevSecOps implementation that takes a Netflix clone application from source code through CI, security analysis, container build and scanning, to deployment on AWS EKS with monitoring.",
    overview: "This case study covers a Netflix clone delivered through a DevSecOps pipeline on AWS. Jenkins handles CI/CD, SonarQube and OWASP Dependency Check analyse code and dependencies, Trivy scans for vulnerabilities, Docker packages the application, Terraform provisions infrastructure, and the application runs on AWS EKS. Helm and Argo CD are used for delivery, and Prometheus and Grafana provide monitoring and observability.",
    objective: "Show how code quality, security scanning, containerization, Kubernetes deployment and monitoring fit together in one delivery pipeline.",
    solution: ["Pipeline stages cover build, code quality, dependency and image security checks, and deployment.", "Infrastructure is provisioned with Terraform and the application runs on AWS EKS.", "Helm and Argo CD handle continuous delivery to the cluster.", "Prometheus and Grafana provide monitoring and observability."],
    tech: ["Jenkins", "SonarQube", "OWASP Dependency Check", "Trivy", "Docker", "Terraform", "AWS EKS", "Kubernetes", "Helm", "Argo CD", "Prometheus", "Grafana"],
    details: [],
    diagram: { type: "flow", caption: "Pipeline stages in order. Which stages run automatically versus manually is to be confirmed against the actual implementation.",
      stages: [
        { n: 1, name: "Source code and pipeline initiation", tools: ["Source repository", "Jenkins"], text: "Application source code is the starting point. A pipeline run in Jenkins is initiated for it." },
        { n: 2, name: "Continuous integration with Jenkins", tools: ["Jenkins"], text: "Jenkins runs the build and the pipeline stages that follow." },
        { n: 3, name: "Code quality and security analysis", tools: ["SonarQube", "OWASP Dependency Check"], text: "SonarQube analyses code quality. OWASP Dependency Check examines project dependencies for known vulnerabilities." },
        { n: 4, name: "Docker image creation", tools: ["Docker"], text: "The application is packaged into a Docker container image." },
        { n: 5, name: "Container image scanning", tools: ["Trivy"], text: "Trivy scans for security vulnerabilities before the image is deployed." },
        { n: 6, name: "Deployment to AWS EKS", tools: ["Terraform", "AWS EKS", "Kubernetes"], text: "Terraform provisions the AWS infrastructure and the application is deployed to a Kubernetes cluster on AWS EKS." },
        { n: 7, name: "Continuous delivery with Argo CD and Helm", tools: ["Argo CD", "Helm"], text: "Helm packages the Kubernetes deployment and Argo CD delivers it to the cluster." },
        { n: 8, name: "Monitoring and observability", tools: ["Prometheus", "Grafana"], text: "Prometheus collects metrics and Grafana presents them in dashboards." }
      ] },
    scopeNote: "Monitoring and observability here refer to Prometheus and Grafana. Centralized logging is not described because it has not been confirmed.",
    challenges: [], results: [], screenshots: [], cover: null, github: "", links: [],
    related: ["three-tier-aws-terraform", "cloud-optimization"]
  },
  {
    id: "p03", number: "03", slug: "cloud-optimization", status: "published", featured: true,
    title: "Cloud Optimization",
    short: "A case study on cloud resource utilization, right-sizing, cost visibility and FinOps practices. Implementation details and evidence are to be added.",
    intro: "A case study structure covering how cloud resources are used, sized and paid for. The specific implementation and evidence are still to be supplied.",
    overview: "This case study will explain how cloud resource utilization, infrastructure efficiency, right-sizing, cost visibility, cost optimization strategies and FinOps practices were applied. The confirmed implementation details have not been supplied yet, so this page deliberately contains no figures, tools or results.",
    objective: "To be added: the environment reviewed and the optimization goals.",
    solution: [],
    tech: [],
    topics: ["Cloud resource utilization", "Infrastructure efficiency", "Resource right-sizing", "Cloud cost visibility", "Cost optimization strategies", "FinOps practices"],
    details: [],
    diagram: null,
    scopeNote: "No savings percentages, cost reductions, client results, before-and-after figures, tools or implementation steps are stated here until they are confirmed with evidence.",
    challenges: [], results: [], screenshots: [], cover: null, github: "", links: [],
    related: ["three-tier-aws-terraform", "netflix-devsecops-monitoring"]
  },
  {
    id: "p04", number: "04", slug: "nsomex-connect", status: "published", featured: true,
    title: "NSOMEX Connect",
    short: "A digital services marketplace and product initiative built with React Native, Expo and Supabase, with English and French localization.",
    intro: "NSOMEX Connect is a digital services marketplace and product initiative.",
    overview: "NSOMEX Connect is presented as a digital services marketplace and product initiative. The known technology context is React Native with Expo for the mobile application, Supabase with PostgreSQL for the backend, authentication, database migrations and database security policies, Android builds, and English and French localization. Detailed product features will be added once supplied.",
    objective: "To be added: the problem the product addresses and its intended users.",
    solution: [],
    tech: ["React Native", "Expo", "Supabase", "PostgreSQL", "Authentication", "Database migrations", "Database security policies", "Android builds", "English & French localization"],
    details: [],
    diagram: null,
    scopeNote: "No features, user numbers, revenue, performance metrics, screenshots or capabilities are stated until they are confirmed.",
    challenges: [], results: [], screenshots: [], cover: null, github: "", links: [],
    related: ["nsomex-group", "three-tier-aws-terraform"]
  },
  {
    id: "p05", number: "05", slug: "nsomex-group", status: "published", featured: true,
    title: "NSOMEX Group",
    short: "A global business group with four divisions: Technology, Engineering, Renewable Energy and Global Business.",
    intro: "NSOMEX Group describes itself as a technology-driven global business company connecting businesses, products, services, talent and opportunities across markets.",
    overview: "NSOMEX Group is presented here as a wider business ecosystem, using only information published on its official website. The group is organised into four divisions, each described below using the website's own summaries.",
    objective: "To be added: your role in and relationship to the group.",
    solution: [],
    tech: [],
    divisions: [
      { name: "NSOMEX Technology", text: "Technology, cloud infrastructure, cybersecurity, software, and digital transformation.", areas: ["NSOMEX Cloud", "NSOMEX Cybersecurity", "NSOMEX Software"] },
      { name: "NSOMEX Engineering", text: "Engineering, construction, infrastructure, and project delivery capabilities.", areas: ["Residential Construction", "Commercial Construction", "Industrial Construction"] },
      { name: "NSOMEX Renewable Energy", text: "Renewable energy solutions, solar power, energy storage, and power systems.", areas: ["Solar Energy", "Energy Storage", "Wind Energy"] },
      { name: "NSOMEX Global Business", text: "International trade, sourcing, logistics, market development, and partnerships.", areas: ["International Trade", "Global Sourcing", "Import & Export"] }
    ],
    details: [], diagram: null,
    scopeNote: "Division descriptions are taken from the official website. No achievements, clients, revenue, partnerships or project results are claimed here.",
    challenges: [], results: [], screenshots: [], cover: null, github: "",
    links: [{ label: "Visit nsomex.com", url: "https://www.nsomex.com" }],
    related: ["nsomex-connect", "cloud-optimization"]
  }
];
