import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getResourceList: (categoryId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resource-list`,
  accessResource: (categoryId, resourceId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resources/${resourceId}`,
  downLoadResorceFile: (url) =>
    `${API_BASE_URL}/api/v1/categories/resources/versions/files/download?url=${encodeURIComponent(url)}`,
};

export const getResourceList = async (token, categoryId) => {
  return await callApi(API_PATHS.getResourceList(categoryId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getResourceInfo = async (token, categoryId, resourceId) => {
  return await callApi(API_PATHS.accessResource(categoryId, resourceId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteResourceData = async (token, categoryId, resourceId) => {
  return await callApi(API_PATHS.accessResource(categoryId, resourceId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const downloadResourFile = async (token, url) => {
  return await callApi(
    API_PATHS.downLoadResorceFile(url),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "download",
  );
};
