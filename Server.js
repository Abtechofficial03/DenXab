import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🪙 Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// 📦 Create payment order API
app.post("/api/payment/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount) {
    return res.status(400).json({ success: false, message: "Amount required" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert ₹ to paise
      currency: currency || "INR",
      receipt: `denxab_rcpt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("❌ Razorpay Order Error:", err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// ✅ Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});