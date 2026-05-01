import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import ApplocalStorage from './sesionLocalStorage/AppLocalStoerage.jsx'
//import AppCookie from './cookie/AppCookie.jsx'
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProtectedRoute/>
  </StrictMode>,
)
