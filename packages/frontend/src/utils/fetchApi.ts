import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseUrl = import.meta.env.VITE_API_URL;

const token = cookies.get("token");
const Authorization = token ? { Authorization: `Bearer ${token}` } : {};
interface Config {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export const fetchApi = async <T>(path: string, config?: Config) => {
  const url = baseUrl + path;
  const request = await fetch(url, {
    method: config?.method ? config.method : "GET",
    headers: {
      "Content-Type": "application/json",
      ...Authorization,
      ...config?.headers,
    },
    body: config?.body ? JSON.stringify(config.body) : undefined,
  });
  if (!request.ok) {
    const response = (await request.json()) as { message: string };
    throw new Error(response?.message ?? "Failed to fetch");
  }
  return (await request.json()) as T;
};
