import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PokeCard } from './PokeCard.jsx'
import PokeContenedor from './PokeContenedor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PokeContenedor />
  </StrictMode>,
)
