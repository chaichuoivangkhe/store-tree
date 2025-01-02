import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount,token,product_item,cartItems,url } = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data);
    
  },[data])
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
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="Họ" />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Tên" />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Địa chỉ email" />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Địa chỉ" />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="Thành phố" />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="Quận/Huyện" />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Mã bưu điện (ZIP code)" />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Quốc gia" />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder="Số điện thoại" />
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