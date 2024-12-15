import axios from "axios";
import { token } from "../helpers/token";
import { API } from "../constant/APIS";
// Create a main instance for Axios
const axiosInstance = axios.create({
  baseURL: `${API}/`,
});


axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;