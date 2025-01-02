import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  const shippingFee = 35000;
  const totalAmount = getTotalCartAmount();
  const finalAmount = totalAmount === 0 ? 0 : totalAmount + shippingFee;

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Thông tin vận chuyển</p>
        <div className="multi-fields">
          <input type="text" placeholder="Họ" />
          <input type="text" placeholder="Tên" />
        </div>
        <input type="email" placeholder="Địa chỉ email" />
        <input type="text" placeholder="Địa chỉ" />
        <div className="multi-fields">
          <input type="text" placeholder="Thành phố" />
          <input type="text" placeholder="Quận/Huyện" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Mã bưu điện (ZIP code)" />
          <input type="text" placeholder="Quốc gia" />
        </div>
        <input type="tel" placeholder="Số điện thoại" />
      </div>

      <div className="place-order-right">
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
              <p>{totalAmount === 0 ? formatCurrency(0) : formatCurrency(shippingFee)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p><strong>Tổng hóa đơn</strong></p>
              <p>{formatCurrency(finalAmount)}</p>
            </div>
          </div>
          <button type="submit">THANH TOÁN</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
