import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'
import ResetPassword from './Pages/ResetPassword/ResetPassword'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<VerifyEmail />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
