import { API_BASE_URL } from "./api";
import { RegistrationData, LoginData } from "../types/AuthTypes";
import { User } from "../types/User";

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

export const loginUserApi = async (userData: LoginData) => {
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

export const updateUserApi = async (userData: User) => {
  const response = await fetch(`${API_BASE_URL}/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response;
};
