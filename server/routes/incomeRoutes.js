import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router.post("/", authMiddleware, addIncome);
router.get("/", authMiddleware, getIncome);
router.put("/:id", authMiddleware, updateIncome);
router.delete("/:id", authMiddleware, deleteIncome);

export default router;