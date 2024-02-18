import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null
}

interface courseState {
    loading: boolean;
    data: any;
    error: any;
}

const courseSlice = createSlice({
    name: "course",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
       
    }
})

export const { } = courseSlice.actions;
export const courseReducer = courseSlice.reducer;