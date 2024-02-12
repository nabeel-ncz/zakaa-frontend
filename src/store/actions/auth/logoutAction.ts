import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";

export const logoutAction = createAsyncThunk(
    "user/logout",
    async () => {
        try {

            const response = await apiClient.delete(
                "/api/auth/logout",
                {
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