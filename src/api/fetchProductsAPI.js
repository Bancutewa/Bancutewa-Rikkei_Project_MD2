import axios from "axios";
import { API } from "../constants/hostAPI/hostAPI";
// cal API
export const fetchProductsApi = async () => {
    try {
        const response = await axios.get(API.PRODUCTS);
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

export const fetchProductAPIByID = async (id) => {
    try {
        const response = await axios.get(`${API.PRODUCTS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

export const fetchProductsAPIByCategory = async (category) => {
    try {
        const products = await fetchProductsApi();
        const filteredProducts = products.filter((product) => product.category === category);
        return filteredProducts;
    } catch (error) {
        console.error("Error fetching Products data:", error);
        throw error; // Re-throw the error so that the calling code can handle it
    }
};

// Create category
// category_create => {name: ""}
export const CreateProductsAPI = async (product_create) => {
    const response = await axios.post(API.PRODUCTS, product_create);
    return response.data;
};


// Update category
// category_update => {id: xx, name: ""}
export const UpdateProductsAPI = async (product_update) => {
    const response = await axios.put(`${API.PRODUCTS}/${product_update.id}`, {
        name: product_update.name,
        img: product_update.img,
        category: product_update.category,
        price: product_update.price,
        quantity: product_update.quantity,
        sale: product_update.sale
    });
    return response.data;
};

// Delete category
export const delProductById = async (category_id) => {
    await axios.delete(`${API.PRODUCTS}/${category_id}`);
};

