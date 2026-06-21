import asyncHandler from "express-async-handler";
import Food from "../models/Food.js";

export const getFoods = asyncHandler(async (req, res) => {
  const { search = "", category = "All" } = req.query;
  const query = {
    name: { $regex: search, $options: "i" }
  };

  if (category !== "All") {
    query.category = category;
  }

  const foods = await Food.find(query).sort({ createdAt: -1 });
  res.json(foods);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    res.status(404);
    throw new Error("Food item not found");
  }
  res.json(food);
});

export const createFood = asyncHandler(async (req, res) => {
  const food = await Food.create(req.body);
  res.status(201).json(food);
});

export const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!food) {
    res.status(404);
    throw new Error("Food item not found");
  }

  res.json(food);
});

export const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findByIdAndDelete(req.params.id);
  if (!food) {
    res.status(404);
    throw new Error("Food item not found");
  }
  res.json({ message: "Food item deleted" });
});
