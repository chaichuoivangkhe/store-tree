import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItem, product_item, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Sản phẩm</p>
          <p>Tên sản phẩm</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />
        <hr />
        {product_item.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}đ</p>
                  <p>{cartItem[item._id]}</p>
                  <p>{item.price * cartItem[item._id]}đ</p>
                  <p onClick={()=>removeFromCart(item._id)}className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Tổng giá trị đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{getTotalCartAmount()}đ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{getTotalCartAmount()===0?0:35000}đ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng hóa đơn</p>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+35000}đ</p>
            </div>
          </div>
          <hr />
          <button onClick={()=>navigate('/order')}>THANH TOÁN</button>
        </div>
        <div className="cart-promocode">
            <div>
              <p>Nếu bạn có mã giảm giá, hãy nhập vào đây!</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button>Gửi</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
