import React from 'react';
import "./Header.css";
import { assets } from '../../assets/assets'

const Header = () => {
    return (
        <div className='header'>
            <img src={assets.header_img} alt="" />
            <h1>Hey Developer <img src={assets.hand_wave} alt=" " /></h1>
            <h2>Welcome to Our App</h2>
            <p>Lets start with quick product tour and we will have you up and running
                in the time
            </p>
            <button>Get started</button>
        </div>
    )
}

export default Header
