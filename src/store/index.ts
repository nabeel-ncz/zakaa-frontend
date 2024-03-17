import { configureStore } from "@reduxjs/toolkit";
import {
    userReducer,
    applicationReducer,
    courseReducer,
    announcementReducer,
    chatReducer
} from "@/store/slices";


export const store = configureStore({
    reducer: {
        user: userReducer,
        application: applicationReducer,
        course: courseReducer,
        announncement: announcementReducer,
        chat: chatReducer
    }
});

export type TypeDispatch = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;;