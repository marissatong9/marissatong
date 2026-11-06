import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // load the styles
import App from './App.tsx' // load main component

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
