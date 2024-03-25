import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../types/AuthTypes";
import Cookies from "js-cookie";

import { AuthState, RegistrationData, LoginData } from "../../types/AuthTypes";

import {
  registerUserApi,
  loginUserApi,
  tokenLoginApi,
  updateUserApi,
  changePasswordApi,
  deleteUserApi,
} from "../../api/authService";

import { sendPasswordResetEmailRequest } from "../../api/sendPasswordResetEmailRequest";

import { User } from "../../types/User";

const initialState: AuthState = {
  user: null,
  error: null,
  passwordResetEmailSent: false,
  registerSuccess: false,
  loginSuccess: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
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
    setRegisterSuccess: (state, action: PayloadAction<boolean>) => {
      state.registerSuccess = action.payload;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    setLoginSuccess: (state, action: PayloadAction<boolean>) => {
      state.loginSuccess = action.payload;
    },
    clearLoginSuccess: (state) => {
      state.loginSuccess = false;
    },
  },
});

export const {
  setUser,
  setAuthError,
  sendPasswordResetEmailFailure,
  sendPasswordResetEmailSuccess,
  setRegisterSuccess,
  clearRegisterSuccess,
  setLoginSuccess,
  clearLoginSuccess,
} = authSlice.actions;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: RegistrationData, { dispatch }) => {
    try {
      const data = await registerUserApi(userData);

      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      } else {
        dispatch(setAuthError(null));
        dispatch(setRegisterSuccess(true));
        dispatch(setUser(data));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("Registration failed. Please try again."));
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: LoginData, { dispatch }) => {
    try {
      const data = await loginUserApi(userData);
      const { token } = data;

      if (token) {
        Cookies.set("authToken", token);
        dispatch(setAuthError(null));
        dispatch(setLoginSuccess(true));
        dispatch(tokenLogin(token));
      } else {
        dispatch(setAuthError(data.msg));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("Login failed. Please try again."));
      throw error;
    }
  }
);

// Token-based login action
export const tokenLogin = createAsyncThunk(
  "user/tokenLogin",
  async (token: string, { dispatch }) => {
    try {
      const data = await tokenLoginApi(token);
      dispatch(setUser(data));
      return data;
    } catch (error) {
      dispatch(setAuthError("Token login failed. Please try again."));
      throw error;
    }
  }
);

// Logout action
export const logoutUser = () => async (dispatch: AppDispatch) => {
  Cookies.remove("authToken");
  dispatch(setUser(null));
};

// Action for sending a password reset email
export const sendPasswordResetEmail = createAsyncThunk(
  "user/sendPasswordResetEmail",
  async (email: string, { dispatch }) => {
    try {
      await sendPasswordResetEmailRequest(email)(dispatch);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(
        sendPasswordResetEmailFailure(
          "An error occurred while resetting the password."
        )
      );
      throw error;
    }
  }
);

// Action for updating the user's information
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: User, { dispatch }) => {
    try {
      const data = await updateUserApi(userData);

      if (data.ok) {
        dispatch(setUser(userData));
      } else {
        dispatch(setAuthError("An error occurred while updating the user."));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("An error occurred while updating the user."));
      throw error;
    }
  }
);

// Action for chenging the user's password
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    requestData: { oldPassword: string; newPassword: string; id: string },
    { dispatch }
  ) => {
    try {
      const data = await changePasswordApi(
        requestData.oldPassword,
        requestData.newPassword,
        requestData.id
      );
      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      }
      if (data.ok) {
        dispatch(setAuthError(null));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("An error occurred while changing the password."));
      throw error;
    }
  }
);

// Action for deleting the user's account
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { dispatch }) => {
    try {
      const data = await deleteUserApi(id);
      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      }
      if (data.ok) {
        Cookies.remove("authToken");
        dispatch(setUser(null));
        window.location.href = "/";
      }

      return data;
    } catch (error) {
      dispatch(setAuthError("An error occurred while deleting the user."));
      throw error;
    }
  }
);

export default authSlice.reducer;
