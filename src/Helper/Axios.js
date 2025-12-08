import axios from "axios";

const axiosFetch = async ({ url, method, data = null }) => {
  try {
    const token = sessionStorage.getItem("token") ?? "{}";

    const response = await axios.request({
      url: "http://ec2-13-233-163-146.ap-south-1.compute.amazonaws.com:9090/" + url,   // FIXED PORT
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
