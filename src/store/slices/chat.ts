import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null
}

interface chatState {
    loading: boolean;
    data: any;
    error: any;
}

const chatSlice = createSlice({
    name: "chat",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
       
    }
})

export const { } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;