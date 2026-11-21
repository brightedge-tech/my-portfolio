/* Central data source for all Services. Edit here; pages render from it. */
window.SERVICES = [
  {
    slug: "cloud-migration", number: "01", title: "Cloud Migration",
    icon: '<path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1 0 9z"/><path d="M12 17v-6m-3 3 3-3 3 3"/>',
    short: "Move applications, workloads and infrastructure to the cloud with a planned, validated approach.",
    headline: "Move to the cloud with a plan, not a gamble.",
    intro: "I help businesses move applications, workloads and infrastructure to the cloud in a structured way: assess what you have, plan the move, execute it, and confirm everything works afterwards.",
    includes: ["Cloud migration planning and assessment", "Infrastructure migration", "Workload migration", "Cloud environment setup", "Post-migration validation and optimization"],
    capabilities: ["Inventory and dependency review of existing systems", "Migration approach and sequencing", "Landing-zone and environment preparation", "Cutover support and rollback planning", "Post-move validation and tuning"],
    tech: ["AWS", "Terraform", "Docker", "Linux", "VPC networking"],
    value: ["A clear picture of what is moving and in what order", "Lower risk during cutover through planning and validation", "A cloud environment that is set up deliberately rather than ad hoc"]
  },
  {
    slug: "devops-automation", number: "02", title: "DevOps & Automation",
    icon: '<path d="M17 8a5 5 0 0 0-9-2M7 16a5 5 0 0 0 9 2"/><path d="M17 3v5h-5M7 21v-5h5"/>',
    short: "Improve software delivery with CI/CD, Infrastructure as Code, containers and Kubernetes.",
    headline: "Ship software faster and more reliably.",
    intro: "I help organizations improve how software is delivered by automating builds, tests, infrastructure and deployments with modern DevOps practices.",
    includes: ["CI/CD pipeline implementation", "Infrastructure as Code", "Containerization with Docker", "Kubernetes deployment and orchestration", "Deployment automation", "DevOps workflow improvements"],
    capabilities: ["Pipeline design from commit to deployment", "Repeatable environments defined in code", "Container images and runtime configuration", "Cluster deployment and release strategies", "Reducing manual steps in the release process"],
    tech: ["GitHub Actions", "Jenkins", "Docker", "Kubernetes", "Terraform", "Ansible", "Helm"],
    value: ["Repeatable, auditable releases", "Fewer manual steps and fewer manual errors", "Environments that can be recreated from code"]
  },
  {
    slug: "cloud-cost-optimization-finops", number: "03", title: "Cloud Cost Optimization & FinOps",
    icon: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9a2.5 2 0 0 0-2.5-1.5c-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2A2.7 2 0 0 1 9.5 15M12 6v1.5M12 16.5V18"/>',
    short: "Control cloud spending and maximize the value of the infrastructure you already run.",
    headline: "Control Cloud Spending. Maximize Infrastructure Value.",
    intro: "I help teams understand where cloud money goes and make sure infrastructure is sized and run sensibly, using cost visibility and FinOps practices. Outcomes depend on your environment; I will not promise figures before reviewing it.",
    includes: ["Cloud spending analysis", "Infrastructure cost assessment", "Resource utilization optimization", "Cloud resource right-sizing", "Cost monitoring and visibility", "FinOps practices and recommendations"],
    capabilities: ["Breaking spend down by service, environment and workload", "Finding idle, oversized or unused resources", "Right-sizing recommendations based on real usage", "Budgets, alerts and cost dashboards", "Practical FinOps habits for engineering teams"],
    tech: ["AWS", "CloudWatch", "Terraform", "Python"],
    value: ["Visibility into what drives your cloud bill", "Infrastructure matched to actual usage", "A repeatable way to keep costs under review"]
  },
  {
    slug: "cloud-infrastructure-architecture", number: "04", title: "Cloud Infrastructure & Architecture",
    icon: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01M12 10v4"/>',
    short: "Design scalable, secure and reliable cloud infrastructure, provisioned as code.",
    headline: "Infrastructure designed to scale and stay up.",
    intro: "I design cloud infrastructure with scalability, security and reliability in mind, and provision it with Terraform so it is consistent and reviewable.",
    includes: ["Cloud infrastructure design", "AWS architecture", "Scalable infrastructure planning", "Network and security architecture", "Infrastructure provisioning with Terraform", "High availability and reliability considerations"],
    capabilities: ["Reference architectures on AWS", "VPC, subnet and access design", "Capacity and scaling planning", "Infrastructure defined and versioned as code", "Designing for failure and recovery"],
    tech: ["AWS", "Terraform", "VPC networking", "IAM", "Linux", "Kubernetes"],
    value: ["A documented architecture teams can reason about", "Infrastructure changes that are reviewed and repeatable", "Reliability considered at design time"]
  },
  {
    slug: "application-architecture-modernization", number: "05", title: "Application Architecture & Modernization",
    icon: '<path d="M12 3 3 8l9 5 9-5z"/><path d="m3 13 9 5 9-5M3 17.5l9 5 9-5" opacity=".6"/>',
    short: "Design and modernize applications for containers, scalability and maintainability.",
    headline: "Modernize applications without losing stability.",
    intro: "I help design application architectures and modernize legacy applications, using containers and microservices where they genuinely fit.",
    includes: ["Application architecture design", "Modernization of legacy applications", "Microservices architecture where appropriate", "Application deployment architecture", "Container-based application environments", "Scalability and maintainability improvements"],
    capabilities: ["Assessing legacy applications for modernization paths", "Choosing between monolith, modular and microservices", "Deployment architecture and environments", "Containerizing existing applications", "Improving maintainability and scaling behavior"],
    tech: ["Docker", "Kubernetes", "Python", "Node.js", "Microservices", "AWS"],
    value: ["A modernization path matched to the application", "Deployments that are simpler to run and scale", "Code and environments that are easier to maintain"]
  },
  {
    slug: "enterprise-technology-support", number: "06", title: "Enterprise Technology Support",
    icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    short: "A broad technology ecosystem of platforms and tools covered within the service offering.",
    headline: "Technology support across your platform stack.",
    intro: "Enterprise environments mix many platforms and tools. This service covers the technologies and platforms within the offering. Listing a technology here describes service scope; it is not a certification, partnership or claim of specialist verification.",
    includes: ["Support across cloud, DevOps and infrastructure tooling", "Monitoring and observability setup", "Operating system and scripting support", "Security and networking configuration", "Database and application platform support"],
    capabilities: ["Working across mixed technology stacks", "Tool selection guidance", "Integration between platforms", "Operational documentation and handover"],
    tech: [],
    value: ["One point of contact across a mixed stack", "Tooling that fits together", "Clear scope for what is and is not covered"],
    extra: "tech"
  },
  {
    slug: "we-build-and-deliver", number: "07", title: "We Build & Deliver",
    icon: '<path d="M4 20 20 4M14 4h6v6"/><path d="M5 9a6 6 0 0 1 6-6M15 19a6 6 0 0 0 6-6" opacity=".6"/>',
    short: "Turn your idea, business requirement or technical challenge into a working solution: discover, design, build, test, deploy and support.",
    headline: "From your idea to a working solution.",
    intro: "Bring us an idea, a business requirement or a technical challenge. We work with you to understand it, design the right solution, build and test it, put it into production and support it afterwards, with clear communication at every stage.",
    includes: ["Requirements discovery and scoping", "Solution and architecture design", "Implementation of the agreed solution", "Quality assurance and testing", "Deployment to your environment", "Documentation, handover and ongoing support"],
    capabilities: ["Turning loosely defined needs into clear, agreed requirements", "Cloud, infrastructure, automation and application solutions", "Delivery in reviewable stages so you can see progress", "Automated build, test and deployment pipelines", "Support and improvement after go-live"],
    tech: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions", "Python"],
    value: ["One accountable team from first conversation to live system", "Requirements and scope agreed before build begins", "Tested, documented solutions that your team can operate", "Support available once the solution is live"],
    extra: "process"
  }
];

window.PROCESS = [
  { step: "Discover", text: "We start by listening. Through conversations and questions we capture your goals, requirements, users, constraints, budget and timeline, and review any existing systems. You receive a clear, written understanding of the problem and the agreed scope.",
    you: "Share your goals, current setup and constraints.", get: "Agreed requirements and scope." },
  { step: "Design", text: "We turn the requirements into a solution architecture: the technologies, infrastructure, security approach and delivery plan that best fit your needs. We explain the options and trade-offs in plain language and agree the approach with you before building.",
    you: "Review options and approve the approach.", get: "Solution architecture and delivery plan." },
  { step: "Build", text: "We implement the agreed solution in small, reviewable steps, using automation and infrastructure as code where it helps, so the result is consistent and repeatable. You can see progress along the way rather than waiting for a single big reveal.",
    you: "Give feedback at agreed checkpoints.", get: "Working, reviewable increments." },
  { step: "Test", text: "Quality assurance happens before anything goes live: functional checks, security and reliability checks, and validation against the requirements we agreed together. Issues are fixed before release.",
    you: "Confirm the solution meets your requirements.", get: "A validated solution and test results." },
  { step: "Deploy", text: "We release the solution to your environment through a controlled, repeatable process with a plan for rolling back if needed, and confirm it runs as expected once live.",
    you: "Agree the release timing.", get: "The solution live in production." },
  { step: "Support", text: "After go-live we provide documentation and handover, monitor how the solution performs, fix issues and help you improve it over time. The level of ongoing support is agreed with you.",
    you: "Raise issues and new needs as they arise.", get: "Documentation, support and improvements." }
];

window.DELIVERY_EXAMPLES = {
  title: "Examples",
  text: "This delivery approach applies to products and platforms such as NSOMEX Group and NSOMEX Connect. Their full details will be presented as dedicated case studies in the Projects section."
};
