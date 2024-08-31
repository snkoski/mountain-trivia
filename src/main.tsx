import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DifficultyProvider } from './contexts/DifficultyProvider.tsx';
import { HighScoresProvider } from './contexts/HighScoresProvider.tsx';

export const DifficultyContext = createContext('');
export const HighScoresContext = createContext('');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HighScoresProvider>
      <DifficultyProvider>
        <App />
      </DifficultyProvider>
    </HighScoresProvider>
  </StrictMode>
);
