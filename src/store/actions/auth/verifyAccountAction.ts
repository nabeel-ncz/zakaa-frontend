import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";

export const verifyAccountAction = createAsyncThunk(
    "user/verifyAccount",
    async (data: { otp: string }) => {
        try {

            const response = await apiClient.post(
                "/api/auth/verify",
                data,
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