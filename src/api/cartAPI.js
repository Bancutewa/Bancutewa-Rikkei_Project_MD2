import axios from "axios";
import { API } from "../constants/hostAPI/hostAPI";

const catchError = (error, errorMessage) => {
    console.error(`${errorMessage}:`, error);
    throw error;
};

export const fetchCartsUserApi = async () => {
    try {
        const response = await axios.get(API.CART);
        return response.data;
    } catch (error) {
        return catchError(error, "Error fetching Carts data");
    }
};

export const fetchCartUserApiByUserName = async (username) => {
    try {
        const response = await axios.get(`${API.CART}/?user=${username}`);
        return response.data
    } catch (error) {
        return catchError(error, "Error fetching Cart User data");
    }
};

export const CreateCartUserAPI = async (usercart_create) => {
    try {
        const response = await axios.post(API.CART, usercart_create);
        return response.data;
    } catch (error) {
        return catchError(error, "Error creating user cart");
    }
};

export const UpdateCartUserAPI = async (userCart_update) => {
    try {
        const response = await axios.put(`${API.CART}/${userCart_update.id}`, {
            user: userCart_update.user,
            products: userCart_update.products
        });
        return response.data;
    } catch (error) {
        return catchError(error, "Error updating user cart");
    }
};
