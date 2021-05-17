import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: `https://api.genderize.io?name=`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {throw err};

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createApi;
