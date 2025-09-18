import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importación global de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import ViewNews from './presentation/view/ViewNews';
import GestiondeUsuarios from './presentation/view/GestiondeUsuaios';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css"></link>
    <GestiondeUsuarios/>
  </StrictMode>
)
