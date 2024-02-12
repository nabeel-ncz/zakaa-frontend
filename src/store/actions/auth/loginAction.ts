import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { LoginFormData } from "@/types";

export const loginAction = createAsyncThunk(
    "user/login",
    async (data: LoginFormData) => {
        try {

            const response = await apiClient.post(
                "/api/auth/login",
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