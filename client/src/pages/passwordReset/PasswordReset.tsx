import { PasswordResetComponent } from "./PasswordResetTypes";
import { useState } from "react";
import { resetPassword } from "../../api/resetPasswordRequest";
import { useParams } from "react-router-dom";

const PasswordReset: PasswordResetComponent = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  const handlePasswordReset = async () => {
    try {
      // Verify the token and reset the password on the server
      const response = await resetPassword(token || "", newPassword);
      console.log(response);
      if ("response.ok") {
        // Password reset was successful
        setResetSuccess(true);
        setResetError("");
      } else {
        // Password reset failed, handle the error
        // const errorData = await response.json();
        setResetSuccess(false);
        setResetError("errorData.error");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setResetSuccess(false);
      setResetError("An error occurred while resetting the password.");
    }
  };

  return (
    <div>
      {resetSuccess ? (
        <p>Password reset successful!</p>
      ) : (
        <>
          <h2>Reset Your Password</h2>
          {resetError && <p>Error: {resetError}</p>}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
