import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const verifyInstructorAction = createAsyncThunk(
    "user/verifyInstructor",
    async (token: string) => {
        try {

            const response = await apiClient.get(
                `/api/user/instructor/verify?token=${token}`,
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