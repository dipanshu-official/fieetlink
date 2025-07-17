import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
 
  return {
    Authorization: `Bearer ${token}`,
  };
};

// register user
export const registerAsync = createAsyncThunk(
  "global/register",
  async (userData, { rejectWithValue }) => {
    const { username, email, password, role } = userData;

    if (!username || !email || !password) {
      return rejectWithValue({ message: "All fields are required" });
    }

    try {
      const response = await axiosInstance.post("/auth/register", userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


// login user
export const loginAsync = createAsyncThunk(
  "global/login",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;

    if (!email || !password) {
      return rejectWithValue({ message: "Email and password are required" });
    }

    try {
      const response = await axiosInstance.post("/auth/login", userData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

// logout user
export const logoutAsync = createAsyncThunk(
  "global/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      return rejectWithValue({ message: "Logout failed" });
    }
  }
);
