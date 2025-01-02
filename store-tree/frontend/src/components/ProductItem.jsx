import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import '../css/ProductItem.css'
import { StoreContext } from '../context/StoreContext';
// Function to format price in VND
const formatVND = (amount) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
// Destructure props to get the values passed from parent component
const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext)
  return (
    <div className='product-item'>
      <div className='product-item-img-container'>
        <img className='product-item-image' src={url + "/images/" + image} alt={name} />
        {!cartItem[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
          : <div className='product-item-counter'>
            <img className='remove' onClick={() => removeFromCart(id)} src={assets.remove} alt="" />
            <p>{cartItem[id]}</p>
            <img className='plus' onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
          </div>
        }
      </div>
      <div className='product-item-infor'>
        <img className='product-item-name-rating' src={assets.rating} alt="" />
        <p>{name}</p>
      </div>
      <p className="product-item-desc">{description}</p>
      <p className='product-item-price'>{formatVND(price)}</p>
    </div>
  );
};

export default ProductItem;
