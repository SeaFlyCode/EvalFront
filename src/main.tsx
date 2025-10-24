import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

// Gestionnaire d'erreurs globales non capturées
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse non gérée rejetée:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('Erreur globale non gérée:', event.error);
});

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    throw new Error('Élément root introuvable dans le DOM');
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err) {
  console.error('Erreur fatale lors de l\'initialisation:', err);
  document.body.innerHTML = `
    <div style="padding: 2rem; text-align: center; color: #ef4444;">
      <h1>Erreur lors du chargement de l'application</h1>
      <p>${err instanceof Error ? err.message : 'Erreur inconnue'}</p>
    </div>
  `;
}
