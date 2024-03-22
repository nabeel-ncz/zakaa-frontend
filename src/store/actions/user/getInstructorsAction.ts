import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const getInstructorsAction = createAsyncThunk(
    "user/getInstructors",
    async (data: {
        page?:string | number;
        limit?: string | number;
    }) => {
        try {

            let query = "?";
            if(data?.page){
                query += `page=${data.page}&`;
            }
            if(data?.limit){
                query += `limit=${data?.limit}`;
            }

            const response = await apiClient.get(
                `/api/user/instructor${query}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data?.message);

        } catch (error) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.response?.data.message || e.message);
        }
    }
)