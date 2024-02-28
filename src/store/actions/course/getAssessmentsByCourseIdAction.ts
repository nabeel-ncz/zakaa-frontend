import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const getAssessmentsByCourseIdAction = createAsyncThunk(
    "course/getAssessmentsByCourseId",
    async (data: {
        courseId: string
    }) => {
       
        try {

            const response = await apiClient.get(
                `/api/course/assessment/course/${data.courseId}`,
                {
                    headers: { "Content-Type": "application/json" },
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