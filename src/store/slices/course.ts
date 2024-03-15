import { createSlice } from "@reduxjs/toolkit";
import { getAnnouncementsAction, getAnnouncementsByInstructorIdAction } from "../actions/announcements";

const INITIAL_STATE = {
    loading: false,
    data: null,
    instructorAnnouncements: null,
    announcements: null,
    error: null
}

interface courseState {
    loading: boolean;
    data: any;
    instructorAnnouncements: any;
    announcements: any;
    error: any;
}

const courseSlice = createSlice({
    name: "course",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAnnouncementsByInstructorIdAction.fulfilled, (state: courseState, action) => {
            state.instructorAnnouncements = action.payload?.data;
        })
        .addCase(getAnnouncementsAction.fulfilled, (state: courseState, action) => {
            state.announcements = action.payload?.data;
        });
    }
})

export const { } = courseSlice.actions;
export const courseReducer = courseSlice.reducer;