import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Tạo một đơn hàng mới
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await newOrder.save();

    // Đặt lại giỏ hàng của người dùng
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Tạo line_items cho Stripe
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "vnd", // Thay đổi thành "vnd" (Việt Nam Đồng) hoặc loại tiền tệ phù hợp
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe yêu cầu giá trị bằng cent
      },
      quantity: item.quantity,
    }));

    // Thêm phí giao hàng
    line_items.push({
      price_data: {
        currency: "vnd",
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: 20000, // 20,000 VND
      },
      quantity: 1,
    });

    // Tạo phiên thanh toán Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Trả về URL phiên thanh toán
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Lỗi đặt hàng", error });
  }
};

export { placeOrder };
