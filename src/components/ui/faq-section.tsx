import React, { useState } from "react";
import "./faq-styles.css";

type FAQ = {
  q: string;
  a: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    q: "What is CertSync?",
    a: "CertSync is an Australian credential and compliance record management platform. It helps teams store worker and contractor records, track expiry dates, identify missing or expired evidence, and prepare stored records for client, audit, insurer or internal review requests.",
    category: "General",
  },
  {
    q: "Who should use CertSync?",
    a: "CertSync is built for business owners, operations managers, compliance administrators, project coordinators and site managers who need a clearer register for licences, permits, SWMS, inductions, insurance documents, training records and contractor evidence.",
    category: "General",
  },
  {
    q: "Does CertSync guarantee compliance?",
    a: "No. CertSync does not provide legal, WHS or regulatory advice and does not guarantee compliance. It helps businesses organise, track and produce the records that support their own compliance processes.",
    category: "General",
  },
  {
    q: "Is CertSync compliant with Australian privacy laws?",
    a: "CertSync is built for Australian businesses with local data hosting and security controls for sensitive credential records. Our Privacy Policy explains how personal information is collected, used, stored and disclosed.",
    category: "General",
  },
  {
    q: "How do I sign up for CertSync?",
    a: 'Use the "Create Account" button or book a demo if you want help choosing the right setup. You can create an organisation account, invite team members and start adding credential records.',
    category: "Getting Started",
  },
  {
    q: "How do I add credentials to my account?",
    a: "After logging in, add the worker or contractor record, choose the document type, upload the evidence file and enter the relevant expiry or review details. Admins and managers can add records for team members where they have access.",
    category: "Getting Started",
  },
  {
    q: "Can I import existing employee data?",
    a: "If you are moving from spreadsheets or shared folders, contact support before setup. We can discuss the best way to structure your workers, contractors, document types and expiry fields.",
    category: "Getting Started",
  },
  {
    q: "How do I invite team members?",
    a: 'Go to "People" and add the team member by email. Assign the appropriate role so admins, managers and workers have access to the records they need.',
    category: "Getting Started",
  },
  {
    q: "How does CertSync track expiring credentials?",
    a: "CertSync stores expiry dates against credential and document records, then sends reminders before renewal deadlines based on the reminder settings used by your team.",
    category: "Compliance & Tracking",
  },
  {
    q: "Can I generate compliance reports?",
    a: "Yes. CertSync helps teams export stored credential records and evidence summaries for client requests, audits, insurer reviews and internal checks. Exact report views depend on how your register is configured.",
    category: "Compliance & Tracking",
  },
  {
    q: "What happens if a credential expires?",
    a: "Expired records are surfaced in the register so managers can see which documents need attention. The uploaded evidence stays attached to the record for review and record-keeping.",
    category: "Compliance & Tracking",
  },
  {
    q: "Does CertSync integrate with WorkSafe systems?",
    a: "No. CertSync does not integrate directly with WorkSafe or regulator databases. It helps organise WHS-related records your team manages, such as licences, SWMS, permits, inductions and training evidence.",
    category: "Compliance & Tracking",
  },
  {
    q: "Can CertSync replace spreadsheets?",
    a: "For many teams, yes. CertSync replaces scattered spreadsheet tracking with a central register that keeps files, status, ownership and expiry dates connected.",
    category: "Compliance & Tracking",
  },
  {
    q: "What user roles are available?",
    a: "CertSync supports organisation admin and manager workflows for managing team records. Worker access is designed around viewing and uploading their own credential evidence where enabled.",
    category: "Account Management",
  },
  {
    q: "How do I update my account details?",
    a: 'Navigate to "Account Settings" to update your personal information and organisation details.',
    category: "Account Management",
  },
  {
    q: "How do I change my password?",
    a: 'Go to "Account Settings" and click the "Change Password" button. You will receive a verification email to confirm the change.',
    category: "Account Management",
  },
  {
    q: "Can I delete my account?",
    a: 'Yes. You can delete your account under "Account Settings." This action cannot be undone, so contact support before deleting if your organisation still needs the records.',
    category: "Account Management",
  },
  {
    q: "Is my data secure?",
    a: "CertSync uses encryption and security controls to protect stored credential records. Security practices are described in our policies, and we can discuss specific data questions during onboarding or a demo.",
    category: "Technical & Security",
  },
  {
    q: "Where is my data stored?",
    a: "CertSync is designed for Australian businesses with data hosted in Australia.",
    category: "Technical & Security",
  },
  {
    q: "What browsers are supported?",
    a: "CertSync works on modern browsers including Chrome, Firefox, Safari and Edge. Mobile browsers are also supported for web access.",
    category: "Technical & Security",
  },
  {
    q: "I did not receive my verification email. What should I do?",
    a: "Check your spam or junk folder first. If it is not there, use the resend option on the login page or contact support@certsync.com.au.",
    category: "Troubleshooting",
  },
  {
    q: "Why can't I upload a credential document?",
    a: "Check the file type and size, then try again from a modern browser. If the problem continues, contact support and include the document type you were trying to upload.",
    category: "Troubleshooting",
  },
  {
    q: "I'm having trouble logging in. What should I do?",
    a: 'First, reset your password using the "Forgot Password" link. If that does not work, verify you are using the correct email address. Contact support if you still cannot access your account.',
    category: "Troubleshooting",
  },
];

export default function FAQSection() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : faqs;

  return (
    <div className="faq-container">
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

      <div className="faq-content">
        {filtered.length > 0 ? (
          <div className="faq-grid">
            {filtered.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i + 1} />
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
        <span className="faq-toggle">{open ? "-" : "+"}</span>
      </button>
      <div className={`faq-answer ${open ? "faq-answer-open" : ""}`}>
        <div className="faq-answer-content">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}
