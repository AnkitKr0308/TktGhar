import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchGetAvailableTrains } from "../API/trainAPI";

export const getAvailableTrains = createAsyncThunk(
  "trains/getAvailableTrains",
  async ({ from, to, date }, { rejectWithValue }) => {
    try {
      const result = await fetchGetAvailableTrains({ from, to, date });

      if (result.success) {
        return result.trains;
      } else {
        return rejectWithValue(result.message);
      }
    } catch (e) {
      return rejectWithValue(e.message || "Unable to get available trains");
    }
  }
);

const trainSlice = createSlice({
  name: "trains",
  initialState: { trains: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.trains = action.payload;
      })
      .addCase(getAvailableTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch available trains";
      });
  },
});

export default trainSlice.reducer;
