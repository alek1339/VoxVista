import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface UserState {
  user: UserData | null;
  error: string | null;
}

interface UserData {
  username: string;
  password: string;
}

interface RegistrationData extends UserData {
  password2: string;
}

const initialState: UserState = {
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
      // TODO: Handle registration failure (e.g., show an error message) and remove console.log
      console.error("Registration failed", error);
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

      if (data.msg && data.msg.length > 0) {
        dispatch(setAuthError(data.msg));
      } else {
        dispatch(setAuthError(null));
        dispatch(setUser(data.user));
      }
      return data;
    } catch (error) {
      console.error("Login failed", error);
    }
  };

export default authSlice.reducer;
