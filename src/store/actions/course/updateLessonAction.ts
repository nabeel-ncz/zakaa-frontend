import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const updateLessonAction = createAsyncThunk(
    "course/updateLesson",
    async (data: any) => {
       
        try {

            const formData = new FormData();
            Object.entries(data).forEach(([key]) => {
                formData.append(key, data[key]);
            });

            const response = await apiClient.put(
                "/api/course/lesson",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
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