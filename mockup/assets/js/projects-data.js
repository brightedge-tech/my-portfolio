/* Central project data. Edit here; pages and cards are rendered from this file.
   - published: false hides a project from the overview and its page is not linked.
   - githubUrl: leave null to hide the GitHub button (never use "#").
   - cover / screenshots[] / diagram: paths relative to the site root, e.g. "assets/img/projects/x.png".
     Leave null/[] to show a neutral placeholder.
   - Sections with empty content are hidden (challenges, results) or show an honest placeholder. */
(function (g) {
  g.PROJECTS = [
    {
      id: "p01", number: "01", slug: "three-tier-aws-terraform", featured: true, published: true,
      title: "Three-Tier AWS Application Architecture Using Terraform",
      short: "AWS infrastructure provisioned with Terraform: a web tier and an application tier, each in its own Auto Scaling Group across two subnets.",
      full: "This project provisions a tiered application environment on AWS using Terraform. A web tier runs Apache HTTP Server on EC2 in public subnets, and an application tier runs on EC2 in private subnets. Instances are configured at launch through EC2 user-data.",
      technologies: ["AWS", "Terraform", "EC2", "Auto Scaling Groups", "VPC subnets", "Apache HTTP Server", "User-data"],
      cover: null, screenshots: [], diagram: { type: "three-tier", caption: "Schematic of the web and application tiers described in the Terraform configuration. Not an exported AWS console diagram." },
      githubUrl: null, liveUrl: null,
      objective: "Provision a repeatable multi-tier AWS environment as code, separating a public-facing web tier from an application tier in private subnets.",
      solution: [
        "Infrastructure is defined in Terraform.",
        "The web tier is an Auto Scaling Group of EC2 instances spread across two public subnets, with minimum capacity 2 and maximum capacity 3.",
        "The application tier is an Auto Scaling Group of EC2 instances spread across two private subnets, with minimum capacity 2 and maximum capacity 3.",
        "Apache HTTP Server is installed and configured on instances through EC2 user-data."
      ],
      details: [
        ["Web tier", "2 EC2 instances across 2 public subnets; ASG min 2, max 3"],
        ["Application tier", "2 EC2 instances across 2 private subnets; ASG min 2, max 3"],
        ["Provisioning", "Terraform configuration; EC2 user-data"],
        ["Web server", "Apache HTTP Server"]
      ],
      challenges: [], results: [],
      notes: "Database tier, load balancing, health checks and scaling policies are intentionally not described: they are not confirmed by the supplied Terraform code. Add them only if the repository confirms them.",
      related: ["netflix-devsecops-eks", "cloud-optimization"]
    },
    {
      id: "p02", number: "02", slug: "netflix-devsecops-eks", featured: true, published: true,
      title: "Monitoring & Logging: Netflix Clone DevSecOps Pipeline on AWS",
      short: "A DevSecOps pipeline for a Netflix clone: Jenkins CI, SonarQube, OWASP Dependency Check, Trivy, Docker, EKS, Argo CD with Helm, and Prometheus and Grafana.",
      full: "This case study covers a Netflix clone application delivered through a DevSecOps pipeline on AWS. Jenkins drives continuous integration, code and dependency checks run through SonarQube and OWASP Dependency Check, images are built with Docker and scanned with Trivy, infrastructure is provisioned with Terraform, and the application runs on AWS EKS. Argo CD and Helm handle continuous delivery, and Prometheus and Grafana provide monitoring.",
      technologies: ["Jenkins", "SonarQube", "OWASP Dependency Check", "Trivy", "Docker", "Terraform", "AWS EKS", "Kubernetes", "Helm", "Argo CD", "Prometheus", "Grafana"],
      cover: null, screenshots: [], diagram: { type: "pipeline", caption: "Pipeline stages of the project. Which steps run automatically versus manually is to be confirmed." },
      githubUrl: null, liveUrl: null,
      objective: "Build a delivery pipeline that adds code quality, dependency and image security checks before deployment to Kubernetes, with monitoring after release.",
      solution: [
        "Source code changes start the pipeline in Jenkins.",
        "Quality and security checks use SonarQube, OWASP Dependency Check and Trivy.",
        "Docker packages the application; the image is scanned before deployment.",
        "The application is deployed to AWS EKS; Argo CD and Helm manage continuous delivery.",
        "Prometheus and Grafana monitor the running environment."
      ],
      stages: [
        ["Source code and pipeline initiation", "Application code is stored in source control and a change initiates the Jenkins pipeline."],
        ["Continuous integration with Jenkins", "Jenkins orchestrates the build and the checks that follow."],
        ["Code quality and security analysis", "SonarQube analyses code quality and OWASP Dependency Check examines project dependencies for known vulnerabilities."],
        ["Docker image creation", "The application is packaged as a Docker container image."],
        ["Container image scanning", "Trivy scans the image for vulnerabilities."],
        ["Deployment to AWS EKS", "The application runs on a Kubernetes cluster on AWS EKS, with infrastructure provisioned using Terraform."],
        ["Continuous delivery with Argo CD and Helm", "Argo CD deploys the application to the cluster using Helm charts."],
        ["Monitoring and observability", "Prometheus collects metrics and Grafana visualises them."]
      ],
      details: [
        ["CI/CD", "Jenkins, Argo CD"],
        ["Quality and security", "SonarQube, OWASP Dependency Check, Trivy"],
        ["Containers and platform", "Docker, AWS EKS, Kubernetes, Helm"],
        ["Infrastructure", "Terraform"],
        ["Observability", "Prometheus, Grafana"]
      ],
      challenges: [], results: [],
      notes: "No claim is made that every stage is fully automated. Confirm automation level, and add screenshots of Jenkins, SonarQube, Argo CD and Grafana as evidence.",
      related: ["three-tier-aws-terraform", "cloud-optimization"]
    },
    {
      id: "p03", number: "03", slug: "cloud-optimization", featured: true, published: true,
      title: "Cloud Optimization",
      short: "A case study on cloud resource utilization, right-sizing, cost visibility and FinOps practice. Implementation details to be added.",
      full: "This case study will cover cloud resource utilization, infrastructure efficiency, right-sizing, cost visibility, cost optimization strategies and FinOps practices. The implementation details and evidence are still to be provided.",
      technologies: ["Cloud cost optimization", "Right-sizing", "FinOps"],
      cover: null, screenshots: [], diagram: null, githubUrl: null, liveUrl: null,
      objective: "", solution: [], details: [], challenges: [], results: [],
      topics: ["Cloud resource utilization", "Infrastructure efficiency", "Resource right-sizing", "Cloud cost visibility", "Cost optimization strategies", "FinOps practices"],
      notes: "Structure only. No savings, figures, tools or client results are stated. Fill objective, solution, details and results when evidence is available.",
      related: ["netflix-devsecops-eks", "three-tier-aws-terraform"]
    },
    {
      id: "p04", number: "04", slug: "nsomex-connect", featured: true, published: true,
      title: "NSOMEX Connect",
      short: "A digital services marketplace and product initiative built with React Native, Expo and Supabase, with English and French localization.",
      full: "NSOMEX Connect is a digital services marketplace and product initiative. The technology context is a React Native and Expo mobile app backed by Supabase and PostgreSQL, including authentication, database migrations and database security policies, with Android builds and English and French localization.",
      technologies: ["React Native", "Expo", "Supabase", "PostgreSQL", "Authentication", "Database migrations", "Row-level security policies", "Android builds", "English / French"],
      cover: null, screenshots: [], diagram: null, githubUrl: null, liveUrl: null,
      objective: "", solution: [],
      details: [
        ["Mobile app", "React Native with Expo"],
        ["Backend", "Supabase with PostgreSQL"],
        ["Data layer", "Authentication, database migrations, database security policies"],
        ["Delivery", "Android builds"],
        ["Localization", "English and French"]
      ],
      challenges: [], results: [],
      notes: "Product features, users, metrics and screenshots are not stated. Add genuine app screenshots to screenshots[].",
      related: ["nsomex-group", "cloud-optimization"]
    },
    {
      id: "p05", number: "05", slug: "nsomex-group", featured: true, published: true,
      title: "NSOMEX Group",
      short: "A wider business ecosystem across technology, engineering, renewable energy and global business divisions.",
      full: "NSOMEX Group is a wider business ecosystem made up of four divisions: NSOMEX Technology, NSOMEX Engineering, NSOMEX Renewable Energy and NSOMEX Global Business.",
      technologies: ["Technology", "Engineering", "Renewable Energy", "Global Business"],
      cover: null, screenshots: [], diagram: null, githubUrl: null, liveUrl: "https://www.nsomex.com",
      objective: "", solution: [],
      divisions: ["NSOMEX Technology", "NSOMEX Engineering", "NSOMEX Renewable Energy", "NSOMEX Global Business"],
      details: [], challenges: [], results: [],
      notes: "Division descriptions are not written yet: add them only from supplied or verified information from nsomex.com. Add brand assets when approved.",
      related: ["nsomex-connect", "cloud-optimization"]
    }
  ];
})(typeof window !== "undefined" ? window : global.window);
