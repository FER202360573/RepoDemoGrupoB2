import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import ApplocalStorage from './sesionLocalStorage/AppLocalStoerage.jsx'
import AppCookie from './cookie/AppCookie.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCookie/>
  </StrictMode>,
)
