import express from "express";
import { createContactMessage, getContactMessages } from "../controllers/contactController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createContactMessage).get(protect, admin, getContactMessages);

export default router;
