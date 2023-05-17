import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './input.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Scoreboard from './Scoreboard'
import Bakery from './Bakery'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/rebricek',
    element: <Scoreboard />,
  },
  {
    path: '/robot/:uuid',
    element: <Bakery />
  }
], { basename: process.env.PUBLIC_URL });


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
