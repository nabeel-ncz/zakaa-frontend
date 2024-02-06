import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/store/slices";

export const store = configureStore({
    reducer: {
        user: userReducer,
    }
});

export type TypeDispatch = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;;