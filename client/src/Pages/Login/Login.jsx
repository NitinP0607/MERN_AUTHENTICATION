import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Login = () => {

    const [state, setState] = useState('Sign Up')

  return (
    <div className='login'>
      <div className='login-logo'>
        <img src={assets.logo} alt="" />
      </div>
      <div>
        <h2>{state==='Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p>{state==='Sign Up' ? 'Create your Account' : 'Login to Your Account'}</p>
      </div>
    </div>
  )
}

export default Login
