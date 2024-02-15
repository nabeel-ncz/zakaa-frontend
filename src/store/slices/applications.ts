import { createSlice } from "@reduxjs/toolkit";
import { getAllApplicationsAction } from "../actions/applications";

const INITIAL_STATE = {
    loading: false,
    data: null,
    error: null
}

interface applicationState {
    loading: boolean;
    data: any;
    error: any;
}

const applicationSlice = createSlice({
    name: "application",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllApplicationsAction.fulfilled, (state: applicationState, action) => {
            state.data = action.payload?.data;
        })
    }
})

export const { } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;