import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/utils/axios";
import { AxiosError } from "axios";

export const getAnnouncementsByInstructorIdAction = createAsyncThunk(
    "course/getAnnouncementsByInstructorId",
    async (data: {
        instructorId: string;
    }) => {
       
        try {

            const response = await apiClient.get(
                `/api/course/announcement/instructor/${data.instructorId}`,
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