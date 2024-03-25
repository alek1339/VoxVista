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

export const changePasswordApi = async (
  oldPassword: string,
  newPassword: string,
  id: string
) => {
  const response = await fetch(`${API_BASE_URL}/users/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword, id }),
  });

  const data = await response.json();
  return data;
};

export const deleteUserApi = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await response.json();

  return data;
};
