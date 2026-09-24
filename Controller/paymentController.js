const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Carts = require("../models/Cart");


// Create Razorpay Order
const createRazorpayOrder = async (req, res) => {

  try {

    const cart = await Carts.find();

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: "order_" + Date.now()
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Verify Razorpay Payment
const verifyRazorpayPayment = (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;


  const body =
    razorpay_order_id + "|" + razorpay_payment_id;


  const signature = crypto
    .createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    )
    .update(body)
    .digest("hex");


  if (signature === razorpay_signature) {

    res.json({
      success: true,
      message: "Payment Successful"
    });

  } else {

    res.json({
      success: false,
      message: "Payment Failed"
    });

  }

};


module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment
};

