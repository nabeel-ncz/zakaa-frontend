import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";

export const findEmailAction = createAsyncThunk(
    "user/findEmail",
    async (email: string) => {
        try {

            const response = await apiClient.get(
                `/api/auth/available/email/${email}`,
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