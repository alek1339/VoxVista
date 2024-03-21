import { useEffect } from "react";
import i18n from "i18next";
import { LanguageManagerComponent } from "./LanguageManagerTypes";

const LanguageManager: LanguageManagerComponent = ({ user }) => {
  useEffect(() => {
    if (user && user.primaryLanguage) {
      i18n.changeLanguage(user.primaryLanguage);
    }
  }, [user]);

  return null; // This component doesn't render anything, it just manages language changes
};

export default LanguageManager;
