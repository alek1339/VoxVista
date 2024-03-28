import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../types/AppTypes";
import Cookies from "js-cookie";

import { AuthState, RegistrationData, LoginData } from "../../types/AuthTypes";

import { addNotification } from "./notificationSlice";

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

import { useTranslation } from "react-i18next";

const initialState: AuthState = {
  user: null,
  error: null,
  passwordResetEmailSent: false,
  registerSuccess: false,
  loginSuccess: false,
};

const duration: number = 2500;

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
  setLoginSuccess,
  clearLoginSuccess,
} = authSlice.actions;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: RegistrationData, { dispatch }) => {
    const { t } = useTranslation();
    const registrationSuccessMsg = t("registrationSuccess");
    const registrationFailed = t("registrationFailed");

    try {
      const data = await registerUserApi(userData);

      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      } else {
        dispatch(setAuthError(null));
        dispatch(setUser(data));

        dispatch(
          addNotification({
            id: Date.now(),
            message: registrationSuccessMsg,
            duration,
          })
        );
      }

      return data;
    } catch (error) {
      dispatch(setAuthError(registrationFailed));
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: LoginData, { dispatch }) => {
    const { t } = useTranslation();
    const loginFailed = t("loginFailed");
    const loginSuccessful = t("loginSuccessful");

    try {
      const data = await loginUserApi(userData);
      const { token } = data;

      if (token) {
        Cookies.set("authToken", token);
        dispatch(setAuthError(null));
        dispatch(setLoginSuccess(true));
        dispatch(tokenLogin(token));

        dispatch(
          addNotification({
            id: Date.now(),
            message: loginSuccessful,
            duration,
          })
        );

        setTimeout(() => {
          dispatch(clearLoginSuccess());
        }, duration);
      } else {
        dispatch(setAuthError(data.msg));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError(loginFailed));
      throw error;
    }
  }
);

// Token-based login action
export const tokenLogin = createAsyncThunk(
  "user/tokenLogin",
  async (token: string, { dispatch }) => {
    const { t } = useTranslation();
    const tokenLoginFailed = t("tokenLoginFailed");
    try {
      const data = await tokenLoginApi(token);
      dispatch(setUser(data));
      return data;
    } catch (error) {
      dispatch(setAuthError(tokenLoginFailed));
      throw error;
    }
  }
);

// Logout action
export const logoutUser = () => async (dispatch: AppDispatch) => {
  const { t } = useTranslation();
  const logoutSuccessful = t("logoutSuccessful");
  Cookies.remove("authToken");
  dispatch(setUser(null));
  dispatch(setAuthError(null));

  dispatch(
    addNotification({
      id: Date.now(),
      message: logoutSuccessful,
      duration,
    })
  );
};

// Action for sending a password reset email
export const sendPasswordResetEmail = createAsyncThunk(
  "user/sendPasswordResetEmail",
  async (email: string, { dispatch }) => {
    const { t } = useTranslation();
    const passwordResetError = t("passwordResetError");
    try {
      await sendPasswordResetEmailRequest(email)(dispatch);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailFailure(passwordResetError));
      throw error;
    }
  }
);

// Action for updating the user's information
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: User, { dispatch }) => {
    const { t } = useTranslation();
    const userUpdatedSuccessfully = t("userUpdatedSuccessfully");
    const errorUpdatingUser = t("errorUpdatingUser");

    try {
      const data = await updateUserApi(userData);

      if (data.ok) {
        dispatch(setUser(userData));

        dispatch(
          addNotification({
            id: Date.now(),
            message: userUpdatedSuccessfully,
            duration,
          })
        );
      } else {
        dispatch(setAuthError(errorUpdatingUser));
      }

      return data;
    } catch (error) {
      dispatch(setAuthError(errorUpdatingUser));
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
    const { t } = useTranslation();
    const passwordChangedSuccess = t("passwordChangedSuccess");
    const passwordChangeError = t("passwordChangeError");

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

        dispatch(
          addNotification({
            id: Date.now(),
            message: passwordChangedSuccess,
            duration,
          })
        );
      }

      return data;
    } catch (error) {
      dispatch(setAuthError(passwordChangeError));
      throw error;
    }
  }
);

// Action for deleting the user's account
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { dispatch }) => {
    const { t } = useTranslation();
    const deleteUserError = t("deleteUserError");

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
      dispatch(setAuthError(deleteUserError));
      throw error;
    }
  }
);

export default authSlice.reducer;
