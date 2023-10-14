import { getToken } from "@root/utilities/shared/LocalStorage";


export const apiInterceptor = async (url: any, options: any) => {
  // Add common headers or modify options here
  const tokenFromLocal = await getToken();
  const headers = {
    Cookie: tokenFromLocal,
    // Add any other headers you need
  };

  const modifiedOptions = {
    ...options,
    headers,
  };

  return fetch(`${url}`, modifiedOptions)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Network request failed:", error);
      throw error;
    });
};

export default apiInterceptor;
