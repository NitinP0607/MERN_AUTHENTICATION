import React, { useContext, useEffect } from 'react'
import "./VerifyEmail.css"
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContent } from '../../Context/AppContext'
import { toast } from 'react-toastify'

const VerifyEmail = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)

  const inputRefs = React.useRef([

  ])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }


  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const Otp = otpArray.join('')
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', {
        Otp,
        email: userData.email
      })
      if (data.success) {
        toast.success(data.message)
        getUserData();
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.success(error.message)
    }
  }
  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='email-verify'>
      <img src={assets.logo} alt="" className="verify-logo" onClick={() => navigate('/')} />
      <div className='email-verify-container'>
        <form onSubmit={onSubmitHandler} className='email-verify-form'>
          <h1>Verify OTP</h1>
          <p>Enter the 6 digit OTP on you email id.</p>
          <div className='otp-inputs' onPaste={handlePaste}>
            {Array(6).fill(0).map((_, index) => (
              <input type="text" maxLength='1' key={index} required
                ref={e => inputRefs.current[index] = e}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}

              />

            ))}

          </div>
          <button className='verify-email-btn'>Verify Email</button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
