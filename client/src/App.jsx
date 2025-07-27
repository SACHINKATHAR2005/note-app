
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/Register"
import HomePage from "./pages/home"
import ProtectedRoute from "./context/ProtectedRoute"


function App() {
  

  return (
    <>
      <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

         
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }/>
      </Routes>
    </>
  )
}

export default App
