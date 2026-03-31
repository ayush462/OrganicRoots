import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://organicrootsbackend.onrender.com/",
  timeout: 15000,
});

// 🔐 Request interceptor (attach token)
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 🎯 Response interceptor (standardize response)
axiosInstance.interceptors.response.use(
  (response) => {
    // ✅ ALWAYS return only data (clean + consistent)
    return response.data;
  },
  (error) => {
    console.error(
      "Axios Error:",
      error.response?.data || error.message
    );

    // ❌ THROW error instead of returning fake object
    throw error.response?.data || error;
  }
);

// 🚀 Main function
const axiosFetch = async ({ url, method = "GET", data = null, params = null }) => {
  return axiosInstance({
    url,
    method,
    data,
    params,
  });
};

export default axiosFetch;