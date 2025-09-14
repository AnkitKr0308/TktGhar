import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegisterAccount } from "../API/authAPI";

const parseJSON = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const getInitialAuthState = () => {
  const token = localStorage.getItem("jwt_token");
  const user = parseJSON(localStorage.getItem("user"));

  return {
    loading: false,
    token: token || null,
    user,
    isAuthenticated: !!token,
    error: null,
  };
};

// Signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    const res = await fetchRegisterAccount(userData);
    if (res.success) return res; // return full response { success, message, data }
    return rejectWithValue(res.errors || res.message);
  }
);


// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    const res = await fetchLogin(userData);
    if (res.success) return res.data;
    return rejectWithValue(res.message);
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
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
        state.error = action.payload || "Signup failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;

        localStorage.setItem("jwt_token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
