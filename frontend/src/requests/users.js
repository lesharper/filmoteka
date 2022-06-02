import axios from "axios"
import {$BASE_URL} from "../constants";

axios.defaults.withCredentials = true;

export const registration = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/user/registration`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const authorization = async (data) => {
    try {
        const response = await axios.post(`${$BASE_URL}/api/user/login`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const authentication = async () => {
    const response = await axios.get(`${$BASE_URL}/api/user/check`)
    return response.data
};

export const updateProfile = async (data) => {
    try {
        const response = await axios.put(`${$BASE_URL}/api/user/update`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const updateBalance = async (data) => {
    try {
        const response = await axios.put(`${$BASE_URL}/api/user/balance`, data)
        return response.data
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    try {
        await axios.get(`${$BASE_URL}/api/user/logout`)
    } catch (error) {
        console.log(error)
    }
};