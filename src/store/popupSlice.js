import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
  type: "error", // Default type
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setPopup: (state, action) => {
      const { message, type = "error" } = action.payload;
      state.message = message;
      state.type = type;
      state.visible = true;
    },
    clearPopup: (state) => {
      state.message = "";
      state.type = "error";
      state.visible = false;
    },
  },
});

export const { setPopup, clearPopup } = popupSlice.actions;
export default popupSlice.reducer;
