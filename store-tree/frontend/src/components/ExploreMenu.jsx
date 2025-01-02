import React from 'react'
import '../css/ExploreMenu.css'
import { menu_list } from '../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'> 
      <h1>Danh mục sản phẩm</h1>
      <p className='explore-menu-text'>Biến ngôi nhà của bạn thành một ốc đảo xanh mát với những cây cảnh xinh đẹp, giúp cải thiện không khí và mang lại cảm giác bình yên.</p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
