import axios from "axios";
import { API } from "../constants/hostAPI/hostAPI";
// cal API
export const fetchUsersApi = async () => {
    try {
        const response = await axios.get(API.USERS);
        return response.data;
    } catch (error) {
        console.error("Error fetching Users data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

export const fetchUserAPIByID = async (id) => {
    try {
        const response = await axios.get(`${API.USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching User data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

// Create category
// category_create => {name: ""}
export const CreateUserAPI = async (user_create) => {
    const response = await axios.post(API.USERS, user_create);
    return response.data;
};


// Update category
// category_update => {id: xx, name: ""}
export const UpdateUserAPI = async (user_update) => {
    const response = await axios.put(`${API.USERS}/${user_update.id}`, {
        username: user_update.username,
        email: user_update.email,
        password: user_update.password,
        role: "user",
    });
    return response.data;
};

// Delete category
export const DeleteUserById = async (user_id) => {
    await axios.delete(`${API.USERS}/${user_id}`);
};

