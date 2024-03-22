import React, { useState } from "react";
import {
  ProfileSettingsComponent,
  ProfileSettingsState,
} from "./ProfileSettingsFormTypes";
import useFormInput from "../../hooks/useFormInput";
import { useTranslation } from "react-i18next";
import { updateUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { PrimaryLanguage } from "../../enums/PrimaryLanguage";
import { LearningLanguage } from "../../enums/LearningLanguage";
import Dropdown from "../dropdown/Dropdown";

import { isValidEmail, isValidUsername } from "../../utils/validation";

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
  const [errors, setErrors] = useState<string[]>([]);

  const { formData, handleInputChange } =
    useFormInput<ProfileSettingsState>(initialFormData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.length === 0) {
      dispatch(
        updateUser({
          ...user,
          username: formData.username,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          primaryLanguage: formData.primaryLanguage,
          learningLanguage: formData.learningLanguage,
        })
      );
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    setErrors((prevErrors) => {
      const filteredErrors = prevErrors.filter(
        (error) => error !== "invalidUsername"
      );

      if (!isValidUsername(e.target.value)) {
        return [...filteredErrors, "invalidUsername"];
      }

      return filteredErrors;
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    setErrors((prevErrors) => {
      const filteredErrors = prevErrors.filter(
        (error) => error !== "invalidEmail"
      );

      if (!isValidEmail(e.target.value)) {
        return [...filteredErrors, "invalidEmail"];
      }

      return filteredErrors;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{t("username")}</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder={t("username")}
          onChange={handleUsernameChange}
        />
        <label>{t("email")}</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder={t("email")}
          onChange={handleEmailChange}
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
        <label>{t("primaryLanguage")}</label>
        <Dropdown
          options={Object.values(PrimaryLanguage)}
          selected={user.primaryLanguage}
          setSelected={(selected) =>
            handleInputChange({
              target: { name: "primaryLanguage", value: selected },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <label>{t("learningLanguage")}</label>
        <Dropdown
          options={Object.values(LearningLanguage)}
          selected={user.learningLanguage}
          setSelected={(selected) =>
            handleInputChange({
              target: { name: "learningLanguage", value: selected },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        <button type="submit">{t("save")}</button>
      </form>
      {errors.length > 0 && (
        <div>
          {errors.map((error) => (
            <p className="error-text" key={error}>
              {t(error)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSettingsForm;
