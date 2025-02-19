import { useRuntimeConfig } from "#app";

export declare interface StrapiResponse {
  data: any;
  meta?: any;
}

export const useStrapi = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.baseURL;
  const apiToken = config.public.apiToken;

  const fetchStrapi = async <StrapiResponse>(
    endpoint: string
  ): Promise<StrapiResponse> => {
    const url = `${apiUrl}${endpoint}`;

    const headers = {
      Authorization: `Bearer ${apiToken}`,
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as StrapiResponse;
    } catch (error) {
      console.error("Strapi API Error:", error);
      throw error;
    }
  };

  return {
    fetchStrapi,
  };
};
