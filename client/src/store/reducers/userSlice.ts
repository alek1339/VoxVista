import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store"; // Update the path accordingly

interface UserState {
  user: UserData | null; // Replace 'any' with the actual type of user data
  error: string | null;
}

interface UserData {
  // Define the structure of your user data
  username: string;
  password: string;
  password2: string;
}

const initialState: UserState = {
  user: null,
  error: null,
};

const userSlice = createSlice({
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

export const { setUser, setAuthError } = userSlice.actions;

export const registerUser =
  (userData: UserData) => async (dispatch: AppDispatch) => {
    try {
      // Register the user by making an API request
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
      console.error("Registration failed", error);
      // TODO: Handle registration failure (e.g., show an error message)
    }
  };

export default userSlice.reducer;
