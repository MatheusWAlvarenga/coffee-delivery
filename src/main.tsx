// vendors
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

// router
import { Router } from './Router.tsx'
import { ShoppingContextProvider } from './contexts/ShoppingContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShoppingContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ShoppingContextProvider>
  </React.StrictMode>,
)
