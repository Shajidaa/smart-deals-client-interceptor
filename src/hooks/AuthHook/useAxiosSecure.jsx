import axios from "axios";
import useAuth from "./Auth";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  //request interceptor
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
