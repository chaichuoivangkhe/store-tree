import userModel from "../models/userModel.js";

// add item to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData;

        if (!cartData) {
            cartData = {};
        }
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Đã thêm vào giỏ hàng" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi" });
    }
};

// remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = userData.cartData;

        if (cartData && cartData[req.body.itemId]) {
            if (cartData[req.body.itemId] > 1) {
                cartData[req.body.itemId] -= 1;
            } else {
                delete cartData[req.body.itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Đã xóa khỏi giỏ hàng" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi" });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      if (!user || !user.cartData) {
        return res.status(400).json({ message: "Cart data not found" });
      }
      res.json(user.cartData);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };


export { addToCart, removeFromCart, getCart };
