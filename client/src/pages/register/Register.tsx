import { RegisterComponent } from "./RegisterTypes";
import RegisterForm from "../../components/registerForm/RegisterForm";
import "./Register.scss";
import { useTranslation } from "react-i18next";

const Register: RegisterComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="register-container">
      <h1>{t("register")}</h1>
      <RegisterForm />
    </div>
  );
};
export default Register;
