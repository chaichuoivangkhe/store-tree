import React from 'react'
import '../css/AppDown.css'
import { assets } from '../assets/assets'
const AppDown = () => {
  return (
    <div className = 'app-download' id='app-download'>
        <p>Trải Nghiệm Tốt Nhất Dánh Cho Bạn</p>
        <div className="app-download-platforms">
            <img className='play-store' src={assets.play_store_icon} alt="" />
            <img src={assets.app_store_icon} alt="" />
        </div>
    </div>
  )
}

export default AppDown
