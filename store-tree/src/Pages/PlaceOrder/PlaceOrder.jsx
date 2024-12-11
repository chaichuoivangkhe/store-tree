import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin vận chuyển</p>
        <div className="multi-fields">
          <input type="text" placeholder='Họ' />
          <input type="text" placeholder='Tên' />
        </div>
        <input type="text" placeholder='Địa chỉ email' />
        <input type="text" placeholder='Địa chỉ' />
        <div className="multi-fields">
          <input type="text" placeholder='Thành phố' />
          <input type="text" placeholder='Quận/Huyện' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='zip code' />
          <input type="text" placeholder='Quốc gia' />
        </div>
        <input type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-order-right">
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
              <p><strong>Tổng hóa đơn</strong></p>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount() + 35000}đ</p>
            </div>
          </div>
          <button type="submit">THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
