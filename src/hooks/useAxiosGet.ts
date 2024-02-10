import { useState, useEffect } from "react";
import { apiClient } from "@/utils/axios";

export const useAxiosGet = (
    endpoint: string
) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(endpoint, { withCredentials: true });
                setData(response.data);
            } catch (error: any) {
                setError(error?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint]); 

    return { data, loading, error };
};