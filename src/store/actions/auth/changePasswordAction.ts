import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const changePasswordAction = createAsyncThunk(
    "user/changePassword",
    async (data: { token: string, password: string }) => {
        try {

            const response = await apiClient.post(
                "/api/auth/forgot-password/",
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