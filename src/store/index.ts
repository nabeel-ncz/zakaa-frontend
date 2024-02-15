import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/store/slices";
import { applicationReducer } from "./slices/applications";

export const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer
    }
});

export type TypeDispatch = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;;