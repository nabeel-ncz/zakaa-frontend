import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const resetPasswordAction = createAsyncThunk(
    "user/resetPassword",
    async (data: { currentPassword: string, newPassword: string }) => {
        try {

            const response = await apiClient.post(
                "/api/auth/reset-password/",
                data,
                {
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