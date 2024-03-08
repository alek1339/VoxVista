import { ForgottenPasswordComponent } from "./ForgottenPasswordTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useReduxActions";
import { sendPasswordResetEmail } from "../../store/reducers/authSlice";
import { useAppSelector } from "../../hooks/useReduxActions";

const ForgottenPassword: ForgottenPasswordComponent = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { error, passwordResetEmailSent } = useAppSelector(
    (state) => state.auth
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
  };

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
  }, [error]);

  useEffect(() => {
    if (passwordResetEmailSent) {
      setMessage("Password reset email sent.");
    }
  }, [passwordResetEmailSent]);

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>

      {/* TODO: Add notification component to display message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgottenPassword;
