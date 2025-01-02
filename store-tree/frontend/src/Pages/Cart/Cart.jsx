import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, product_item, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const shippingFee = 35000;
  const totalAmount = getTotalCartAmount();
  const finalAmount = totalAmount === 0 ? 0 : totalAmount + shippingFee;

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="cart">
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
        {product_item.length > 0 ? (
          product_item.map((item) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{formatCurrency(item.price)}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>{formatCurrency(item.price * cartItem[item._id])}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>Giỏ hàng của bạn đang trống.</p>
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Tổng giá trị đơn hàng</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{formatCurrency(totalAmount)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí giao hàng</p>
              <p>{formatCurrency(totalAmount === 0 ? 0 : shippingFee)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng hóa đơn</p>
              <p>{formatCurrency(finalAmount)}</p>
            </div>
          </div>
          <hr />
          <button onClick={() => navigate('/order')}>THANH TOÁN</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã giảm giá, hãy nhập vào đây!</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Nhập mã giảm giá" />
              <button>Áp dụng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
