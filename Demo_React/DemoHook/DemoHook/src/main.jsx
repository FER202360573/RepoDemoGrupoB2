import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Demo from './UsoUseState.jsx'
import Pokemon from './Pokemon.jsx'
import {DemoEffect}  from './UsoUseEffect.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokemon />
  </StrictMode>
)
