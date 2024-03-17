import { useState } from "react";
import { apiClient } from "@/utils/axios";

export const useAxiosGetOnClick = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (endpoint: string) => {
        try {
            setLoading(true);
            const response = await apiClient.get(endpoint, { withCredentials: true });
            setData(response.data);
        } catch (error: any) {
            setError(error?.message);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, data, loading, error };
};

export interface IUseAxiosGetOnClick {
    fetchData: (endpoint: string) => Promise<void>;
    data: any;
    loading: boolean;
    error: any;
}
