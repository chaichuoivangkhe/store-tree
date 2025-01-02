import React, { useContext } from 'react';
import '../css/ProductDisplay.css';
import { StoreContext } from '../context/StoreContext';
import ProductItem from './ProductItem';

const ProductDisplay = ({ category }) => { // Destructure category as a prop
  const { product_item } = useContext(StoreContext);
  console.log(product_item);
  
  return (
    <div className='product-display' id='product-display'>
      <h2>Những cây cảnh bạn cần</h2>
      <div className="product-display-list">
        {product_item.map((item, index) => {
          // Sửa lỗi so sánh tại đây, dùng === thay vì =
          if (category === "All" || category === item.category) {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          // Nếu không thỏa mãn điều kiện thì không render gì cả
          return null;
        })}
      </div>
    </div>
  );
}

export default ProductDisplay;
