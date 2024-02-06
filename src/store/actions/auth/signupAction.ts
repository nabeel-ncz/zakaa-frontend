import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { SignupFormData } from "@/types";

export const signupAction = createAsyncThunk(
    "user/signup",
    async (data: SignupFormData) => {
        try {

            const response = await apiClient.post(
                "/api/auth/signup",
                data,
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
            throw new Error(error.message);
        }
    }
)