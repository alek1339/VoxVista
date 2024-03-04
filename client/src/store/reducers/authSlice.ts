import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../../api/api";

import { AuthState, RegistrationData, UserData } from "../types/AuthTypes";

import { sendPasswordResetEmailRequest } from "../../api/sendPasswordResetEmailRequest";

const initialState: AuthState = {
  user: null,
  error: null,
  passwordResetEmailSent: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    sendPasswordResetEmailFailure: (state, action) => {
      state.error = action.payload;
    },
    sendPasswordResetEmailSuccess: (state) => {
      state.passwordResetEmailSent = true;
      state.error = null;
    },
  },
});

export const {
  setUser,
  setAuthError,
  sendPasswordResetEmailFailure,
  sendPasswordResetEmailSuccess,
} = authSlice.actions;

export const registerUser =
  (userData: RegistrationData) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
        console.log("Registration failed", data.msg);
      } else {
        dispatch(setAuthError(null));
        dispatch(setUser(data));
      }
      return data;
    } catch (error) {
      dispatch(setAuthError("Registration failed. Please try again."));
    }
  };

export const loginUser =
  (userData: UserData) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      const { token } = data;

      if (token) {
        Cookies.set("authToken", token);
        dispatch(setAuthError(null));
        window.location.href = "/";
      } else {
        dispatch(setAuthError(data.msg));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("Login failed. Please try again."));
      console.log("Login failed", error);
    }
  };

// Token-based login action
export const tokenLogin = (token: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/current`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    console.log("Token login data", data);
    dispatch(setUser(data));
  } catch (error) {
    console.error("Login failed", error);
  }
};

// Logout action
export const logoutUser = () => async (dispatch: AppDispatch) => {
  Cookies.remove("authToken");
  dispatch(setUser(null));
};

// Action for sending a password reset email
export const sendPasswordResetEmail =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      await sendPasswordResetEmailRequest(email)(dispatch);
    } catch (error) {
      dispatch(
        sendPasswordResetEmailFailure(
          "An error occurred while resetting the password."
        )
      );
    }
  };

export default authSlice.reducer;
