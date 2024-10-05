import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import RubricForm from "./components/RubricForm.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RubricForm/>
  </StrictMode>,
)
