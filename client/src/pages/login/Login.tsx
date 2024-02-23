import { LoginComponent } from "./LoginTypes";
import { loginUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import useFormInput from "../../hooks/useFormInput";
import { useNavigate } from "react-router-dom";

const Login: LoginComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { formData, handleInputChange } = useFormInput({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userdata = {
      username: formData.username,
      password: formData.password,
    };

    dispatch(loginUser(userdata)).then((data) => {
      if (data.success) {
        navigate("/");
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleInputChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleInputChange(e)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
