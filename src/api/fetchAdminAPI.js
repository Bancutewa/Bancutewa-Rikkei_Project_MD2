import axios from "axios";
import { API } from "../constants/hostAPI/hostAPI";
// cal API
export const fetchAdminApi = async () => {

    try {
        const response = await axios.get(API.ADMIN);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

export const fetchAdminApiByID = async (id) => {
    try {
        const response = await axios.get(`${API.ADMIN}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching User data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

