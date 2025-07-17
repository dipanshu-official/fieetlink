import { createSlice } from "@reduxjs/toolkit";
import { registerAsync } from "./globalAction";

const initialState = {
  user: [],
  
  loading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
     
  },
});

export const { clearError, showLoader, hideLoader } = globalSlice.actions;
export default globalSlice.reducer;
