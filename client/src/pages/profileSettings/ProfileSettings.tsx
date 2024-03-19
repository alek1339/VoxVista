import { ProfileSettingsComponent } from "./ProfileSettingsTypes";
import { useTranslation } from "react-i18next";

const ProfileSettings: ProfileSettingsComponent = () => {
  const [t] = useTranslation();

  return (
    <div>
      <h1>{t("account")}</h1>
    </div>
  );
};

export default ProfileSettings;
