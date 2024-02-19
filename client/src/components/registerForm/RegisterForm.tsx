import React, { useState } from "react";
import { RegisterFormComponent, RegisterState } from "./RegisterFormTypes";
import useFormInput from "../../hooks/useFormInput";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { registerUser } from "../../store/reducers/userSlice";
import { isValidPassword, isValidUsername } from "../../utils/validation";

const RegisterForm: RegisterFormComponent = () => {
  const dispatch = useAppDispatch();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userdata = {
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    if (!isValidUsername(userdata.username)) {
      setUsernameError("Invalid username");
    } else {
      setUsernameError(null);
    }

    if (!isValidPassword(userdata.password)) {
      setPasswordError("Invalid password");
    } else {
      setPasswordError(null);
    }

    if (userdata.password !== userdata.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
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
      {usernameError && <p className="error-text">{usernameError}</p>}
      <input
        type="password"
        name="password"
        onChange={(e) => handleInputChange(e)}
        placeholder="Password"
      />
      {passwordError && <p className="error-text">{passwordError}</p>}
      <input
        type="password"
        name="confirmPassword"
        onChange={(e) => handleInputChange(e)}
        placeholder="Confirm Password"
      />
      {confirmPasswordError && (
        <p className="error-text">{confirmPasswordError}</p>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
