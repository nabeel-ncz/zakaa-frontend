import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";

export const findUsernameAction = createAsyncThunk(
    "user/findUsername",
    async (username: string) => {
        try {

            const response = await apiClient.get(
                `/api/auth/available/username/${username}`,
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