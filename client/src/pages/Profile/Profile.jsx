import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Profile.css";

function Profile() {

    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(false);

    const [imageLoading, setImageLoading] = useState(false);

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        occupation: "",
        address: "",
        profileImage: "",
        createdAt: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/users/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Profile Data:", res.data.user);

            setUser(res.data.user);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    // Upload Image

    const uploadImage = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("image", file);

        try {

            setImageLoading(true);

            const res = await axios.post(

                "http://localhost:5000/api/users/profile/upload",

                formData,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            setUser({

                ...user,

                profileImage:
                    "http://localhost:5000" + res.data.profileImage

            });

            toast.success("Profile image uploaded");

        } catch (err) {

            console.log(err);

            toast.error("Image upload failed");

        }

        setImageLoading(false);

    };

    // Update Profile

    const updateProfile = async () => {

        try {

            setLoading(true);

            await axios.put(

                "http://localhost:5000/api/users/profile",

                {

                    fullName: user.fullName,

                    phone: user.phone,

                    gender: user.gender,

                    occupation: user.occupation,

                    address: user.address

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Profile Updated");

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to update profile");

        }

        setLoading(false);

    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                <h1>👤 My Profile</h1>

                <img
                    src={
                        user.profileImage
                        ? `http://localhost:5000${user.profileImage}`
                        : "https://i.pravatar.cc/250"
                    }
                    alt="Profile"
                    className="profile-image"
                    onError={(e) => {
                        console.log("Failed image URL:", e.target.src);
                        e.target.src = "https://i.pravatar.cc/250";
                    }}
                />

                <input

                    type="file"

                    accept="image/*"

                    onChange={uploadImage}

                />

                {imageLoading && (

                    <p>Uploading image...</p>

                )}

                <div className="input-group">

                    <label>Full Name</label>

                    <input

                        name="fullName"

                        value={user.fullName}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label>Email</label>

                    <input

                        value={user.email}

                        disabled

                    />

                </div>

                <div className="input-group">

                    <label>Phone</label>

                    <input

                        name="phone"

                        value={user.phone}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label>Gender</label>

                    <select

                        name="gender"

                        value={user.gender}

                        onChange={handleChange}

                    >

                        <option value="">Select</option>

                        <option>Male</option>

                        <option>Female</option>

                        <option>Other</option>

                    </select>

                </div>

                <div className="input-group">

                    <label>Occupation</label>

                    <input

                        name="occupation"

                        value={user.occupation}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label>Address</label>

                    <textarea

                        rows="3"

                        name="address"

                        value={user.address}

                        onChange={handleChange}

                    />

                </div>

                <div className="input-group">

                    <label>Member Since</label>

                    <input

                        disabled

                        value={
                            user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : ""
                        }

                    />

                </div>

                <button

                    className="save-btn"

                    onClick={updateProfile}

                >

                    {loading ? "Saving..." : "Save Changes"}

                </button>

            </div>

        </div>

    );

}

export default Profile;