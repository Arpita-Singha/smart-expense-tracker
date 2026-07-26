import User from "../models/User.js";

// =======================
// Get Profile
// =======================

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// =======================
// Update Profile
// =======================

export const updateProfile = async (req, res) => {

    try {

        const {
            fullName,
            phone,
            gender,
            occupation,
            address
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        user.fullName = fullName;
        user.phone = phone;
        user.gender = gender;
        user.occupation = occupation;
        user.address = address;

        await user.save();

        res.status(200).json({

            success: true,
            message: "Profile Updated Successfully",
            user

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// =======================
// Upload Profile Image
// =======================


export const uploadProfileImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,
                message: "No image uploaded"

            });

        }

        const imagePath =
            `/uploads/profile/${req.file.filename}`;

        const user = await User.findById(req.user.id);

        user.profileImage = imagePath;

        await user.save();

        res.status(200).json({

            success: true,
            profileImage: imagePath

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};