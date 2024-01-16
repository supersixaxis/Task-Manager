import { configureStore } from "@reduxjs/toolkit";
import messageReducer from './message/MessageSlice'
import tableReducer from './table/TableSlice';
import taskReducer from './task/TaskSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        table: tableReducer,
        task: taskReducer
    }
})