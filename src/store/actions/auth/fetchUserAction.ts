import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";

export const fetchUserAction = createAsyncThunk(
    "user/fetchUser",
    async () => {
        try {

            const response = await apiClient.get(
                "/api/auth",
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data?.message);

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
)