import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update with your API URL

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
