import { useRuntimeConfig } from "#app";

export declare interface StrapiResponse {
  data: any;
  meta?: any;
}

export const useStrapi = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.baseURL;
  const apiToken = config.public.apiToken;

  const fetchStrapi = async <T extends StrapiResponse>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
  ): Promise<T> => {
    const url = `${apiUrl}${endpoint}`;

    const headers: HeadersInit = {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json", // Add content type for POST/PUT
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      // Only add body for non-GET requests
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("Strapi API Error:", error);
      throw error;
    }
  };

  const postStrapi = async <T extends StrapiResponse>(
    endpoint: string,
    body: any
  ): Promise<T> => {
    return fetchStrapi<T>(endpoint, "POST", body);
  };

  return {
    fetchStrapi,
    postStrapi, // Expose the postStrapi function
  };
};
