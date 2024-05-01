import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppRouter from './routes/index.jsx'
import { ThemeProvider } from "@material-tailwind/react"
import { MaterialTailwindControllerProvider } from "./context";
import "../public/css/tailwind.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <MaterialTailwindControllerProvider>
        <AppRouter />
      </MaterialTailwindControllerProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
