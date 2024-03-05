import { LoginComponent } from "./LoginTypes";
import { loginUser } from "../../store/reducers/authSlice";
import { useAppDispatch } from "../../hooks/useReduxActions";
import useFormInput from "../../hooks/useFormInput";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/useReduxActions";
import { useEffect } from "react";
import { setAuthError } from "../../store/reducers/authSlice";

const Login: LoginComponent = () => {
  const dispatch = useAppDispatch();
  const { formData, handleInputChange } = useFormInput({
    username: "",
    password: "",
  });
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setAuthError(null));
  }, [dispatch]);

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
      {error && <p className="error-text">{error}</p>}
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
  );
};

export default Login;
