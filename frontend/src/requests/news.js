import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const addNews = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/news/add`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getAllNews = async () => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/news/all`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteNews = async (id) => {
    try {
        const response = await axios.delete(`${$BASE_URL}/api/news/remove/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};