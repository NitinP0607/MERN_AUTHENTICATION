import React from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
import {useNavigate} from 'react-router-dom'
 

const Navbar = () => {
    const navigate = useNavigate();

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo'/>
      <button onClick={()=>navigate('/login')}
      className='navbar-btn'>Login
        <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  )
}

export default Navbar
