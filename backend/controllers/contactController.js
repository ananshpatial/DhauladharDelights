import asyncHandler from "express-async-handler";
import Contact from "../models/Contact.js";

export const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("All contact fields are required");
  }

  const contact = await Contact.create({ name, email, message });
  res.status(201).json({
    message: "Thanks for contacting Dhauladhar Delights",
    contact
  });
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});
