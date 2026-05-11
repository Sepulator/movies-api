import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app';

import './assets/shadcn-classless.css';
import './assets/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
