import axios from "axios";

const instance = axios.create({
  baseURL: `https://smart-deals-server-nine.vercel.app`,
});
const useAxios = () => {
  return instance;
};

export default useAxios;
