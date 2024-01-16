import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './message/MessageSlice'


export const store = configureStore({
    reducer: {
        message: messageReducer
    }
})