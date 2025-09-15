import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetStations } from "../API/stationAPI";

export const getStations = createAsyncThunk(
  "stations/getStations",
  async (_, { rejectWithValue }) => {
    const res = await fetchGetStations();
    if (res.success) return res;
    return rejectWithValue(res.errors || res.message);
  }
);

const stationSlice = createSlice({
  name: "stations",
  initialState: { stations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStations.fulfilled, (state, action) => {
        state.loading = false;
        state.stations = action.payload.data;
      })
      .addCase(getStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stations";
      });
  },
});

export default stationSlice.reducer;
