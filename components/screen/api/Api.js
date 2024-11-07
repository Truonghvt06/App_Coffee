import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.0.102:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN",
  },
});

export default API;
