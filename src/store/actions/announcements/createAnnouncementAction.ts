import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const createAnnouncementAction = createAsyncThunk(
    "course/createAnnouncement",
    async (data: {
        title: string;
        description: string;
        content: string;
        userRef: string;
    }) => {
       
        try {

            const response = await apiClient.post(
                "/api/course/announcement",
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

        } catch (error) {
            const e: any = error as AxiosError;
            throw new Error(e.response?.data.error || e.response?.data.message || e.message);
        }
    }
)