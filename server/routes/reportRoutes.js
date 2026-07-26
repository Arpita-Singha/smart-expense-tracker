import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getTodayReport,
    getMonthReport,
    getYearReport
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/today", authMiddleware, getTodayReport);

router.get("/month", authMiddleware, getMonthReport);

router.get("/year", authMiddleware, getYearReport);

export default router;