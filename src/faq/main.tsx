import React from "react";
import ReactDOM from "react-dom/client";
import FAQSection from "@/components/ui/faq-section";

const rootElement = document.getElementById("faq-root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <FAQSection />
    </React.StrictMode>
  );
} else {
  console.error("FAQ root element not found. Make sure #faq-root exists in the HTML.");
}
