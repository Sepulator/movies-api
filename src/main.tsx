import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './assets/blades.min.css';
import './assets/index.css';
import { App } from './components/app';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
