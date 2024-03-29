import React, { useState, useEffect } from "react";
import { RegisterFormComponent, RegisterState } from "./RegisterFormTypes";
import useFormInput from "../../hooks/useFormInput";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { registerUser, setAuthError } from "../../store/reducers/authSlice";
import { isValidPassword, isValidUsername } from "../../utils/validation";
import { useAppSelector } from "../../hooks/useReduxActions";
import PasswordField from "../passwordField/PasswordField";
import { useTranslation } from "react-i18next";

const RegisterForm: RegisterFormComponent = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { error } = useAppSelector((state) => state.auth);

  const { formData, handleInputChange } = useFormInput<RegisterState>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setAuthError(null));
    const userdata = {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (!isValidUsername(userdata.username)) {
      setUsernameError("invalidUsername");
    } else {
      setUsernameError(null);
    }

    if (!isValidPassword(userdata.password)) {
      setPasswordError("incorrectPassword");
    } else {
      setPasswordError(null);
    }

    if (userdata.password !== userdata.confirmPassword) {
      setConfirmPasswordError("passwordMismatch");
    } else {
      setConfirmPasswordError(null);
    }

    dispatch(
      registerUser({
        username: userdata.username,
        password: userdata.password,
        password2: userdata.confirmPassword,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        onChange={(e) => handleInputChange(e)}
        placeholder="Username"
      />
      {usernameError && <p className="error-text">{t(usernameError)}</p>}
      <PasswordField
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        error={passwordError && t(passwordError)}
      />
      <PasswordField
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Confirm password"
        error={confirmPasswordError && t(confirmPasswordError)}
      />
      <button type="submit">{t("register")}</button>
      {error && <p className="error-text">{t(error)}</p>}
    </form>
  );
};

export default RegisterForm;
