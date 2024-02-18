import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const uploadLessonContent = createAsyncThunk(
    "course/uploadLessonContent",
    async (data: {
        lessonThumbnail: File,
        lessonVideo: File,
        lessonAttachment: File | null
    }) => {
        const formData = new FormData();

        formData.append("lessonThumbnail", data.lessonThumbnail);
        formData.append("lessonVideo", data.lessonVideo);
        if(data.lessonAttachment){
            formData.append("lessonAttachment", data.lessonAttachment);
        }
       
        try {

            const response = await apiClient.post(
                "/api/course/lesson/upload",
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