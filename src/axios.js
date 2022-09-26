import axios from "axios";

const inctance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

inctance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default inctance;
