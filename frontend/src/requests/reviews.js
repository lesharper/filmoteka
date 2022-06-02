import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const addReview = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/review/add`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getAllReviewByContent = async (id) => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/review/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteReview = async (id) => {
    try {
        const response = await axios.delete(`${$BASE_URL}/api/review/remove/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};