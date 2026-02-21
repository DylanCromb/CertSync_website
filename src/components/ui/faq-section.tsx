import React, { useState } from "react";
import "./faq-styles.css";

export default function FAQSection() {
  const [query, setQuery] = useState("");

  // CertSync FAQ content
  const faqs = [
    // General (3)
    {
      q: "What is CertSync?",
      a: "CertSync is a credential management platform designed for Australian businesses to track professional licences, permits, and certifications in one centralized location. We help you stay compliant with WorkSafe regulations and avoid penalties from expired credentials.",
      category: "General",
    },
    {
      q: "Who should use CertSync?",
      a: "CertSync is built for compliance managers, safety officers, HR directors, and business owners in industries like construction, mining, healthcare, logistics, and facility management—anywhere professional credentials are required by law.",
      category: "General",
    },
    {
      q: "Is CertSync compliant with Australian privacy laws?",
      a: "Yes. CertSync is fully compliant with the Australian Privacy Act 1988 and follows best practices for data security and storage. See our Privacy Policy for details.",
      category: "General",
    },
    // Getting Started (4)
    {
      q: "How do I sign up for CertSync?",
      a: 'Click the "Get Started" button on our homepage, enter your organisation details, and create your account. You\'ll receive a confirmation email with instructions to set up your first credentials.',
      category: "Getting Started",
    },
    {
      q: "How do I add credentials to my account?",
      a: 'After logging in, navigate to "Add Credential," select the credential type (e.g., White Card, First Aid Certificate), upload the document, and enter expiry details. You can add credentials for yourself or your team members.',
      category: "Getting Started",
    },
    {
      q: "Can I import existing employee data?",
      a: "Yes. CertSync supports bulk employee invites via CSV upload. Contact our support team at Dev@kaylos.com.au for a CSV template and assistance with team setup.",
      category: "Getting Started",
    },
    {
      q: "How do I invite team members?",
      a: 'Go to "People" and select "Add People." From here you can create a new team or select an existing team to add someone to. Enter their email address and assign their role (Admin or Manager for web access). They\'ll receive an invitation email to create their account.',
      category: "Getting Started",
    },
    // Account Management (4)
    {
      q: "How do I update my account details?",
      a: 'Navigate to "Account Settings" to update your personal information and organisation details.',
      category: "Account Management",
    },
    {
      q: "How do I change my password?",
      a: 'Go to "Account Settings" and click the "Change Password" button. You\'ll receive a verification email to confirm the change.',
      category: "Account Management",
    },
    {
      q: "What user roles are available?",
      a: "CertSync has two web platform roles: Admin (full access) and Manager (manage team credentials). The mobile app provides Employee access (view-only for their own credentials).",
      category: "Account Management",
    },
    {
      q: "Can I delete my account?",
      a: 'Yes. You can delete your account under "Account Settings." Warning: This action cannot be undone. Please reach out to Dev@kaylos.com.au before deleting if you have any questions.',
      category: "Account Management",
    },
    // Compliance & Tracking (4)
    {
      q: "How does CertSync track expiring credentials?",
      a: "CertSync automatically monitors credential expiry dates and sends email reminders 90, 60, 30, and 7 days before expiration to keep you informed of upcoming renewals.",
      category: "Compliance & Tracking",
    },
    {
      q: "Can I generate compliance reports?",
      a: 'Yes. Navigate to "Reports" to export compliance summaries, expiry forecasts, and audit-ready credential lists in PDF or Excel format. Reports are customisable by team, credential type, or date range.',
      category: "Compliance & Tracking",
    },
    {
      q: "What happens if a credential expires?",
      a: "Expired credentials are flagged in red on your dashboard. Employees and admins receive immediate notifications. The credential remains in your system for record-keeping but is clearly marked as expired.",
      category: "Compliance & Tracking",
    },
    {
      q: "Does CertSync integrate with WorkSafe systems?",
      a: "Currently, CertSync does not integrate directly with WorkSafe databases. However, our platform is designed to align with WorkSafe compliance requirements, and you can export reports for audits.",
      category: "Compliance & Tracking",
    },
    // Technical & Security (3)
    {
      q: "Is my data secure?",
      a: "Absolutely. CertSync uses industry-standard encryption to protect your data. Our infrastructure is hosted on AWS (Sydney region) with daily backups and 99.9% uptime SLA.",
      category: "Technical & Security",
    },
    {
      q: "Where is my data stored?",
      a: "All data is stored on secure servers in Australia (AWS Sydney region) to comply with Australian data sovereignty requirements.",
      category: "Technical & Security",
    },
    {
      q: "What browsers are supported?",
      a: "CertSync works on all modern browsers: Chrome, Firefox, Safari, and Edge (latest versions). Mobile browsers are also supported for on-the-go access.",
      category: "Technical & Security",
    },
    // Troubleshooting (3)
    {
      q: "I didn't receive my verification email. What should I do?",
      a: 'Check your spam/junk folder. If it\'s not there, click "Resend verification email" on the login page. If the issue persists, contact Dev@kaylos.com.au.',
      category: "Troubleshooting",
    },
    {
      q: "Why can't I upload a credential document?",
      a: "Ensure the file is in a supported format (PDF, JPG, PNG) and under 10MB. Clear your browser cache and try again. If the problem continues, email us the file at Dev@kaylos.com.au.",
      category: "Troubleshooting",
    },
    {
      q: "I'm having trouble logging in. What should I do?",
      a: 'First, reset your password using the "Forgot Password" link. If that doesn\'t work, verify you\'re using the correct email address. Contact support if you\'re still unable to access your account.',
      category: "Troubleshooting",
    },
  ];

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  // Group by category
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="faq-container">
      {/* Header */}
      <div className="faq-header">
        <div className="faq-header-content">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-search">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="faq-search-input"
          />
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="faq-content">
        {filtered.length > 0 ? (
          <div className="faq-grid">
            {filtered.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i + 1} />
            ))}
          </div>
        ) : (
          <div className="faq-no-results">
            <p>No questions found matching "{query}"</p>
            <button onClick={() => setQuery("")} className="faq-clear-btn">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "faq-item-open" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="faq-question"
        aria-expanded={open}
      >
        <div className="faq-question-content">
          <span className="faq-number">{String(index).padStart(2, "0")}</span>
          <h3>{q}</h3>
        </div>
        <span className="faq-toggle">{open ? "−" : "+"}</span>
      </button>
      <div className={`faq-answer ${open ? "faq-answer-open" : ""}`}>
        <div className="faq-answer-content">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}
