import {Route, Routes} from "react-router-dom"
import './App.css'
import MainPage from "./pages/MainPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Layout from "./components/Layout.jsx"


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      
    </Routes>
    
  )
}

export default App
