import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './message/MessageSlice'
import tableReducer from './table/TableSlice';


export const store = configureStore({
    reducer: {
        message: messageReducer,
        table: tableReducer,
    }
})