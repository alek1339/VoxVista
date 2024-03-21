import { LearningLanguage } from "../enums/LearningLanguage";
import { PrimaryLanguage } from "../enums/PrimaryLanguage";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dailyStreak: number;
  primaryLanguage: PrimaryLanguage;
  learningLanguage: LearningLanguage;
  isProUser: boolean;
  isAdmin: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
  date: Date;
}
