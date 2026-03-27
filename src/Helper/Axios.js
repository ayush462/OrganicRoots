import axios from "axios";

const axiosFetch = async ({ url, method, data = null }) => {
  try {
    const token = sessionStorage.getItem("token") ?? "{}";

    const response = await axios.request({
      url: "https://organicrootsbackend.onrender.com/" + url,   // FIXED PORT
      method,
      data: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response;
  } catch (err) {
    return err;
  }
};

export default axiosFetch;
