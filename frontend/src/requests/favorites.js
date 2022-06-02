import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const getAllFavorite = async () => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/favorite/`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};


export const addFavorite = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/favorite/add`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteFavorite = async (id) => {
    try {
        const response = await axios.delete(`${$BASE_URL}/api/favorite/remove/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};