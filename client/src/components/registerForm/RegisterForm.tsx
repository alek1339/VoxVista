import { RegisterFormComponent } from './RegisterFormTypes';
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { registerUser } from "../../store/reducers/userSlice";

const RegisterForm: RegisterFormComponent = () => {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userdata = {
            username: username,
            password: password,
            confirmPassword: confirmPassword
        };
        dispatch(
            registerUser({
                username: userdata.username,
                password: userdata.password,
                password2: userdata.confirmPassword
            })
        );
        console.log("User data", userdata);
    };


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;