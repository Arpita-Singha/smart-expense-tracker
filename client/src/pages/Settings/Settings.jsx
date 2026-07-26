import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings({ darkMode, setDarkMode }) {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

   return (
        <div className="settings-container">

            <div className="settings-card">

                <h1>⚙ Settings</h1>

                <div className="setting-item">
                    <span>Dark Mode</span>

                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                    />
                </div>

                <div className="setting-item">
                    <span>Currency</span>

                    <select>
                        <option>₹ INR</option>
                        <option>$ USD</option>
                        <option>€ EUR</option>
                        <option>£ GBP</option>
                    </select>
                </div>

                <div className="setting-item">
                    <span>Notifications</span>

                    <input type="checkbox" />
                </div>

                <hr />

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Settings;