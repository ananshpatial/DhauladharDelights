import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: [(items) => items.length > 0, "Order must contain items"]
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    address: {
      fullName: String,
      phone: String,
      line1: String,
      city: String,
      state: String,
      pincode: String
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "UPI", "Card"],
      default: "Cash on Delivery"
    },
    status: {
      type: String,
      enum: ["Placed", "Preparing", "Out for delivery", "Delivered", "Cancelled"],
      default: "Placed"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
