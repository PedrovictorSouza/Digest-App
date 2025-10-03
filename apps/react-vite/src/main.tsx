import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './app';
import { enableMocking } from './testing/mocks';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

const startApp = async () => {
  if (import.meta.env.VITE_APP_ENABLE_API_MOCKING === 'true') {
    await enableMocking();
  }
  
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

startApp();
