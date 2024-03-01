export interface AuthState {
  user: UserData | null;
  error: string | null;
  passwordResetEmailSent: boolean;
}

export interface UserData {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegistrationData extends UserData {
  password2: string;
}
