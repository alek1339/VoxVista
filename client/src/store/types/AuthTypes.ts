import store from "../store";
import rootReducer from "../reducers";
export interface AuthState {
  user: UserData | null;
  error: string | null;
  passwordResetEmailSent: boolean;
  registerSuccess: boolean;
  loginSuccess: boolean;
}

export interface UserData {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegistrationData extends UserData {
  password2: string;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
