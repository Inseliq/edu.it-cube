import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './app/styles/global.css'

const redirectPath =
  sessionStorage.getItem(
    'spa-redirect',
  )

if (redirectPath) {
  sessionStorage.removeItem(
    'spa-redirect',
  )

  window.history.replaceState(
    null,
    '',
    redirectPath,
  )
}

createRoot(
  document.getElementById('root'),
).render(
  <StrictMode>
    <BrowserRouter
      basename={
        import.meta.env.BASE_URL
      }
    >
      <App />
    </BrowserRouter>
  </StrictMode>,
)