import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Splash from './pages/SplashScreen'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import CaptainHome from './pages/CaptainHome'
import UserLogout from './pages/UserLogout'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Splash/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp/>} />
        <Route path="/captainlogin" element={<CaptainLogin/>} />
        <Route path="/captainsignup" element={<CaptainSignup/>} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home/>
          </UserProtectedWrapper>
        } />
        <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
        }/>
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
        } />
        <Route path='captain-logout' element= {
          <CaptainProtectedWrapper>
            <CaptainLogout/>
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App