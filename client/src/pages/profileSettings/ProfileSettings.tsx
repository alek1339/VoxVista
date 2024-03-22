import { ProfileSettingsComponent } from "./ProfileSettingsTypes";
import { useTranslation } from "react-i18next";
import ProfileSettingsForm from "../../components/profileSettingsForm/ProfileSettingsForm";
import { useAppSelector } from "../../hooks/useReduxActions";
import { Link } from "react-router-dom";

const ProfileSettings: ProfileSettingsComponent = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [t] = useTranslation();

  return (
    <div>
      <h1>{t("account")}</h1>
      {user && <ProfileSettingsForm user={user} />}
      <Link to="/change-password">{t("changePassword")}</Link>
    </div>
  );
};

export default ProfileSettings;
