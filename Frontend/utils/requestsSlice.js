import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
       return state.filter(r => r._id !== action.payload);
    },
  },
});

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
