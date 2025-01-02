import { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [product_item, setProductItem] = useState([]);

    // Load cart data từ localStorage nếu có
    const loadCartDataFromStorage = () => {
        const savedCart = localStorage.getItem("cartItem");
        if (savedCart) {
            setCartItem(JSON.parse(savedCart));
        }
    };

    // Lưu cart vào localStorage mỗi khi có sự thay đổi
    const saveCartToStorage = (newCart) => {
        localStorage.setItem("cartItem", JSON.stringify(newCart));
    };

    const addToCart = async (itemId) => {
        setCartItem((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] ? prev[itemId] + 1 : 1 };
            saveCartToStorage(newCart); // Lưu giỏ hàng vào localStorage
            return newCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => {
            const newCart = { ...prev, [itemId]: prev[itemId] - 1 };
            if (newCart[itemId] <= 0) {
                delete newCart[itemId]; // Xóa sản phẩm nếu số lượng bằng 0
            }
            saveCartToStorage(newCart); // Lưu giỏ hàng vào localStorage
            return newCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfor = product_item.find((product) => product._id === item);
                if (itemInfor) {
                    totalAmount += itemInfor.price * cartItem[item];
                } else {
                    console.error(`Product with ID ${item} not found in product_item`);
                }
            }
        }
        return totalAmount;
    };

    const fetchTreeList = async () => {
        const response = await axios.get(url + "/api/tree/list");
        setProductItem(response.data.data);
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItem(response.data.cartData);
            saveCartToStorage(response.data.cartData);
            
        } catch (error) {
            if (error.response) {
                // Lỗi từ máy chủ
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            } else {
                // Lỗi khi gửi yêu cầu
                console.error("Error message:", error.message);
            }
            
        }
        
    };
    


    useEffect(() => {
        async function loadData() {
            await fetchTreeList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            loadCartDataFromStorage(); // Kiểm tra và khôi phục giỏ hàng từ localStorage
        }
        loadData();
    }, []);

    const contextValue = {
        product_item,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
