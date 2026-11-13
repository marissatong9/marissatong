import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import App from '../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])
