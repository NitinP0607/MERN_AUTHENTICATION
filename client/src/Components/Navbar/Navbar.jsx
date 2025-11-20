import React, { useContext } from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'



const Navbar = () => {
    const navigate = useNavigate();

    const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;


            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp', {
                email: userData.email
            });
            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.post(backendUrl + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setUserData(false)
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='navbar'>
            <img src={assets.logo} alt="" className='logo' />

            {userData ? (
                <div className='login-letter'>
                    <div className="login-wrapper">
                        {userData.name[0].toUpperCase()}

                        <div className="login-letter-options">
                            <ul>
                                {!userData.isAccountVerified && (
                                    <li onClick={sendVerificationOtp}>Verify Email</li>
                                )}

                                <li onClick={logout}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => navigate('/login')}
                    className='navbar-btn'
                >
                    Login
                    <img src={assets.arrow_icon} alt="" />
                </button>
            )}
        </div>

    )
}

export default Navbar
