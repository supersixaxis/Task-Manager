import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: "",
    type: ''
}


export const MessageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
      displayMessage: (state, action) => {
        state.viewMessage = true;
        state.content = action.payload.content;
        state.type = action.payload.type;
      },
      hideMessage: (state) => {
        state.viewMessage = false;
        state.content = "";
        state.type = "";
      },
    },
  });

export const {
    displayMessage,
    hideMessage,
} = MessageSlice.actions

export default MessageSlice.reducer