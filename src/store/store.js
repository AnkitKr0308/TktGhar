import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import popupReducer from "./popupSlice";
import stationReducer from "./stationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    station: stationReducer,
  },
});

export default store;
