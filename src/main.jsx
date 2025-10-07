import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importación global de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LandingPage from './presentation/pages/LandingPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>
)