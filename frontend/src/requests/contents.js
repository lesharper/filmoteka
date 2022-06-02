import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;


export const addContents = async (data) => {
    try {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('director', data.director)
        formData.append('timing', data.timing)
        formData.append('release', data.release)
        formData.append('description', data.description)
        formData.append('country', data.country)
        formData.append('genre', data.genre)
        formData.append('age_rating', data.age_rating)
        formData.append('category_id', data.category_id)
        formData.append('trailer', data.trailer)
        formData.append('poster', data.poster[0])


        const response = await axios.post(`${$BASE_URL}/api/content/add`, formData)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const getAllContents = async () => {
    try {
        const response = await axios.get(`${$BASE_URL}/api/content/all`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const deleteContent = async (id) => {
    try {
        const response = await axios.delete(`${$BASE_URL}/api/content/remove/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
};
