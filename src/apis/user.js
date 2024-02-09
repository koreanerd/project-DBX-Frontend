import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  authenticateUser: `${API_BASE_URL}/api/v1/users/auth-token`,
  getUserInformation: `${API_BASE_URL}/api/v1/users`,
};

export const authenticateUser = async (token) => {
  return await callApi(API_PATHS.authenticateUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export const getUserInformation = async (token) => {
  return await callApi(API_PATHS.getUserInformation, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
