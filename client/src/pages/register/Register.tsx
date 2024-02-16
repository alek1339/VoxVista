
import { RegisterComponent } from "./RegisterTypes";
import RegisterForm from "../../components/registerForm/RegisterForm";
import "./Register.scss";

const Register: RegisterComponent = () => {
    return (
        <div className="register-container">
            <h1>Register</h1>
            <RegisterForm />
        </div>
    );
}
export default Register;