import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#78350f',
          color: '#fef3c7',
          fontWeight: '600',
        },
        success: {
          iconTheme: {
            primary: '#fbbf24',
            secondary: '#78350f',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#78350f',
          },
        },
      }}
    />
  </React.StrictMode>,
)