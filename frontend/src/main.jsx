import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import RubricSideBar from "./components/RubricSideBar.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RubricSideBar/>
  </StrictMode>,
)
