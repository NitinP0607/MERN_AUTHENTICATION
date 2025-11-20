import React, { useContext } from 'react';
import "./Header.css";
import { assets } from '../../assets/assets'
import { AppContent } from '../../Context/AppContext';

const Header = () => {

    const {userData} = useContext(AppContent)

    return (
        <div className='header'>
            <img src={assets.header_img} alt="" />
            <h1>Hey {userData ? userData.name : 'Developer'}<img src={assets.hand_wave} alt=" " /></h1>
            <h2>Welcome to Our App</h2>
            <p>Lets start with quick product tour and we will have you up and running
                in the time
            </p>
            <button>Get started</button>
        </div>
    )
}

export default Header
