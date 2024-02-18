import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const uploadCourseContent = createAsyncThunk(
    "course/uploadCourseContent",
    async (data: {
        courseThumbnail: File,
        trialVideo: File | null
    }) => {
        const formData = new FormData();
        formData.append("courseThumbnail", data.courseThumbnail);
        if (data.trialVideo) {
            formData.append("trialVideo", data.trialVideo);
        }
        try {

            const response = await apiClient.post(
                "/api/course/content/upload",
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