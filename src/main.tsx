import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import DestinyCursor from './components/DestinyCursor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <DestinyCursor />
  </StrictMode>,
)
