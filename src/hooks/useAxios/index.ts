import axios from "axios";

interface AxiosType {
  url: string;
  headers?: object;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: object;
}

export const useAxios = () => {
  const request = ({ url, headers, method = "GET", params }: AxiosType) => {
    const token = localStorage.getItem("token");

    return axios({
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      params,
    })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Axios error:", error.response?.data || error);
        throw error;
      });
  };

  return request;
};