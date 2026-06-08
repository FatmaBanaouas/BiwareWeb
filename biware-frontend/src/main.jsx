import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // ← Ajoute cette ligne
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ← Ajoute ce wrapper */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)