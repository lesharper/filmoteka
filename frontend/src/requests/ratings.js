import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const setupRating = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/rating/set`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getRatingByContent = async (id) => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/rating/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getAllRatings = async () => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/rating/all`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};