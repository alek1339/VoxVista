import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

interface AuthState {
  user: UserData | null;
  error: string | null;
}

interface UserData {
  username: string;
  password: string;
  isAdmin?: boolean;
}

interface RegistrationData extends UserData {
  password2: string;
}

const initialState: AuthState = {
  user: null,
  error: null,
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
  },
});

export const { setUser, setAuthError } = authSlice.actions;

export const registerUser =
  (userData: RegistrationData) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      } else {
        dispatch(setAuthError(null));
        dispatch(setUser(data.user));
      }
      return data;
    } catch (error) {
      dispatch(setAuthError("Registration failed. Please try again."));
      console.log("Registration failed", error);
    }
  };

export const loginUser =
  (userData: UserData) => async (dispatch: AppDispatch) => {
    console.log("userData", userData);
    try {
      const response = await fetch("http://localhost:5000/users/login", {
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
        window.location.href = "/";
      } else {
        dispatch(setAuthError(data.msg));
      }

      return data;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

// Token-based login action
export const tokenLogin = (token: string) => async (dispatch: AppDispatch) => {
  try {
    // Make an API request to your backend to login the user
    const response = await fetch("http://localhost:5000/users/current", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    dispatch(setUser(data));
  } catch (error) {
    console.error("Login failed", error);
    // TODO: Handle login failure (e.g., show an error message)
  }
};

// Logout action
export const logoutUser = () => async (dispatch: AppDispatch) => {
  Cookies.remove("authToken");
  dispatch(setUser(null));
};

export default authSlice.reducer;
