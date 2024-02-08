import axios from "axios";

export const BASE_URL = 'http://localhost:5000';

export const apiClient = axios.create({
    baseURL: BASE_URL
});
