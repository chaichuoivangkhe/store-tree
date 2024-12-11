import React, { useContext, useState } from 'react'
import "../css/NavBar.css"
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
const NavBar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home")
    const {getTotalCartAmount} = useContext(StoreContext)
    return (
        <div className='navbar'>
            <Link to = '/'><img className='logo'src={assets.logo} alt='' /></Link>
            <ul className='navbar-menu'>
                <ul className='navbar-menu'>
                    <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                    <a href='#explore-menu' onClick={() => setMenu("product")} className={menu === "product" ? "active" : ""}>Products</a>
                    <a href='#app-download' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
                    <a href='#footer' onClick={() => setMenu("about-us")} className={menu === "about-us" ? "active" : ""}>About us</a>
                </ul>

            </ul>
            <div className="navbar-right">
                <img src={assets.search} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
    )
}

export default NavBar
