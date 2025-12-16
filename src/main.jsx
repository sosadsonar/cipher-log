import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import './styles/animations.css'
import './styles/scrollbars.css'
import './styles/sliders.css'
import './styles/components.css'

import './styles/hacker-effects.css'
import './styles/cute-effects.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)