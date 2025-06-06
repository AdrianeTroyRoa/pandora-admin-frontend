import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstance;
