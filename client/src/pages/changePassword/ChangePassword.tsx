import { useState } from "react";
import PasswordField from "../../components/passwordField/PasswordField";
import { ChangePasswordComponent } from "./ChangePasswordTypes";
import { useTranslation } from "react-i18next";
import useFormInput from "../../hooks/useFormInput";
import { changePassword } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { isValidPassword } from "../../utils/validation";
import { useAppSelector } from "../../hooks/useReduxActions";

const ChangePassword: ChangePasswordComponent = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { error } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const { formData, handleInputChange } = useFormInput({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);

  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);

  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setConfirmPasswordError(t("passwordMismatch"));
    } else {
      setConfirmPasswordError(null);
    }

    if (!isValidPassword(formData.newPassword)) {
      setNewPasswordError(t("passwordRequirements"));
    } else {
      setNewPasswordError(null);
    }

    if (formData.oldPassword === "") {
      setOldPasswordError(t("oldPasswordRequired"));
    } else {
      setOldPasswordError(null);
    }

    if (
      formData.oldPassword !== "" &&
      formData.newPassword !== "" &&
      formData.confirmPassword !== "" &&
      formData.newPassword === formData.confirmPassword &&
      isValidPassword(formData.newPassword)
    ) {
      dispatch(
        changePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          id: user?.id || "",
        })
      );
    }
  };

  return (
    <div>
      {t("changePassword")}
      <form onSubmit={handleSubmit}>
        <PasswordField
          placeholder={t("oldPassword")}
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleInputChange}
          error={oldPasswordError}
        />
        {error && <p className="error-text">{error}</p>}
        <PasswordField
          placeholder={t("newPassword")}
          name="newPassword"
          value={formData.newPassword}
          onChange={handleInputChange}
          error={newPasswordError}
        />
        <PasswordField
          placeholder={t("confirmPassword")}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={confirmPasswordError}
        />
        <button type="submit">{t("changePassword")}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
