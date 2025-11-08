import axios from "axios";

const instance = axios.create({
  // baseURL: `http://localhost:3000`,
  baseURL: `https://smart-deals-server-nine.vercel.app`,
});
const useAxios = () => {
  return instance;
};

export default useAxios;
