import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

import {
    getProfile,
    updateProfile,
    uploadProfileImage
} from "../controllers/profileController.js";

const router = express.Router();

// Get logged-in user's profile
router.get(
    "/profile",
    authMiddleware,
    getProfile
);

// Update profile details
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

// Upload profile image
router.post(
    "/profile/upload",
    authMiddleware,
    upload.single("image"),
    uploadProfileImage
);

export default router;