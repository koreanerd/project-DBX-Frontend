import { callApi } from "@/utils/api";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API_PATHS = {
  getResourceList: (categoryId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resource-list`,
  accessResource: (categoryId, resourceId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resources/${resourceId}`,
  downLoadResorceFile: (url) =>
    `${API_BASE_URL}/api/v1/categories/resources/versions/files/download?url=${encodeURIComponent(url)}`,
  getResourceVersion: (categoryId, resourceId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resources/${resourceId}/versions`,
  updateResourceVersion: (resourceId) =>
    `${API_BASE_URL}/api/v1/categories/resources/${resourceId}/versions/`,
  addResource: (categoryId) =>
    `${API_BASE_URL}/api/v1/categories/${categoryId}/resources`,
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

export const getResourceVersion = async (token, categoryId, resourceId) => {
  return await callApi(API_PATHS.getResourceVersion(categoryId, resourceId), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateResourceVersion = async (token, resourceId, data) => {
  return await callApi(API_PATHS.updateResourceVersion(resourceId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
};

export const addResource = async (token, categoryId, data) => {
  return await callApi(API_PATHS.addResource(categoryId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
};
