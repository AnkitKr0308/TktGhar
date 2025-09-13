import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegisterAccount } from "../API/authAPI";

const getInitialAuthState = () => {
  const token = localStorage.getItem("jwt_token");
  const user = localStorage.getItem("user");

  return {
    loading: false,
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
    error: null,
  };
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetchRegisterAccount(userData);
      if (res.success) {
        return res.data;
      }

      if (res.errors) {
        return rejectWithValue({ errors: res.errors });
      }

      return rejectWithValue({ errors: { general: res.message } });
    } catch (e) {
      return rejectWithValue(e.message || "Signup failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetchLogin(userData);
      if (res.success) return res.data;
      return rejectWithValue(res.message);
    } catch (e) {
      return rejectWithValue(e.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  nameL: "auth",
  initialState: getInitialAuthState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload;
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("jwt_token", token);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
