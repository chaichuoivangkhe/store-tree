import React from 'react'
import '../css/Footer.css'
import { assets } from '../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Our mission is to make the world a greener place, starting with your home. Let's grow together!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook} alt="" />
                        <img src={assets.twitter}alt="" />
                        <img src={assets.linkedid} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+84 0829 072 787</li>
                        <li>contact@nhacuala.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2024 Nhacuala.com - All Right Reversed.</p>
        </div>
    )
}

export default Footer
