import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Path from './routes/index'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Path/>
  </StrictMode>,
)
