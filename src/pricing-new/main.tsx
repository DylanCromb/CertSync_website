import React from 'react';
import ReactDOM from 'react-dom/client';
import { Pricing } from '@/components/ui/pricing-cards';
import './index.css'; // Import Tailwind CSS for pricing

// Mount the pricing component
const rootElement = document.getElementById('pricing-root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Pricing />
    </React.StrictMode>
  );
}
