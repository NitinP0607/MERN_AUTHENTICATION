import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Services from './Pages/Services/Services'
import About from './Pages/About/About'
import Careers from './Pages/Career/Careers'
import Contact from './Pages/Contact/Contact'
import FrontendReadMore from './Components/FrontendReadMore/FrontendReadMore'
import BackendReadMore from './Components/BackendReadMore/BackendReadMore'
import AppDevreadMore from './Components/AppDevelopementReadMore/AppDevreadMore'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/about' element={<About />} />
        <Route path='/careers' element={<Careers />} />
         <Route path='/contact' element={<Contact />} />
         <Route path='/services/frontend-read-more' element={<FrontendReadMore />} />
         <Route path='/services/backend-read-more' element={<BackendReadMore />} />
         <Route path='/services/appdevelopment-read-more' element={<AppDevreadMore />} />
      </Routes>
    </div>
  )
}

export default App
