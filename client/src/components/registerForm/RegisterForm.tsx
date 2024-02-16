import { RegisterFormComponent, RegisterState } from './RegisterFormTypes';
import useFormInput from '../../hooks/useFormInput';
import { useAppDispatch } from "../../hooks/useReduxActions";
import { registerUser } from "../../store/reducers/userSlice";

const RegisterForm: RegisterFormComponent = () => {
    const dispatch = useAppDispatch();
    const { formData, handleInputChange } = useFormInput<RegisterState>({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userdata = {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };

        dispatch(
            registerUser({
                username: userdata.username,
                password: userdata.password,
                password2: userdata.confirmPassword
            })
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='username' onChange={e => handleInputChange(e)} placeholder="Username" />
            <input type="password" name='password' onChange={e => handleInputChange(e)} placeholder="Password" />
            <input type="password" name="confirmPassword" onChange={e => handleInputChange(e)} placeholder="Confirm Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;