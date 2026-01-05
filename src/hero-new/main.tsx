import React from 'react';
import ReactDOM from 'react-dom/client';
import IntroAnimation from '../components/ui/scroll-morph-hero';
import '../index.css'; // Tailwind CSS

const rootElement = document.getElementById('hero-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <IntroAnimation />
    </React.StrictMode>
  );
}
