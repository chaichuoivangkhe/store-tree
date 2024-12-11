import { createContext, useState } from 'react';
import { product_item } from '../assets/assets';
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({})
    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItem((prev => ({ ...prev, [itemId]: prev[itemId] + 1 })))
        }

    }
    const removeFromCart = (itemId) => {
        setCartItem((prev => ({ ...prev, [itemId]: prev[itemId] - 1 })))

    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfor = product_item.find((product) => product._id === item);
                totalAmount += itemInfor.price * cartItem[item];
            }

        }
        return totalAmount;
    }
    const contextValue = {
        product_item,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider