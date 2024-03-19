import { API_BASE_URL } from "./api";
import { RegistrationData, UserData } from "../types/AuthTypes";

export const registerUserApi = async (userData: RegistrationData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const loginUserApi = async (userData: UserData) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const tokenLoginApi = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/current`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const data = await response.json();
  return data;
};
