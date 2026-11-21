/* Contact configuration. Edit here; no layout code needs to change.
   - FORM_ENDPOINT: URL of a form-handling service that accepts a JSON POST (e.g. a Formspree/Getform/own serverless endpoint).
     Never put secrets or API keys here; endpoint URLs are public. While null, the form opens a pre-filled email in the visitor's
     email app instead (nothing is sent until they press Send there), and says so.
   - EMAILS: first entry is the primary address used for the fallback. Name, phone, LinkedIn, GitHub and NSOMEX site live in profile-data.js.
   - Extra option lists below are shown in the form. */
(function (g) {
  g.CONTACT = {
    FORM_ENDPOINT: null,
    emails: [
      { label: "Email", address: "ayeahderick@gmail.com" },
      { label: "NSOMEX", address: "nsomextechonologies@gmail.com" }
    ],
    inquiryTypes: ["Project inquiry", "Cloud consulting", "DevOps engineering", "Collaboration", "Employment opportunity", "General inquiry"],
    budgets: ["Not sure yet", "Under $1,000", "$1,000 - $5,000", "$5,000 - $15,000", "$15,000+"],
    topics: ["Cloud architecture", "AWS infrastructure", "Terraform", "CI/CD automation", "DevSecOps", "Containerization", "Kubernetes", "Monitoring and observability", "Application development"]
  };
})(typeof window !== "undefined" ? window : globalThis);
