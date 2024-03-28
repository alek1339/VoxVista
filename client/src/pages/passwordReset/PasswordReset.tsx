import { PasswordResetComponent } from "./PasswordResetTypes";
import { useState } from "react";
import { resetPassword } from "../../api/resetPasswordRequest";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PasswordReset: PasswordResetComponent = () => {
  const { token } = useParams();
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState("");

  const handlePasswordReset = async () => {
    try {
      // Verify the token and reset the password on the server
      const response = await resetPassword(token || "", newPassword);
      console.log(response);
      if (response) {
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
      setResetSuccess(false);
      setResetError("passwordResetError");
    }
  };

  return (
    <div>
      {resetSuccess ? (
        <p>{t("success.passwordReset")}</p>
      ) : (
        <>
          <h2>{t("resetPassword")}</h2>
          {resetError && <p>Error: {t(resetError)}</p>}
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
          <button onClick={handlePasswordReset}>{t("resetPassword")}</button>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
