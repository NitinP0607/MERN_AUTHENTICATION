import React, { useContext, useState } from 'react'
import "./Login.css"
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../../Context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify'


const Login = () => {

    const navigate = useNavigate();
    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

    const [state, setState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     axios.defaults.withCredentials=true;
     
    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();
           
            if(state==='Sign Up'){
                const {data} = await axios.post(backendUrl + '/api/auth/signup', {name,email,password},{ withCredentials: true });
                if(data.success){
                    toast.success("Sign Up successfully!");
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/')
                }
                else{
                    toast.error(data.message);
                }
            }
            else{
                 const {data} = await axios.post(backendUrl + '/api/auth/login', {email,password},{ withCredentials: true });
                if(data.success){
                    toast.success("Logged in successfully!");
                    setIsLoggedin(true);
                    getUserData();
                    navigate('/')
                }
                else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='login'>
            <div className='login-logo'>
                <img onClick={()=>navigate('/')} src={assets.logo} alt="" />
            </div>
            <div className="container">
                <div className="login-container">
                    <form onSubmit={onSubmitHandler}>
                        <div className='title-form'>
                            <h2>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
                            <p>{state === 'Sign Up' ? 'Create your Account' : 'Login to Your Account'}</p>
                        </div>
                        {state == 'Sign Up' && (
                            <div className='user-detail'>
                                <img src={assets.person_icon} alt="" />
                                <input
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    placeholder='Enter your full name'
                                    required />
                            </div>
                        )}
                        <div className='user-detail'>
                            <img src={assets.mail_icon} alt="" />
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder='Enter your email'
                                required />
                        </div>
                        <div className='user-detail'>
                            <img src={assets.lock_icon} alt="" />
                            <input
                            onChange={e=>setPassword(e.target.value)}
                            value={password} 
                            type="password" 
                            placeholder='Enter your password' 
                            required />
                        </div>

                        <p onClick={()=>navigate('/reset-password')} className='forget-password'>Forget password .?</p>
                        <button className='login-signup-btn'>{state}</button>
                    </form>
                    {state == 'Sign Up' ? (
                        <p onClick={() => setState('Login')}
                            className='already-account-login'>Already have an account
                                <span>   Login here</span></p>
                    )
                        :
                        (<p onClick={() => setState('Sign Up')}
                            className='already-account-login'>Don't have an account
                            <span> Sign Up here</span></p>)}


                </div>
            </div>
        </div>
    )
}

export default Login
