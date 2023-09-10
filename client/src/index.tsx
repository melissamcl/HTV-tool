import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);
root.render(<App />);
