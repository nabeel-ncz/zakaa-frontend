import axios from "axios";
import { NODE_ENV } from "../constants";

export const BASE_URL = NODE_ENV === 'dev' ? 'http://localhost:5000' :  'https://zakaa.nabeel.cloud';

export const apiClient = axios.create({
    baseURL: BASE_URL
});
