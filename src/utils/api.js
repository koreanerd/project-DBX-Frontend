export const callApi = async (url, option, flag) => {
  try {
    const response = await fetch(url, option);

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Nerwork response was not ok");
    }

    if (flag === "download") {
      return await response.blob();
    }

    return await response.json();
  } catch (error) {
    return { error: error.message || "An error occurred" };
  }
};
