import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import Home from "./components/Home.jsx";
import RubricBuilder from "./components/RubricBuilder.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RubricBuilder/>
  </StrictMode>,
)
