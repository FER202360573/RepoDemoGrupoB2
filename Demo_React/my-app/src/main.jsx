import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Tarjeta from './componentes/Tarjeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tarjeta
    imagen="tlacua"
    nombre="Zarigüeya"
    cientifico="Didelphis marsupialis"
    texto="Este marsupial se distribuye desde el este de México hasta el norte de Brasil, Bolivia y Perú en Sudamérica."
    />
   
  </StrictMode>,
)
