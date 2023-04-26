import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './input.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Scoreboard from './Scoreboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/scoreboard',
    element: <Scoreboard />,
  }
], { basename: process.env.PUBLIC_URL });


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
