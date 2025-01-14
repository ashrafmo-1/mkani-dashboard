import axios from "axios";
import { token } from "../helpers/token";
import { API } from "../constant/APIS";
const axiosInstance = axios.create({
  baseURL: `${API}/`,
});

axiosInstance.defaults.headers.get["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.put["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.post["Authorization"] = `Bearer ${token}`;
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