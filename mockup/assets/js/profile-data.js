/* Central profile data. Edit here; About, CV and Experience pages render from this file.
   - Social links: leave url null to hide the link (never use "#").
   - photo: path relative to site root (e.g. "assets/img/profile.jpg"); null shows a placeholder.
   - cvPdf: path to the real PDF (e.g. "assets/cv/ayeah-derrick-nsom-m-cv.pdf"); null hides the download button.
   - experience {title, organization, type, location, start, end, description, responsibilities[], contributions[], technologies[], achievements[]};
     education {qualification, institution, period}; certifications {name, issuer, year}; languages {name, level};
     skills {group, items[]}. Empty arrays hide the section (certifications) or show a "to be added" note.
   - The Skills page (skills-data.js) is separate: it lists technologies linked to portfolio projects. */
(function (g) {
  g.PROFILE = {
    name: "Ayeah Derrick Nsom-M",
    title: "Cloud & DevOps Engineer",
    location: null,
    email: "derricknsom0@gmail.com",
    phone: "+86 139 4902 6940",
    photo: "assets/img/profile.jpg",
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
      { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/derrick-nsom-m-5332aa388" },
      { id: "github", label: "GitHub", url: "https://github.com/brightedge-tech" },
      { id: "medium", label: "Medium", url: null },
      { id: "nsomex", label: "NSOMEX website", url: "https://www.nsomex.com" }
    ],
    experience: [
      {
        title: "DevOps Engineer", organization: "Etech Consulting LLC", type: null, location: "Ohio City, OH (Remote)",
        start: "February 2020", end: "Present", description: null,
        responsibilities: [
          "Automated CI/CD rollbacks when errors exceeded defined thresholds.",
          "Created Python and AWS Lambda scripts to shut down and restart non-production Dev and Staging environments.",
          "Participated in 24/7 production on-call incident response.",
          "Performed troubleshooting and root cause analysis.",
          "Designed highly available AWS architectures using EC2, S3, RDS and Lambda.",
          "Monitored infrastructure using CloudWatch, Prometheus and Grafana.",
          "Applied security practices involving firewalls, VPNs, IAM and encryption.",
          "Collaborated with development, QA and operations teams.",
          "Mentored junior engineers.",
          "Containerized applications using Docker and Kubernetes.",
          "Automated deployments using Ansible and Terraform.",
          "Used Terraform to deploy AWS VPC infrastructure and Kubernetes clusters."
        ],
        contributions: [],
        technologies: ["AWS", "EC2", "S3", "RDS", "Lambda", "CloudWatch", "IAM", "Kubernetes", "Docker", "Terraform", "Ansible", "Python", "Prometheus", "Grafana"],
        achievements: [
          "Reduced monthly hosting costs by 25% by identifying and terminating underutilized cloud resources.",
          "Maintained 99% system uptime by migrating critical workloads to highly available Kubernetes clusters."
        ]
      },
      {
        title: "Linux System Administrator", organization: "CHS", type: null, location: "Bamenda",
        start: "October 2017", end: "December 2019", description: null,
        responsibilities: [
          "Managed and maintained Linux servers.",
          "Installed, configured and updated Linux software.",
          "Performed backups and supported disaster recovery readiness.",
          "Managed user accounts, permissions and password policies.",
          "Automated tasks using Bash and Python.",
          "Configured DNS, DHCP and FTP services.",
          "Managed authentication and access control using LDAP and Active Directory integration.",
          "Troubleshot hardware and software issues."
        ],
        contributions: [],
        technologies: ["Linux", "Bash", "Python", "DNS", "DHCP", "FTP", "LDAP", "Active Directory"],
        achievements: []
      }
    ],
    education: [
      { qualification: "Computer Science", institution: "University of Buea", period: "September 2014 \u2013 June 2017" }
    ],
    certifications: [],
    languages: [
      { name: "English", level: "Expert" },
      { name: "French", level: "Fluent" }
    ],
    skills: [
      { group: "Operating systems", items: ["Linux", "Windows Server"] },
      { group: "Cloud platforms", items: ["AWS (EC2, EKS, IAM, S3, RDS)", "Azure (Active Directory/Entra ID)", "GCP"] },
      { group: "Security", items: ["Snyk", "SonarQube", "Trivy", "RBAC", "HashiCorp Vault"] },
      { group: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
      { group: "Container orchestration", items: ["Kubernetes", "Helm", "Docker"] },
      { group: "Monitoring & observability", items: ["Prometheus", "Grafana"] },
      { group: "CI/CD", items: ["GitHub Actions", "Jenkins", "GitLab CI", "Harness"] },
      { group: "Infrastructure as code", items: ["Terraform", "CloudFormation"] },
      { group: "Configuration management", items: ["Ansible", "Puppet"] },
      { group: "Version control", items: ["Git", "GitHub", "GitLab"] },
      { group: "Scripting & programming", items: ["Bash", "Python"] },
      { group: "SDLC & collaboration", items: ["Agile", "Jira", "Confluence", "Slack"] },
      { group: "AI tools", items: ["GitHub Copilot", "Amazon Q Developer", "Cursor AI", "Claude", "OpenAI API"] }
    ]
  };
})(typeof window !== "undefined" ? window : global.window);
