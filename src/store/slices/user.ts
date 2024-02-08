import { createSlice } from "@reduxjs/toolkit";
import { signupAction } from "@/store/actions";

const INITIAL_STATE = {
    loading: false,
    data: null,
    temp: null,
    error: null
}

interface userState {
    loading: boolean;
    data: any;
    temp: any;
    error: any;
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        tempSignupData: (state: userState, action) => {
            state.temp = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //signup-user
            .addCase(signupAction.pending, (state: userState) => {
                state.loading = true;
            })
            .addCase(signupAction.fulfilled, (state: userState, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(signupAction.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            })
    }
})

export const {
    tempSignupData
} = userSlice.actions;
export const userReducer = userSlice.reducer;