import { AppDispatch } from "../store/store"; // Assuming AppDispatch is exported from your Redux store
import {
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailFailure,
} from "../store/reducers/authSlice";

export const sendPasswordResetEmailRequest =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "http://localhost:5000/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (data.msg && data.msg.length > 0) {
          dispatch(sendPasswordResetEmailFailure(data.msg));
        } else {
          dispatch(sendPasswordResetEmailSuccess());
        }
      }
    } catch (error) {
      console.error("Error sending email:", error);
      dispatch(
        sendPasswordResetEmailFailure(
          "An error occurred while resetting the password."
        )
      );
    }
  };
