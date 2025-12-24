
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import  MainLayout from './layout/MainLayout'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './component/Dashboard'
import DashboardLayout from './layout/DashboardLayout'
import HabitForm from './pages/AddHabitPage'
import ProtectedRoute from './component/ProtectedRoute'

function App() {


  return (
    <>
    <BrowserRouter >
    <Routes>
      <Route element={ <MainLayout/>}>
           <Route path="/" element={<LandingPage/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
          
      </Route>
      <Route element={<DashboardLayout/>}>
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
             <Dashboard/>
          </ProtectedRoute>
         }/>
        <Route path="/add-habit" element={
          <ProtectedRoute>
             <HabitForm/>
          </ProtectedRoute>
         }/>
      </Route>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
