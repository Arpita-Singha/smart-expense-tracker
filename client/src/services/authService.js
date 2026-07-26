import api from "./api";

export const registerUser = async (data) => {
    const response = await api.post("/api/users/register", data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post("/api/users/login", data);
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/api/users/profile");
    return response.data;
};