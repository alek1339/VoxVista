import { User } from "./User";
export interface AuthState {
  user: User | null;
  error: string | null;
  passwordResetEmailSent: boolean;
  registerSuccess: boolean;
  loginSuccess: boolean;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegistrationData extends LoginData {
  password2: string;
}
