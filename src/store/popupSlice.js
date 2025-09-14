import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
  type: "error", // Default type
};

let nextToastId = 1;

const popupSlice = createSlice({
  name: "popup",
  initialState: { toasts: [] },
  reducers: {
    setPopup: (state, action) => {
      state.toasts.push({ id: nextToastId++, ...action.payload });
    },
    clearPopup: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearAll: (state) => {
      state.toasts = [];
    },
  },
});

export const { setPopup, clearPopup, clearAll } = popupSlice.actions;
export default popupSlice.reducer;
