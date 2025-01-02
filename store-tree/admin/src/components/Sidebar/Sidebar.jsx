import React from 'react'
import { assets } from '../../asset/asset'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add'className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Thêm sản phẩm</p>
        </NavLink>
        <NavLink to='/list'className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Danh sách sản phẩm</p>
        </NavLink>
        <NavLink to='/orders'className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders sản phẩm</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
