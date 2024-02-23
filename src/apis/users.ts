import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  authenticateUser: `${API_BASE_URL}/api/v1/users/auth-user`,
  getMyInformation: `${API_BASE_URL}/api/v1/users/me`,
  initialRegistration: `${API_BASE_URL}/api/v1/users/initialize`,
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

export const getMyInformation = async (token) => {
  return await callApi(API_PATHS.getMyInformation, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const initialRegistration = async (token, data) => {
  return await callApi(API_PATHS.initialRegistration, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
};
