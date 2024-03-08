import { AppDispatch } from "../store/types/AuthTypes";
import {
  sendPasswordResetEmailSuccess,
  sendPasswordResetEmailFailure,
} from "../store/reducers/authSlice";

import { API_BASE_URL } from "./api";

export const sendPasswordResetEmailRequest =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
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
