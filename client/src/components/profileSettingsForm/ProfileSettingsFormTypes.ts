import { LearningLanguage } from "../../enums/LearningLanguage";
import { PrimaryLanguage } from "../../enums/PrimaryLanguage";
import { User } from "../../types/User";

export interface ProfileSettingsFormProps {
  user: User;
}

export interface ProfileSettingsState {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  primaryLanguage: PrimaryLanguage;
  learningLanguage: LearningLanguage;
}

export type ProfileSettingsComponent = React.FC<ProfileSettingsFormProps>;
