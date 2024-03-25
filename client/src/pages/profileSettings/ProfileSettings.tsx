import { ProfileSettingsComponent } from "./ProfileSettingsTypes";
import { useTranslation } from "react-i18next";
import ProfileSettingsForm from "../../components/profileSettingsForm/ProfileSettingsForm";
import { useAppSelector } from "../../hooks/useReduxActions";
import { Link } from "react-router-dom";
import { deleteUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import Button from "../../components/button/Button";

const ProfileSettings: ProfileSettingsComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [t] = useTranslation();

  return (
    <div>
      <h1>{t("account")}</h1>
      {user && <ProfileSettingsForm user={user} />}
      <Link to="/change-password">{t("changePassword")}</Link>
      {user && (
        <Button
          onClick={() => dispatch(deleteUser(user.id))}
          text={t("deleteAccount")}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
