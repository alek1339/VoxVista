import { User } from "../../types/User";

export interface ProfileSettingsFormProps {
  user: User;
}

export interface ProfileSettingsState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  primaryLanguage: string;
  learningLanguage: string;
}

export type ProfileSettingsComponent = React.FC<ProfileSettingsFormProps>;
