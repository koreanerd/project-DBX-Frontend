import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getFixedUrl: (resourceId: string) =>
    `${API_BASE_URL}/api/v1/dbx/services/categories/resources/${resourceId}`,
};

export const getFixedUrl = async (token, resourceId) => {
  return await callApi(API_PATHS.getFixedUrl(resourceId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
