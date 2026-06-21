import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, address, paymentMethod } = req.body;

  if (!items?.length) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const order = await Order.create({
    userId: req.user._id,
    items,
    totalAmount,
    address,
    paymentMethod
  });

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { userId: req.user._id };
  const orders = await Order.find(filter)
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("userId", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const ownsOrder = order.userId._id.toString() === req.user._id.toString();
  if (!ownsOrder && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not allowed to view this order");
  }

  res.json(order);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status || order.status;
  const updated = await order.save();
  res.json(updated);
});
