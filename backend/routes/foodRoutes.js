import express from "express";
import {
  createFood,
  deleteFood,
  getFoodById,
  getFoods,
  updateFood
} from "../controllers/foodController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getFoods).post(protect, admin, createFood);
router.route("/:id").get(getFoodById).put(protect, admin, updateFood).delete(protect, admin, deleteFood);

export default router;
