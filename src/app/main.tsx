import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/styles/index.css'
import App from './App'
import { AppProviders } from '../providers/AppProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
