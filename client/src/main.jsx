
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContectProvider } from './context/context'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <ContectProvider>
<App />
 </ContectProvider>
 
 </BrowserRouter>
    
  
)
