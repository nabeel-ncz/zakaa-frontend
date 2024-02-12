import { createSlice } from "@reduxjs/toolkit";
import {
    signupAction,
    loginAction,
    verifyAccountAction,
    fetchUserAction
} from "@/store/actions";
import { logoutAction } from "../actions/auth/logoutAction";

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
        },
        storeUserData: (state: userState, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //signup-user===============================
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
            //login-user=================================
            .addCase(loginAction.pending, (state: userState) => {
                state.loading = true;
            })
            .addCase(loginAction.fulfilled, (state: userState, action) => {
                state.loading = false;
                state.data = action.payload?.data;
                state.error = null;
            })
            .addCase(loginAction.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            })
            //verify-account=============================
            .addCase(verifyAccountAction.pending, (state: userState) => {
                state.loading = true;
            })
            .addCase(verifyAccountAction.fulfilled, (state: userState, action) => {
                state.loading = false;
                state.data = action.payload?.data;
                state.error = null;
            })
            .addCase(verifyAccountAction.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            })
            //fetch-user================================
            .addCase(fetchUserAction.pending, (state: userState) => {
                state.loading = true;
            })
            .addCase(fetchUserAction.fulfilled, (state: userState, action) => {
                state.loading = false;
                state.data = action.payload?.data;
                state.error = null;
            })
            .addCase(fetchUserAction.rejected, (state: userState, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.data = null;
            })
            //logout=============================
            .addCase(logoutAction.fulfilled, (state: userState, action) => {
                state.data = null;
            })
    }
})

export const {
    tempSignupData,
    storeUserData
} = userSlice.actions;
export const userReducer = userSlice.reducer;