import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: null,
    reducers: {
        addMessage: (state, action) => {
            return action.payload;
        },
        clearMessage: () => {
            return null;
        }
    }
})

export const { addMessage, clearMessage } = gptSlice.actions;
export default gptSlice.reducer