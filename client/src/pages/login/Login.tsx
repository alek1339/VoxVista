import React, { useState } from "react";
import { LoginComponent } from "./LoginTypes";
import { loginUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import useFormInput from "../../hooks/useFormInput";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxActions";
import { useEffect } from "react";
import { setAuthError } from "../../store/reducers/authSlice";

import { useTranslation } from "react-i18next";

const Login: LoginComponent = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { formData, handleInputChange } = useFormInput({
    username: "",
    password: "",
  });
  const { error } = useAppSelector((state) => state.auth);
  const [i18Error, setI18Error] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

  useEffect(() => {
    if (error && error === "User not found") {
      setI18Error(t("userNotFound"));
    }
    if (error && error === "Password incorrect") {
      setI18Error(t("incorrectPassword"));
    }
  }, [error, t]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userdata = {
      username: formData.username,
      password: formData.password,
    };

    dispatch(loginUser(userdata));
  };

  return (
    <div>
      <h1>{t("loginPageTitle")}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder={t("username")}
          name="username"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="password"
          placeholder={t("password")}
          name="password"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit">{t("loginPageTitle")}</button>
      </form>
      {error && <p className="error-text">{i18Error}</p>}
      <Link to="/forgot-password">{t("forgotPassword")}</Link>
    </div>
  );
};

export default Login;
