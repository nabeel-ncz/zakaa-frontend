import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { SignupFormData } from "@/types";
import { AxiosError } from "axios";

export const signupAction = createAsyncThunk(
    "user/signup",
    async (data: SignupFormData) => {
        try {

            const { confirmPassword, ...requestData } = data;

            const response = await apiClient.post(
                "/api/auth/signup",
                requestData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                return response.data.data;
            }

            throw new Error(response.data?.message);

        } catch (error: any) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.response?.data.message || e.message);
        }
    }
)