import {Route, Routes} from "react-router-dom"
import './App.css'
import MainPage from "./pages/MainPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Layout from "./components/Layout.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import axios from "axios"
import { UserContextProvider } from "./UserContext.jsx"
import AccountPage from "./pages/AccountPage.jsx"
import PlacesPage from "./pages/PlacesPage.jsx"
import PlacesForm from "./pages/PlacesForm.jsx"

axios.defaults.baseURL='http://localhost:4040'
axios.defaults.withCredentials = true;
function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
        </Route>
        
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
