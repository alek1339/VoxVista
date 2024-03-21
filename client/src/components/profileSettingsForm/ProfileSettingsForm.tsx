import {
  ProfileSettingsComponent,
  ProfileSettingsState,
} from "./ProfileSettingsFormTypes";
import useFormInput from "../../hooks/useFormInput";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { PrimaryLanguage } from "../../enums/PrimaryLanguage";
import { LearningLanguage } from "../../enums/LearningLanguage";

const ProfileSettingsForm: ProfileSettingsComponent = ({ user }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const initialFormData: ProfileSettingsState = {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    primaryLanguage: user.primaryLanguage,
    learningLanguage: user.learningLanguage,
  };

  const { formData, handleInputChange } =
    useFormInput<ProfileSettingsState>(initialFormData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        ...user,
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        primaryLanguage: PrimaryLanguage.BULGARIAN,
        learningLanguage: LearningLanguage.GERMAN,
      })
    );
  };

  return (
    <div>
      <form>
        <label>{t("username")}</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder={t("username")}
          onChange={handleInputChange}
        />
        <label>{t("email")}</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder={t("email")}
          onChange={handleInputChange}
        />
        <label>{t("firstName")}</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder={t("firstName")}
          onChange={handleInputChange}
        />
        <label>{t("lastName")}</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder={t("lastName")}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="primaryLanguage"
          value={formData.primaryLanguage}
          placeholder={t("primaryLanguage")}
          onChange={handleInputChange}
        />
        <label>{t("learningLanguage")}</label>
        <input
          type="text"
          name="learningLanguage"
          value={formData.learningLanguage}
          placeholder={t("learningLanguage")}
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} text="Save" />
      </form>
    </div>
  );
};

export default ProfileSettingsForm;
