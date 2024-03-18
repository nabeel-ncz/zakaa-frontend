import axios from "axios";

export const BASE_URL = 'http://zakaa.nabeel.cloud';

export const apiClient = axios.create({
    baseURL: BASE_URL
});
