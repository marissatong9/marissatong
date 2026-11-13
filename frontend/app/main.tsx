import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // load the styles
import { RouterProvider } from 'react-router'
import { router } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
