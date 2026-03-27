import axios from "axios";

const axiosFetch = async ({ url, method, data = null }) => {
  try {
    let token = null;

    // ✅ Prevent SSR crash (VERY IMPORTANT for Vercel)
    if (typeof window !== "undefined") {
      token = sessionStorage.getItem("token");
    }

    const response = await axios.request({
      url: "https://organicrootsbackend.onrender.com/" + url,
      method,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data; // cleaner
  } catch (err) {
    console.error("Axios Error:", err.response || err.message);

    return {
      success: false,
      error: err.response?.data || err.message,
    };
  }
};

export default axiosFetch;