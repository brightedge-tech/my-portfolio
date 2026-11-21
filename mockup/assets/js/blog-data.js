/* Blog data. Edit this file to add, edit, remove or reorder articles; no layout code needs to change.
   - MEDIUM_URL: your Medium profile URL (e.g. "https://medium.com/@yourhandle"). null hides the Follow button and shows a note.
   - ARTICLES is displayed in the order listed (newest first is recommended). Leave it empty until real articles exist.
   Article fields:
     id, slug (URL-safe, unique), title, description, category (one of BLOG.categories),
     keywords [] (optional, used by search), cover (path relative to site root, or null), coverAlt,
     author (e.g. "Ayeah Derrick Nsom-M"), date ("YYYY-MM-DD"), readingTime (e.g. "6 min read"),
     featured (true/false; only a published featured article is shown in the featured slot),
     platform: "medium" | "local", url (external URL, required when platform is "medium"),
     content (local articles only): array of blocks:
       {type:"p", text}, {type:"h2"|"h3", text}, {type:"ul", items:[...]}, {type:"code", lang, text}, {type:"img", src, alt, caption},
     project (optional slug from projects-data.js, links to that case study), published (true/false).
   Example (copy, fill with REAL details, then remove this comment):
     { id: "b01", slug: "my-article", title: "...", description: "...", category: "AWS", keywords: ["vpc"], cover: null, coverAlt: "",
       author: "Ayeah Derrick Nsom-M", date: "2025-01-31", readingTime: "5 min read", featured: true, platform: "medium",
       url: "https://medium.com/...", project: "three-tier-aws-terraform", published: true } */
(function (g) {
  g.BLOG = {
    MEDIUM_URL: null,
    categories: [
      { name: "Cloud Computing", filter: "Cloud" },
      { name: "Amazon Web Services (AWS)", filter: "AWS" },
      { name: "DevOps", filter: "DevOps" },
      { name: "CI/CD", filter: "DevOps" },
      { name: "Docker & Kubernetes", filter: "Containers" },
      { name: "Infrastructure as Code", filter: "Infrastructure" },
      { name: "DevSecOps", filter: "Security" },
      { name: "Monitoring & Observability", filter: "Monitoring" },
      { name: "Tutorials", filter: "Tutorials" },
      { name: "Engineering Insights", filter: null }
    ],
    articles: []
  };
})(typeof window !== "undefined" ? window : globalThis);
