import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addfeed(state, action) {
            return action.payload;
        },
        removeFeed (state, action) {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        }
    }
})

export const { addfeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;