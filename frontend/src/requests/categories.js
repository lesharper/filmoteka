import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const addCategory = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/category/add`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getAllCategory = async () => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/category/all`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${$BASE_URL}/api/category/remove/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};