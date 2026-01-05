import React from 'react';
import ReactDOM from 'react-dom/client';
import HeroContainer from './HeroContainer';

// Wait for DOM to be ready
const rootElement = document.getElementById('hero-root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HeroContainer />
    </React.StrictMode>
  );
} else {
  console.error('Hero root element not found. Make sure #hero-root exists in index.html');
}
