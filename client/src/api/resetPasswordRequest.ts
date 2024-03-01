import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "./api";

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  const response: AxiosResponse<ResetPasswordResponse> = await axios.post(
    `${API_BASE_URL}/users/reset-password/${token}`,
    {
      password: newPassword,
    }
  );
  return response.data;
};
