import axios from "axios";
import useAuth from "./Auth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000`,
});

const useAxiosSecure = () => {
  const { user, signOutFunc } = useAuth();
  //request interceptor
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
      }
    );
    //response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          // console.log("log out the user");
          signOutFunc().then(() => {});
        }
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutFunc]);

  return axiosInstance;
};

export default useAxiosSecure;
