export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dailyStreak: number;
  primaryLanguage: string;
  learningLanguage: string;
  learnedLessons: string[];
  forReview: string[];
  isProUser: boolean;
  isAdmin: boolean;
  passwordResetToken: string;
  passwordResetExpires: Date;
  date: Date;
}
