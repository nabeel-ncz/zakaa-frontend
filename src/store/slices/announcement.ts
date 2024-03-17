import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null
}

interface announcementState {
    loading: boolean;
    data: any;
    error: any;
}

const announcementSlice = createSlice({
    name: "announcement",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
       
    }
})

export const { } = announcementSlice.actions;
export const announcementReducer = announcementSlice.reducer;