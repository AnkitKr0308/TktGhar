import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./popupSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
  },
});

export default store;
