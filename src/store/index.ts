import { configureStore } from "@reduxjs/toolkit";
import {
    userReducer,
    applicationReducer,
    courseReducer
} from "@/store/slices";


export const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer,
        course: courseReducer
    }
});

export type TypeDispatch = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;;